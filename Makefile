# Makefile

# Define the Docker Compose file name
COMPOSE_FILE := docker-compose.development.yml

# Default target executed when no arguments are given to make.
default_target: rebuild
.PHONY: default_target rebuild up down help

# Target for help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "version  - Bump project version using standard-version"
	@echo "build    - Build Docker image"
	@echo "up       - Bring up the development environment using docker-compose"
	@echo "down     - Take down the development environment using docker-compose"
	@echo "rebuild  - Forcefully rebuild the development environment using docker-compose"
	@echo "logs     - View output from containers"
	@echo "appLogs  - View output from app container"
	@echo "mongoLogs- View output from mongo container"
	@echo "help     - Show this help message"

# Target for versioning
version:
	npx standard-version

# Target for building the Docker image
build:
	docker compose -f $(COMPOSE_FILE) build

# Target to bring up the development environment
up:
	docker compose -f $(COMPOSE_FILE) up -d

# Target to take down the development environment
down:
	docker compose -f $(COMPOSE_FILE) down

# Target to forcefully rebuild the development environment
rebuild:
	docker compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up -d

# Target to view logs from the containers
logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# Target to view logs from the app container
appLogs:
	docker compose -f $(COMPOSE_FILE) logs -f app

# Target to view logs from the database container
mongoLogs:
	docker compose -f $(COMPOSE_FILE) logs -f mongo

# Extract version from package.json
#VERSION := $(shell node -p "require('./package.json').version")
#NAME := $(shell node -p "require('./package.json').name")

# @echo "dev      - Run in development mode"
# @echo "run      - Run Docker container"

# Target for running the Docker container in development mode
# dev:
#	docker run -p 3000:3000 -v $(shell pwd):/usr/src/app $(NAME):$(VERSION)

# Target for running the Docker container
#run:
#	docker run -p 3000:3000 $(NAME):$(VERSION)