import os
import re
import sys
import yaml
from rpctypes import Model, TypeMap, TypeDef, Object, Endpoint

import typing as t

# Basic TypeScript types


TypescriptMap: TypeMap = {
    "string": "string",
    "number": "number",
    "boolean": "boolean",
    "any": "any",
}


class ModelCheckerContext:
    errors: list[str]
    warnings: list[str]

    def __init__(self) -> None:
        self.errors = []
        self.warnings = []

    def add_error(self, error: str):
        self.errors.append(error)

    def add_warning(self, warning: str):
        self.warnings.append(warning)


class TypescriptTypeCompiler:
    model: Model

    def __init__(self, model: Model) -> None:
        self.model = model

    def parse_type_name(self, name: str) -> str:
        if name in TypescriptMap:
            return TypescriptMap[name]
        if name in self.model["types"]:
            return name
        raise TypeError(f"Type {name} not found")

    def is_array(self, type_ref: str) -> tuple[bool, str]:
        arr_regex = re.compile(r"^(.+)\[\]$")
        mat = arr_regex.match(type_ref)

        if mat:
            return (True, mat.group(1))

        return (False, type_ref)

    def make_array(self, type_ref: str):
        return f"{type_ref}[]"

    def is_map(self, type_ref: str) -> tuple[bool, str, str]:
        obj_regex = re.compile(r"^Map<(.+),\s*(.+)>$")
        mat = obj_regex.match(type_ref)

        if mat:
            return (True, mat.group(1), mat.group(2))
        return (False, type_ref, type_ref)

    def make_map(self, key: str, value: str):
        return f"Record<{key}, {value}>"

    def is_union(self, type_ref: str) -> tuple[bool, str, str]:
        obj_regex = re.compile(r"^(.*)\s*\|\s*(.*)$")
        mat = obj_regex.match(type_ref)

        if mat:
            return (True, mat.group(1), mat.group(2))
        return (False, type_ref, type_ref)

    def make_union(self, type_ref1: str, type_ref2: str):
        return f"{type_ref1} | {type_ref2}"

    def parse_type_ref(self, name: str) -> str:
        name = name.strip()

        is_arr, rest = self.is_array(name)

        if is_arr:
            return self.make_array(self.parse_type_ref(rest))

        is_map, key, value = self.is_map(rest)

        if is_map:
            return self.make_map(self.parse_type_ref(key), self.parse_type_ref(value))

        is_union, u1, u2 = self.is_union(rest)

        if is_union:
            return self.make_union(self.parse_type_ref(u1), self.parse_type_ref(u2))

        if self.is_valid_identifier(name):
            return self.parse_type_name(name)

        # If it's definitely not an array
        raise TypeError(f'Unrecognised syntax: {name}')

    def is_valid_identifier(self, identifier: str) -> bool:
        identifier_regex = re.compile(r"^[a-zA-Z_]\w*$")

        if not identifier_regex.match(identifier):
            return False
        return True

    def parse_field(self, key: str, value: TypeDef) -> str:
        return f"{key}: {self.parse_type_ref(value)};"

    def parse_object(self, definition: Object) -> str:
        fields = [self.parse_field(key, value)
                  for key, value in definition.items()]
        return "{\n" + "\n    ".join(fields) + "\n}"

    def parse_root_object(self, name: str, definition: Object) -> str:
        if definition is None:
            definition = {}

        fields = [self.parse_field(key, value)
                  for key, value in definition.items()]
        return f"export interface {name} {{\n    " + "\n    ".join(fields) + "\n}"

    def parse_root(self, name: str, definition: TypeDef):
        if not self.is_valid_identifier(name):
            raise TypeError(f"Invalid identifier {name}")

        if isinstance(definition, str):
            return f"export type {name} = {self.parse_type_ref(definition)};"
        elif isinstance(definition, dict):
            return self.parse_root_object(name, definition)
        else:
            raise TypeError(f"Invalid type definition for {name}: {definition} is unexpected.")

    def to_big_camel_case(self, name: str) -> str:
        return name[0].upper() + name[1:]

    def parse(self):
        if self.model["types"] is None:
            self.model['types'] = {}

        types_def = '\n\n'.join([self.parse_root(key, value)
                                 for key, value in self.model["types"].items()])

        # Now, parse the types for the endpoints
        endpoints = self.model["endpoints"]

        endpoint_types_def = ''

        for name, endpoint in endpoints.items():
            request = self.parse_root_object(
                self.to_big_camel_case(name + "Request"), endpoint["request"])

            response = self.parse_root_object(
                self.to_big_camel_case(name + "Response"), endpoint["response"])

            endpoint_types_def += f'''
// {self.to_big_camel_case(name)}Request is the request that is sent to the {name} endpoint.
{request}

// {self.to_big_camel_case(name)}Response is the response that is sent to the {name} endpoint.
{response}
'''

        return f'''//////////////////////////////
// Types defined in the types file
//////////////////////////////

{types_def}

//////////////////////////////
// Endpoint Requests/Responses
//////////////////////////////

{endpoint_types_def}'''


