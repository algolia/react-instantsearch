#!/bin/bash

set -e # exit on error


echo "building via webpack"

# TODO: uncomment this before merging
# yarn webpack --config website/webpack.config.js

echo "building via parcel"

(
  cd examples/hooks-e-commerce;
  yarn build --dist-dir ../../website/examples/hooks-e-commerce;
)
