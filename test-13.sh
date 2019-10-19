#!/bin/bash
#
# Script Name: test-13.sh
#
# Author: Mohamed Amine Ben Salah
# Date : 18/10/2019
#
# Description: The following script runs a BBB Test starting from 1 file (tests/sharednotes/**.sharednotes.test.js)
#              and it logs all the Test Log into logs/test-13-error
#              
#              This script is to choose from the following tests:
#               - Use Webcam
#               - Full Screen Webcam
#
#              
# Error Log: Any errors or output associated with the script can be found in logs/test-13-error
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
    node $file $URL &> logs/test-13-error echo $?
        if [ $? -eq 0 ]
                then
                echo "The Test was succesfully ran !"
                exit 0
                else
                echo "There was an error while running your Test !" >&2
                echo "The ERROR log is written to logs/test-13-error !"
                exit 1
        fi
}

while true
do
echo "Choose a test to run ?"

select option in 'Use Webcam' 'Full Screen Webcam' 'No, I do not want to run any Test !' 
do

case $option in
'Use Webcam')
file=tests/webcam/cam.webcam.test.js
run
;;

'Full Screen Webcam')
file=tests/webcam/fullscreen.webcam.test.js
run
;;

'No, I do not want to run any Test !')
echo "Remember ! You can run the Tests anytime !" 
exit
;;
esac
done

done