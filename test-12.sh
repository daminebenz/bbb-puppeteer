#!/bin/bash
#
# Script Name: test-12.sh
#
# Author: Mohamed Amine Ben Salah
# Date : 18/10/2019
#
# Description: The following script runs a BBB Test starting from 1 file (tests/sharednotes/**.sharednotes.test.js)
#              and it logs all the Test Log into logs/test-12-error
#              
#              This script is to choose from the following tests:
#               - Write Shared Notes
#               - Format Shared Notes Text
#               - Export Shared Notes as PDF
#               - Delete Shared Notes Text
#
#              
# Error Log: Any errors or output associated with the script can be found in logs/test-12-error
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
    node $file $URL &> logs/test-12-error echo $?
        if [ $? -eq 0 ]
                then
                echo "The Test was succesfully ran !"
                exit 0
                else
                echo "There was an error while running your Test !" >&2
                echo "The ERROR log is written to logs/test-12-error !"
                exit 1
        fi
}

while true
do
echo "Choose a test to run ?"

select option in 'Write Shared Notes' 'Format Shared Notes Text' 'Export Shared Notes as PDF' 'Delete Shared Notes Text' 'No, I do not want to run any Test !' 
do

case $option in
'Write Shared Notes')
file=tests/sharednotes/recording.record.test.js
run
;;

'Format Shared Notes Text')
file=tests/sharednotes/format.sharednotes.test.js
run
;;

'Export Shared Notes as PDF')
file=tests/sharednotes/export.sharednotes.test.js
run
;;

'Write Shared Notes')
file=tests/sharednotes/delete.sharednotes.test.js
run
;;

'No, I do not want to run any Test !')
echo "Remember ! You can run the Tests anytime !" 
exit
;;
esac
done

done