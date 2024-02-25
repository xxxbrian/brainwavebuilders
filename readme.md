# README

## Setting up for development

This project uses [pre-commit](https://pre-commit.com/#install). Please install it prior to development. Then run:

```shell
pre-commit install
pre-commit install --hook-type commit-msg
```

to install git hooks. (or if you are using `make`, do `make pre-commit`).

Code is ran in Docker and Docker Compose. If you haven't already, please [install](https://docs.docker.com/compose/install/) it as well.

If you are on a Unix-like OS, you can optionally install Make. If you are on Windows, you can use [WSL](https://docs.microsoft.com/en-us/windows/wsl/).

All project dependencies are setup automatically in the Docker for consistency.

## Running the code

If you have docker installed already, you can run the code by (in the project root directory):

```sh
make up
```

This will launch docker compose in daemon mode and run your app at:

| Service          | Port |
| ---------------- | ---- |
| main app (nginx) | 3900 |
| client           | 3901 |
| backend          | 3902 |
| database (mysql) | 3903 |

> Note: nginx is used as a reverse proxy to both client and backend. Use [localhost:3900](http://localhost:3900) in your browser to access the app.

To shutdown, do:

```sh
make down
```

This will stop the containers, but will retain the database data. To shutdown and remove all data, do:

```sh
make destroy
```

## Changing the database

If you need to change the database, you must:

- Go to [schema.prisma](server/prisma/schema.prisma)
- Update the schema file to your liking
- Run `make db-diff`
- Check the generated SQL at [migrations](server/prisma/migrations/). If it doesn't look right, remove the newly-generated migration and try again.
- If it looks alright, do `make db-apply` to apply the changes.
