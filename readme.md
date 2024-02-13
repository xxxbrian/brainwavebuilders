# README

## Setting up for development

This project uses [pre-commit](https://pre-commit.com/#install). Please install it prior to development. Then, run `pre-commit install` to install git hooks (or if you are using `make`, do `make pre-commit`).

Code is ran in Docker and Docker Compose. If you haven't already, please [install](https://docs.docker.com/compose/install/) it as well.

If you are on a Unix-like OS, you can optionally install Make. If you are on Windows, you can use [WSL](https://docs.microsoft.com/en-us/windows/wsl/).

All project dependencies are setup automatically in the Docker for consistency.
