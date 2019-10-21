#!/bin/bash -ex

pids=()
URL="$1"

if [ -z "$URL" ] ; then
    echo -e "Enter BBB Base Server URL:"
   read URL
fi;

if [ -z "$URL" ] ; then
    echo "No URL provided";
    exit 1; 
fi;

echo "Starting with URL: $URL"

echo "Executing..."

node autotest001/app.js "$URL" &> autotest001/errors.log echo $? &
pids+=($!)
wait "${pids[@]}"

if [ $? -eq 0 ]
    then
    echo "The Test was succesfully ran !"
    exit 0
    else
    echo "There was an error while running your Test !" >&2
    echo "The ERROR log is written to autotest001/test-01-error !"
    exit 1
fi
