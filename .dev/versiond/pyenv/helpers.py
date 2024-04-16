import os


# must_get_env gets the environment variable.
# raises an exception should it fail.
def must_get_env(name: str) -> str:
    if name not in os.environ:
        raise LookupError(
            f'must_get_env: Environment variable {name} not found')
    return name


# get_env gets the environment variable.
# returns the default value should it fail.
def env(name: str, default: str = '') -> str:
    return os.environ.get(name, default)
