.PHONY: default
all:
	@echo please specify a target

.PHONY: clean
clean:

.PHONY: install
install:

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down --remove-orphans

.PHONY: destroy
destroy:
	docker-compose down --volumes --remove-orphans

.PHONY: pre-commit
pre-commit:
	pre-commit install
	pre-commit install --hook-type commit-msg
