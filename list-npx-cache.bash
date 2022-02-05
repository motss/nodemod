#!/bin/bash

files=$(find ~/.npm/_npx -type f | grep -v 'node_modules' | grep -v 'package-lock.json')

for a in $files
do
  echo $a
  cat $a
  echo $'\n'
done
