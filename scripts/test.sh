#!/usr/bin/env bash

# cause test to fail if one fails
set -e

export BABEL_ENV=development

if [ "$CI" = "true" ]
  then jest --runInBand
  else jest
fi
yarn lint
NODE_ENV=production yarn test:build
