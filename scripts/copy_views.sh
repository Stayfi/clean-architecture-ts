#!/bin/bash
mkdir -p ./dist/FrameworkAndDrivers/Web/express/app
cd src/FrameworkAndDrivers/Web/express/app
if [[ "$OSTYPE" == "darwin"* ]]; then
  rsync -R `find . -name *.njk` ../../../../../dist/FrameworkAndDrivers/Web/express/app/
else
  cp --parents `find . -name *.njk` ../../../../../dist/FrameworkAndDrivers/Web/express/app/
fi