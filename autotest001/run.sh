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

date=$(date +"%d-%m-%Y")
n=1

# Increment $N as long as a directory with that name exists
while [[ -d "autotest001/${date}_${n}" ]] ; do
    n=$(($n+1))
done

newFolder="${date}_${n}"
mkdir -p autotest001/$newFolder

metricsLocation=autotest001/$newFolder/
touch $metricsLocation/metrics.json

node autotest001/app.js "$URL" "$metricsLocation" echo $? &>  autotest001/$newFolder/log.out 2> autotest001/$newFolder/errors.log &

pids+=($!)
wait "${pids[@]}"

if [ $? -eq 0 ]
    then
    echo "The Test was succesfully ran !"
    exit 0
    else
    echo "There was an error while running your Test !" >&2
    echo "The ERROR log is written to autotest001/$newFolder/errors.log !"
    exit 1
fi
