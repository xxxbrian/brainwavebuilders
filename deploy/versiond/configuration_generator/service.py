from datetime import datetime
from .version import Version
import typing as t

ERR_DEFAULT_VERSION_ADDED = "A default version must not be added to the \
service as it must be set using promote_version."

VERSION_BLUE = "blue"
VERSION_GREEN = "green"

PRODUCTION_VERSIONS = [
    VERSION_BLUE,
    VERSION_GREEN
]


class Service:
    versions: t.Dict[str, Version]
    base_url: str
    serving: str

    def __init__(self, base_url: str, versions: t.List['Version'] = []):
        self.versions = {}
        self.serving = ""
        self.base_url = base_url

        for version in versions:
            self.add_version(version)

    def generate_header(self) -> str:
        return f'''\
# Service: {self.base_url}
#
# THIS FILE IS AUTO GENERATED. DO NOT EDIT.
# Generated at {datetime.now().isoformat()}\
'''

    def compile(self) -> str:
        for version in PRODUCTION_VERSIONS:
            if version not in self.versions:
                raise ValueError(f"Production version {version} is not set.")

        if self.serving == "":
            raise ValueError(
                "No serving version set. Please promote exactly one version.")

        versions = "\n\n".join([
            version.compile(self.base_url)
            for version in self.versions.values()
        ])

        production_version = self.versions[self.serving].compile_as_serving(
            self.base_url
        )

        return '\n\n'.join([self.generate_header(), production_version, versions])

    def add_version(self, version: 'Version') -> None:
        if version.name == "":
            raise ValueError(ERR_DEFAULT_VERSION_ADDED)

        self.versions[version.name] = version

    def remove_version(self, version: 'Version') -> None:
        if version.name in self.versions:
            self.versions.pop(version.name)

    def get_version(self, name: str) -> 'Version':
        return self.versions[name]

    def promote_version(self, name: str) -> None:
        if name not in self.versions:
            raise ValueError(f"Version {name} does not exist.")

        if name not in PRODUCTION_VERSIONS:
            raise ValueError(f"Version {name} is not a production version.")

        self.serving = name
