#!/bin/bash

# NOTE: THere is a discrepancy in the npx cache in npm between 8.4.1 and 8.1.4.
# There is an additional zx found in the npx cache when compared to the local npx cache using 8.1.4.

files=$(find $(npm config get cache)/_npx -type f | grep -v 'node_modules' | grep -v 'package-lock.json')
# files=$(find $(npm config get cache)/_npx -type f | grep -v 'node_modules')

for a in $files
do
  echo "::group::$a"
  cat $a
  echo $'\n'
  echo "::endgroup::"
done

# NOTE: List all files with human readable size in the npm cache
# echo "::group::$(ls -lhR $(npm config get cache) || echo 'nil')"
# echo "::endgroup::"
