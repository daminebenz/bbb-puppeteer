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