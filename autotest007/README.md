# autotest007

## About

This script is about Chat Virtualized List testing.

## Details

This script runs 3 puppeteer instances and gets the Metrics and the Performance stats.

This script generates execution folder with the name `Date_ExecutionNum` (example: `data/01-01-2019_1`) inside autotest007 folder.

This script generates the log files `puppeteer01.out`, `puppeteer02.out` and `puppeteer03.out` and the Metrics in `puppeteer02.json` and `puppeteer03.json` files.

## Running

To run, execute `./autotest007/run.sh *URL*`

or also running: 

```
cd autotest007
./run.sh
```

~~~bash
example: 

./autotest007/run.sh https://bbb-website.com
~~~

The default script will launch the clients it needs on the server you describe in the URL.

## Outputs

The outputs of `puppeteer02.js` and `puppeteer03.js` will be displayed in `JSON` files: 
`puppeteer02.json` and `puppeteer03.json`.

## Parsing the results

`parser.js` is used to parse the `puppeteer02.json` and `puppeteer03.json` into 2 TSV files `puppeteer02.tsv` and `puppeteer03.tsv`.

## Parsing result

Using `parser.js`, running the following command:

`node autotest007/parser.js data/01-01-2019_1` => focusing the logged folder.

This will create `puppeteer02.tsv` and `puppeteer03.tsv` files, that we will simply import them in a Google SpreadSheet to draw our graphs.

## Graphs

`puppeteer02.tsv` and `puppeteer03.tsv` are used to draw graphs in google spreadsheets:

for example: 

[With Virtualized Lists](https://docs.google.com/spreadsheets/d/1sWmln2iHUBrD5F4WEykgpFqAVwAItOcanB5mKKaaeho/edit?usp=sharing) => [pr-8287](https://github.com/bigbluebutton/bigbluebutton/pull/8287)

