#!/bin/bash
#
# Script Name: test-01.sh
#
# Author: Mohamed Amine Ben Salah
# Date : 16/10/2019
#
# Description: The following script runs a BBB Test starting from tests/poll.test.js file
#              and it logs all the Test Log into logs/test-01
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
# Error Log: Any errors or output associated with the script can be found in logs/test-01
#



# deleting log file content at the start of the test
echo -n "" > logs/test-01

# defining URL link
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

# logging log into a log file
node tests/poll.test.js $URL >> logs/test-01