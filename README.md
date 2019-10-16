# bbb-puppeteer

Puppeteer scripts to test the BigBlueButton client.

The goal is to easily test the functionalities of a BigBlueButton server under various circumstances, and based on the [Systematic BigBlueButton 2.2 Test Plan](https://docs.google.com/spreadsheets/d/1RUUKC30n5uMdnBeLgwkN4qvxWAJsKT6UWXMoGJOhleE).

# Setup

## Requirements

  npm: ```apt install npm```

## Installation

`git clone git@github.com:daminebenz/bbb-puppeteer.git;`
`cd bbb-puppeteer;`
`npm install;`


The basic operation is to run `test-XX.sh`, a BASH script that in turn runs a number of `node **.test.js *URL*` commands.  Each `test-XX.sh` uses the BigBlueButton server URL provided.

`test-XX.sh` uses an environment variable `URL` to connect to the BigBlueButton server.

~~~

## Running

To run, execute `./test-XX.sh *URL*`

~~~bash
./test-01.sh https://8d1ab45384a1.bbbvm.imdt.com.br
~~~

The default script will launch the clients it needs on the server you describe in the URL.

## ToDo

- [ ] Add URL when running the command to be able to point on the Server you want to test.

## That's all
## Happy testing
