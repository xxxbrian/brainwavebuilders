.PHONY: default clean install up down destroy pre-commit all demo

all:
	@echo error: please specify a target.
	@echo hint: To run the project, do "make up".

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

destroy:
	docker-compose down --volumes --remove-orphans

pre-commit:
	pre-commit install
	pre-commit install --hook-type commit-msg

db-diff:
	docker compose exec backend bash -c 'yarn && yarn prisma migrate dev --name "migration" --create-only'

db-apply:
	docker compose exec backend bash -c 'yarn && yarn prisma migrate dev'

update-endpoints:
	@docker compose exec endpoint-gen bash -c 'python3 rpc/generate.py rpc/model.yml client client/src/backend brainwaves /api'
	@docker compose exec endpoint-gen bash -c 'python3 rpc/generate.py rpc/model.yml ts-server server/src server/src/handlers server/src/apis /api'
