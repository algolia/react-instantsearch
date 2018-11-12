#!/usr/bin/env bash

set -e

for example in examples/* ; do
  (
    cd $example
    yarn
    yarn build
    CI=true yarn test
  )
done
