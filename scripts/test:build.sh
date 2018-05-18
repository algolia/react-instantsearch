#!/usr/bin/env bash

# This script is used to test the build steps of our packages
# to ensure we will be able to release new versions

set -e # exit when error

# Will be removed in upcoming PR
lerna run build --scope react-instantsearch-*

(cd packages/react-instantsearch && yarn build)
(cd packages/react-instantsearch && yarn test:size)
