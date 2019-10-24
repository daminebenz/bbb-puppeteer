#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

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
while [[ -d "${date}_${n}" ]] ; do
    n=$(($n+1))
done

mkdir -p ${date}_${n}

basePath=${date}_${n}

node puppeteer01.js "$URL" "$basePath" > $basePath/puppeteer01.out &
pids+=($!)
node puppeteer02.js "$URL" "$basePath" > $basePath/puppeteer02.out &
pids+=($!)
wait "${pids[@]}"
# trap " kill ${pids[@]} " EXIT

if [ $? -eq 0 ]
    then
    echo "The Test was ran successfully !"
    exit 0
    else
    echo "There was an error while running your Test !" >&2
    exit 1
fi
