UID = $(shell id -u)
DOCKER_BE = store-graphql-app

help: ## Mostrar este mensaje de ayuda
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

start: ## iniciar los contenedores
	docker network create store-graphql-network || true
	cp -n .env.example .env || true
	cp -n docker-compose.yml.dist docker-compose.yml || true
	U_ID=${UID} docker-compose up -d

stop: ## detener los contenedores
	U_ID=${UID} docker-compose stop

restart: ## reiniciar los contenedores
	$(MAKE) stop && $(MAKE) start

build: ## construir los contenedores
	docker network create store-graphql-network || true
	cp -n .env.example .env || true
	cp -n docker-compose.yml.dist docker-compose.yml || true
	U_ID=${UID} docker-compose build

prepare: ## Runs backend commands
	$(MAKE) dependencies-install

run: ## iniciar aplicación
	npm run dev

# Backend commands
dependencies-install: ## instalar dependencias
	npm install
# End backend commands
