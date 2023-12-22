# Makefile

# Extract version from package.json
VERSION := $(shell node -p "require('./package.json').version")
NAME := $(shell node -p "require('./package.json').name")

# Define the Docker Compose file name
COMPOSE_FILE := docker-compose.development.yml

# Default target executed when no arguments are given to make.
default_target: all
.PHONY: default_target all version build run
all: version build

# Target for help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "version  - Bump project version using standard-version"
	@echo "build    - Build Docker image"
	@echo "dev      - Run in development mode"
	@echo "run      - Run Docker container"
	@echo "up       - Bring up the development environment using docker-compose"
	@echo "down     - Take down the development environment using docker-compose"
	@echo "help     - Show this help message"

# Target for versioning
version:
	npx standard-version

# Target for building the Docker image
build:
	docker build -t $(NAME):$(VERSION) .

# Target for running the Docker container in development mode
dev:
	docker run -p 3000:3000 -v $(shell pwd):/usr/src/app $(NAME):$(VERSION)

# Target for running the Docker container
run:
	docker run -p 3000:3000 $(NAME):$(VERSION)

# Target to bring up the development environment
up:
	docker compose -f $(COMPOSE_FILE) up -d

# Target to take down the development environment
down:
	docker compose -f $(COMPOSE_FILE) down