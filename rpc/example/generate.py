# https://gist.github.com/xxxbrian/65a75ddc5a9b7796ba7317d032d458ff

import re
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


class TypeCompiler:
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
    tc: TypeCompiler

    def __init__(self, model: Model, tc: TypeCompiler, base_url: str = 'api') -> None:
        self.model = model
        self.tc = tc
        self.base_url = base_url

    def parse_endpoint(self, name: str) -> str:
        request_type_name = self.tc.to_big_camel_case(name + "Request")
        response_type_name = self.tc.to_big_camel_case(name + "Response")

        rpc_requester = f'''
    async {name}(request: {request_type_name}): Promise<{response_type_name}> {{
        const response = await fetch('this.base_url/{name}', {{
            method: 'POST',
            headers: {{
                'Content-Type': 'application/json'
            }},
            body: JSON.stringify(request)
        }});
        return await response.json();
    }}
'''
        return rpc_requester

    def parse(self, name: str):
        endpoints = '\n\n'.join([
            self.parse_endpoint(name) for name in self.model["endpoints"].keys()
        ])

        return f'''/* tslint:disable */
// Generated by the RPC compiler.
// DO NOT EDIT.

{self.tc.parse().strip()}

export class {self.tc.to_big_camel_case(name)}Client {{
    base_url: string;
    constructor(base_url: string) {{
        this.base_url = base_url;
    }}
    {endpoints.strip()}
}}

const {name} = new {self.tc.to_big_camel_case(name)}Client('{self.base_url}');
'''


with open('def.yml', 'r') as file:
    yamldict = yaml.safe_load(file)
    tc = TypeCompiler(yamldict)
    cc = ClientRequesterCompiler(yamldict, tc)

    # print(tc.parse())
    print(cc.parse('brainwaves'))
