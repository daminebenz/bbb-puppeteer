# autotest007

## About

This script is about Chat Virtualized List testing.

## Details

This script runs 3 puppeteer instances and gets the Metrics and the Performance stats.

This script generates execution folder with the name `Date_ExecutionNum` (example: `data/01-01-2019_1`) inside autotest007 folder.

This script generates the log files `bots.out`, `msgsCounter.out` and `prober.out` and the Metrics in `metricsMsgs.json` and `metricsProber.json` files.

## Running

To run, execute `./autotest007/run.sh *URL*`

or also running: 

```
cd autotest007
./start.sh
```

~~~bash
example: 

./autotest007/start.sh https://bbb-website.com
~~~

The default script will launch the clients it needs on the server you describe in the URL.

## Outputs

The outputs of `msgsCounter.js` and `prober.js` will be displayed in `JSON` files.

## Parsing the results

`parser.js` is responsable  of parsing the `metricsMsgs.json` and `metricsProber.json` into 2 TSV files `msgsTSV.tsv` and `proberTSV.tsv`.

## Graphs

`msgsTSV.tsv` and `proberTSV.tsv` are used to draw graphs in google spreadsheets:

for example: 

[With Virtualized Lists](https://docs.google.com/spreadsheets/d/1sWmln2iHUBrD5F4WEykgpFqAVwAItOcanB5mKKaaeho/edit?usp=sharing) => [pr-8287](https://github.com/bigbluebutton/bigbluebutton/pull/8287)
