#!/usr/bin/env bash

Filename=$(basename "$1" .js)
Dir=$( dirname "$1" )
ModuleName=${2}${Dir#$3}/${Filename}

cat $1 | react2dts --module-name ${ModuleName} > ${Dir}/${Filename}.d.ts
