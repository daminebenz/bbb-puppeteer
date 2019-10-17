#!/bin/bash
#
# Script Name: test-05.sh
#
# Author: Mohamed Amine Ben Salah
# Date : 16/10/2019
#
# Description: The following script runs a BBB Test starting from tests/poll.test.js file
#              and it logs all the Test Log into logs/test-05
#              
#              This Test is doing the following:
#               - Starting a Poll
#               - Publishing Poll results
#               - Starting a new Poll
#               - Writing custom Poll options
#               - Publishing Poll results
#               - Hiding Poll results from presentation
#               - Starting Poll from Uploaded File
#               - Publishing Poll results
#               - Hiding Poll results from presentation
#
#              
# Error Log: Any errors or output associated with the script can be found in logs/test-05
#

# Defining URL link
if [ -z "$1" ]
then

        echo -e "Enter BBB Base Server URL:"
        read URL
        echo "Running your Test in : $URL"

        if [ -z "$URL" ]
        then
                echo "URL required"
                exit 1
        fi

fi

echo "Executing..."

PASS=0
FAIL=0 
env PASS=$PASS FAIL=$FAIL node tests/poll.test.js $URL > logs/test-05 2> logs/test-05-error
echo "Successful Tests => $passed of 9 !"
echo "Failed Tests => $failed of 9 !"