#!/bin/bash
#
# Script Name: test-05.sh
#
# Author: Mohamed Amine Ben Salah
# Date : 16/10/2019
#
# Description: The following script runs a BBB Test starting from 3 different files (tests/poll/**.poll.test.js)
#              and it logs all the Test Log into logs/test-05-error
#              
#              This script is to choose from the following tests:
#               - Running a normal Poll
#               - Running a customized Poll
#               - Running a Poll with options from a PDF file
#
#              
# Error Log: Any errors or output associated with the script can be found in logs/test-05-error
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
    node $file $URL &> logs/test-05-error echo $?
        if [ $? -eq 0 ]
                then
                echo "The Test was succesfully ran !"
                exit 0
                else
                echo "There was an error while running your Test !" >&2
                echo "The ERROR log is written to logs/test-05-error !"
                exit 1
        fi
}

while true
do
echo "Choose a test to run ?"

select option in 'Normal Poll' 'Custom Poll' 'PDF Poll' 'No, I do not want to run any Test !' 
do

case $option in
'Normal Poll')
file=tests/poll/poll.poll.test.js
run
;;

'Custom Poll')
file=tests/poll/custom.poll.test.js
run
;;

'PDF Poll')
file=tests/poll/pdf.poll.test.js
run
;;

'No, I do not want to run any Test !')
echo "Remember ! You can run the Tests anytime !" 
exit
;;
esac
done

done