class ClientRequesterCompiler:
    model: Model
    tc: TypescriptTypeCompiler

    def __init__(self, model: Model, tc: TypescriptTypeCompiler, base_url: str = 'api') -> None:
        self.model = model
        self.tc = tc
        self.base_url = base_url if not base_url.endswith('/') else base_url[:-1]

    def parse_endpoint(self, name: str) -> str:
        request_type_name = self.tc.to_big_camel_case(name + "Request")
        response_type_name = self.tc.to_big_camel_case(name + "Response")

        rpc_requester = f'''
    async {name}(request: {request_type_name}): Promise<{response_type_name}> {{
        const response = await fetch(`${{this.base_url}}/{name}`, {{
            method: 'POST',
            headers: {{
                'Content-Type': 'application/json'
            }},
            body: JSON.stringify(request)
        }});
        return await response.json() as {response_type_name};
    }}
'''
        return rpc_requester

    def parse(self, name: str):
        endpoints = '\n\n'.join([
            self.parse_endpoint(name) for name in self.model["endpoints"].keys()
        ])

        return f'''// Generated by the RPC compiler.
// DO NOT EDIT.

{self.tc.parse().strip()}

export class {self.tc.to_big_camel_case(name)}Client {{
    base_url: string;
    constructor(base_url: string) {{
        this.base_url = base_url;
    }}
    {endpoints.strip()}
}}

export const {name}API = new {self.tc.to_big_camel_case(name)}Client('{self.base_url}');
'''


# Abstract service class.
class Service:
    name: str
    model: Model

    def __init__(self, name: str) -> None:
        self.name = name

    def load_model(self, model: Model):
        self.model = model

    def get_name(self) -> str:
        return self.name

    def reset(self):
        raise NotImplementedError()

    def add_endpoint(self, name: str, endpoint: Endpoint):
        raise NotImplementedError()

    def compile(self):
        raise NotImplementedError()


class TypescriptService(Service):
    buf: str
    tc: TypescriptTypeCompiler
    functions: t.Dict[str, str]

    root: str
    src_dir: str
    out_dir: str

    base: str

    def __init__(self, name: str, root: str, src_dir: str, out_dir: str, base: str = '') -> None:
        '''
        Look for functions in the src, and output files to out.
        When importing, omit the root and replace with @.
        '''

        self.root = os.path.abspath(root)
        self.src_dir = os.path.abspath(src_dir)
        self.out_dir = os.path.abspath(out_dir)
        self.base = base

        super().__init__(name)
        self.buf = ''

    def calculate_import_path(self, path: str) -> str:
        root_path = self.root if self.root[-1] == '/' else self.root + '/'

        if path.startswith(root_path):
            path = '@/' + path[len(root_path):]

        if path.endswith('.ts'):
            path = path[:-3]
        elif path.endswith('.tsx'):
            path = path[:-4]

        return path

    def parse_functions_from_file(self, file: str):
        with open(file, 'r') as f:
            content = f.read()
        # print('Scan file', file)

        regex_func_syntax = re.compile(
            r'export\s+(async\s+)?function\s+([a-zA-Z]\w*)\s*\(')
        regex_export_syntax = re.compile(
            r'export\s+const\s+([a-zA-Z]\w*)\s*(:[^=]*)?=\s*(async\s+)?\(')

        function_names = []

        # Find all matches
        for m in regex_func_syntax.finditer(content):
            function_names.append(m.group(2))
        for m in regex_export_syntax.finditer(content):
            function_names.append(m.group(1))

        return function_names

    def scan_functions(self):
        def scan(dir):
            for root, dirs, files in os.walk(dir):
                for file in files:
                    if not file.endswith('.ts') and not file.endswith('.tsx'):
                        continue

                    funs = self.parse_functions_from_file(
                        os.path.join(root, file))

                    for fun in funs:
                        if fun in self.functions:
                            raise ValueError(
                                f"Duplicate definition of {fun} found in {self.functions[fun]} and {os.path.join(root, file)}.")

                        self.functions[fun] = self.calculate_import_path(
                            os.path.join(root, file)
                        )

        scan(self.src_dir)

    def load_model(self, model: Model):
        self.tc = TypescriptTypeCompiler(model)
        return super().load_model(model)

    def reset(self):
        self.buf = ''
        self.functions = {}
        self.scan_functions()

    def add_endpoint(self, name: str, endpoint: Endpoint):
        if name not in self.functions:
            raise ValueError(
                f'Cannot find an implementation for {name}. Make sure that this \
function is defined in one of the .ts/.tsx files in {self.src_dir} (available \
functions: {", ".join([n for n in self.functions.keys()])}).')

        self.buf += f'''
// {name} is the endpoint handler for the {name} endpoint.
// It wraps around the function at {self.functions[name]}.
app.post('{self.base}/{name}', async (req, res) => {{
    const request: {self.tc.to_big_camel_case(name + "Request")} = req.body;
    const response: {self.tc.to_big_camel_case(name + "Response")} = await {name}(request);
    res.json(response);
}});
'''

    def calculate_imports(self):
        files_map = {}
        out = ""
        for fun, file in self.functions.items():
            if file not in files_map:
                files_map[file] = []
            files_map[file].append(fun)

        for file, funs in files_map.items():
            out += f'import {{ {", ".join(funs)} }} from "{file}";\n'

        return out

    def compile(self):
        out = '// Generated by the RPC compiler. DO NOT EDIT.\n\n'
        # Imports
        out += '''
import { app } from "@/globals";
'''
        out += self.calculate_imports()
        out += self.tc.parse()
        out += self.buf

        if not os.path.exists(self.out_dir):
            raise ValueError(
                f"Output directory {self.out_dir} does not exist.")

        with open(os.path.join(self.out_dir, 'index.ts'), 'w') as f:
            f.write(out)


