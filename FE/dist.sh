#!/bin/sh

DIST=dist
BUNDLE=bundle.js

if [ -e $BUNDLE ]; then
  rm -f $BUNDLE
fi

npm run build
if [ $? -ne 0 ]; then
    echo -e "\n\n\nBuild failed"
    exit -1
fi

if [ -e $DIST ]; then
  rm -rf $DIST
fi

mkdir $DIST

cp index.html $DIST/
cp style.css $DIST/
cp $BUNDLE $DIST/
cp -rvp assets $DIST/
