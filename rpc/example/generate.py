# https://gist.github.com/xxxbrian/65a75ddc5a9b7796ba7317d032d458ff

import yaml
from rich.console import Console
from rich.markdown import Markdown

# Basic TypeScript types
basic_types = {"string", "number", "boolean", "any", "undefined"}

illegal_chars = [" ", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "\"", "'", "<", ">", ",", ".", "?", "/", "`", "~"]

def extract_custom_types(types):
    custom_types = {}
    for type_dict in types:
        for type_name, fields in type_dict.items():
            custom_types[type_name] = [field for field in fields]
    return custom_types

def check_types(types):
    custom_types = extract_custom_types(types)
    warnings = []
    errors = []

    def check_illegal_chars(type_name):
        for char in illegal_chars:
            if char in type_name:
                errors.append(f"Type {type_name} contains illegal character: {char}")
                return

    def check_field_type(field_type, path):
        # Base case: basic types are always valid
        if field_type in basic_types or field_type.endswith("[]") and field_type[:-2] in basic_types:
            return

        # Strip array symbol to check custom types
        if field_type.endswith("[]"):
            field_type = field_type[:-2]
        
        # Check for illegal characters
        check_illegal_chars(field_type)

        # Check for undeclared types
        if field_type not in custom_types:
            errors.append(f"Undeclared type: {field_type}")
            return
        
        # Check for circular references
        if field_type in path:
            warnings.append(f"Circular reference found: {' -> '.join(path + [field_type])}")
            return
        
        # Recursive check for fields of the custom type
        for field in custom_types[field_type]:
            for _, inner_type in field.items():
                check_field_type(inner_type, path + [field_type])
    
    # Check each field of each custom type
    for type_name, fields in custom_types.items():
        for field in fields:
            for _, field_type in field.items():
                check_field_type(field_type, [type_name])
    
    return warnings, errors

def generate_typescript_code(types):
    custom_types = extract_custom_types(types)
    ts_code_blocks = []

    for type_name, fields in custom_types.items():
        field_lines = []
        for field in fields:
            for field_name, field_type in field.items():
                # Handle array types
                if field_type.endswith("[]"):
                    base_type = field_type[:-2]
                    ts_type = f"{base_type}[]" if base_type in basic_types or base_type in custom_types else "any[]"
                elif field_type in basic_types or field_type in custom_types:
                    ts_type = field_type
                else:
                    ts_type = "any"

                field_lines.append(f"  {field_name}: {ts_type};")

        ts_code_block = f"interface {type_name} {{\n" + "\n".join(field_lines) + "\n}"
        ts_code_blocks.append(ts_code_block)

    return "\n\n".join(ts_code_blocks)

console = Console()

with open('def.yml', 'r') as file:
    yamldict = yaml.safe_load(file)
    types = yamldict['types']
    warnings, errors = check_types(types)
    for warning in warnings:
        console.print("[yellow]Warning:[/yellow]", warning)
    for error in errors:
        console.print("[red]Error:[/red]", error)
    if not errors:
        ts_code = generate_typescript_code(types)
        console.print(Markdown(f"```typescript\n{ts_code}\n```"))