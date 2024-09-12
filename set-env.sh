#!/bin/bash

# Define environment argument
ENV=$1

# Check if an environment was provided
if [ -z "$ENV" ]; then
  echo "Usage: ./set-env.sh [qa|prod]"
  exit 1
fi

# Define the paths to the environment files
QA_ENV_FILE=".env.examples.qa"
PROD_ENV_FILE=".env.examples.prod"
TARGET_ENV_FILE=".env"

# Determine which environment to copy
if [ "$ENV" == "qa" ]; then
  if [ -f "$QA_ENV_FILE" ]; then
    cp "$QA_ENV_FILE" "$TARGET_ENV_FILE"
    echo "QA environment copied to .env"
  else
    echo "$QA_ENV_FILE does not exist"
    exit 1
  fi
elif [ "$ENV" == "prod" ]; then
  if [ -f "$PROD_ENV_FILE" ]; then
    cp "$PROD_ENV_FILE" "$TARGET_ENV_FILE"
    echo "Production environment copied to .env"
  else
    echo "$PROD_ENV_FILE does not exist"
    exit 1
  fi
else
  echo "Invalid environment. Use 'qa' or 'prod'."
  exit 1
fi
