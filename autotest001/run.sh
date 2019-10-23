#!/bin/bash

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

metricsLocation=autotest001/$newFolder
touch $metricsLocation/metrics1.json
touch $metricsLocation/metrics2.json

puppeteer01_out=autotest001/$newFolder/puppeteer01.out
touch $puppeteer01_out
puppeteer02_out=autotest001/$newFolder/puppeteer02.out
touch $puppeteer02_out

pids=()
node autotest001/puppeteer01.js "$URL" "$metricsLocation" > $puppeteer01_out &
pids+=($!)
node autotest001/puppeteer02.js "$URL" "$metricsLocation" > $puppeteer02_out &
pids+=($!)
wait "${pids[@]}"

if [ $? -eq 0 ]
    then
    echo "The Test was ran successfully !"
    exit 0
    else
    echo "There was an error while running your Test !" >&2
    exit 1
fi
