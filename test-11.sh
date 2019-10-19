#!/bin/bash
#
# Script Name: test-11.sh
#
# Author: Mohamed Amine Ben Salah
# Date : 18/10/2019
#
# Description: The following script runs a BBB Test starting from 1 file (tests/record/recording.record.test.js)
#              and it logs all the Test Log into logs/test-11-error
#              
#              This script runs the following test:
#               - Record Meeting
#
#              
# Error Log: Any errors or output associated with the script can be found in logs/test-11-error
#

run(){
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
    node $file $URL &> logs/test-11-error echo $?
        if [ $? -eq 0 ]
                then
                echo "The Test was succesfully ran !"
                exit 0
                else
                echo "There was an error while running your Test !" >&2
                echo "The ERROR log is written to logs/test-11-error !"
                exit 1
        fi
}

while true
do
echo "Choose a test to run ?"

select option in 'Record Meeting' 'No, I do not want to run any Test !' 
do

case $option in
'Record Meeting')
file=tests/record/recording.record.test.js
run
;;

'No, I do not want to run any Test !')
echo "Remember ! You can run the Tests anytime !" 
exit
;;
esac
done

done