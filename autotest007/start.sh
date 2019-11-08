#!/bin/bash
BROWSERLESS="${BROWSERLESS:-34.95.196.119:3000}"
cd "$( dirname "${BASH_SOURCE[0]}" )"

pids=()

URL="$1"

# variables number
bot=3

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
while [[ -d "data/${date}_${n}" ]] ; do
    n=$(($n+1))
done

basePath=data/${date}_${n}

mkdir -p $basePath

while [ $bot -gt 0 ]; do
    node bots.js "$URL" "$basePath" "$bot" "$BROWSERLESS" &> $basePath/bots.out &
    pids+=($!)
    bot=$(($bot-1))
done

node msgsCounter.js "$URL" "$basePath" "$BROWSERLESS" &> $basePath/msgsCounter.out &

k=0
while [ $k -lt 60 ]; do
    node prober.js "$URL" "$basePath" "$BROWSERLESS" &> $basePath/prober.out &
    sleep 60
    k=$(($k+1))
done

function killprocs()
{
    echo killing ${pids[@]}
    rm -rf $basePath
    kill ${pids[@]}
}

trap killprocs EXIT 

wait "${pids[@]}"

trap - EXIT

if [ $? -eq 0 ]
    then
    echo "The Test was ran successfully !"
    exit 0
    else
    echo "There was an error while running your Test !" >&2
    exit 1
fi