class ServerWiring:
    model: Model
    services: t.Dict[str, Service]

    def __init__(self, model: Model, services: t.List[Service]) -> None:
        self.model = model
        self.services = {service.get_name(): service for service in services}

        for service in services:
            service.load_model(model)

    def compile(self):
        for srv in self.services.values():
            srv.reset()

        used_service = set()

        for name, endpoint in self.model['endpoints'].items():
            if endpoint['service'] not in self.services:
                raise ValueError(f"Service {endpoint['service']} not found")

            used_service.add(endpoint['service'])
            self.services[endpoint['service']].add_endpoint(name, endpoint)

        for srv in used_service:
            self.services[srv].compile()


USAGE = f'''Usage: {sys.argv[0]} <model> <mode> [mode-specific arguments]

<mode> can be one of:
- client: Generate a TypeScript client
- ts-server: Generate a typescript express-based server

If <mode> is client, the following arguments are required:
- <out_dir>: The output directory. The client will be generated in <out_dir>/index.ts
- <name>: The name of the client
- <base_url>: The base URL of the server

If <mode> is ts-server, the following arguments are required:
- <root>: The src/ directory of the server
- <src_dir>: The source directory in which endpoint implementations are located
- <out_dir>: The output directory. The server will be generated in <out_dir>/index.ts
- <base>: The base URL of the server
'''


def main():
    if len(sys.argv) < 2:
        print(USAGE)
        sys.exit(1)

    with open(sys.argv[1], 'r') as file:
        model: Model = yaml.safe_load(file)

    if sys.argv[2] == 'client':
        if len(sys.argv) < 6:
            print(USAGE)
            sys.exit(1)

        out_dir = sys.argv[3]
        name = sys.argv[4]
        base_url = sys.argv[5]

        tc = TypescriptTypeCompiler(model)
        cc = ClientRequesterCompiler(model, tc, base_url)

        with open(os.path.join(out_dir, 'index.ts'), 'w') as f:
            f.write(cc.parse(name))
        exit(0)

    if sys.argv[2] == 'ts-server':
        if len(sys.argv) < 7:
            print(USAGE)
            sys.exit(1)

        root = sys.argv[3]
        src_dir = sys.argv[4]
        out_dir = sys.argv[5]
        base = sys.argv[6]

        wire = ServerWiring(model, [
            TypescriptService('typescript', root, src_dir, out_dir, base)
        ])
        wire.compile()
        exit(0)


try:
    main()
except Exception as e:
    print(e)
    sys.exit(1)
