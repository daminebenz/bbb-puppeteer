# autotest001

## About

This script runs 2 puppeteer instances and gets the Metrics and the performance stats and Memory Usage.

This script generates execution folder with the name `Date_ExecutionNum` inside autotest001 folder.

This script generates its errors log in the `errors.log` file and the Metrics in `metrics.json` file.

## Running

To run, execute `./autotest001.sh *URL*`

~~~bash
./autotest001.sh https://bbb-website.com
~~~

The default script will launch the clients it needs on the server you describe in the URL.

## ToDo

- [ ] Add URL when running the command to be able to point on the Server you want to test.
- [ ] Check the generated Metrics in the `metrics.json` file.
