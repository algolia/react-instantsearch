#!/usr/bin/env bash

# cause test to fail if one fails
set -e

jest
yarn lint
NODE_ENV=production yarn test:build
