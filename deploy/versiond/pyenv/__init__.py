from .helpers import env

ENV = env("ENV", "local")
PORT = env("BIND_PORT", "8080")
DB_HOST = env("DB_HOST", "localhost")
DB_USER = env("DB_USER", "root")
DB_PASSWORD = env("DB_PASS", "")
