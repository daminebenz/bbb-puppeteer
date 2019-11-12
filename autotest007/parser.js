const fs = require('fs');
const readline = require('readline');
var path = require('path'); 
const basePath = process.argv[2]
var metricsMsgs = path.join(__dirname,`./${basePath}/metricsMsgs.json`)
var metricsProber = path.join(__dirname,`./${basePath}/metricsProber.json`)
var proberTSV = path.join(__dirname,`./${basePath}/proberTSV.tsv`)
var msgsTSV = path.join(__dirname,`./${basePath}/msgsTSV.tsv`)

const parsedMsgsMetrics = readline.createInterface({
    input: fs.createReadStream(metricsMsgs),
});
const parsedProberMetrics = readline.createInterface({
    input: fs.createReadStream(metricsProber),
});

parsedProberMetrics.on('line', (line)=>{
    try {
        const {metricObj:{ScriptDuration}} = JSON.parse(line)
        let formattedLine = `secondsToInitiallyLoadMessages\t${ScriptDuration}\t`;
        fs.appendFileSync(proberTSV, formattedLine+'\n', 'utf-8')
    }
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
    }
})

parsedMsgsMetrics.on('line', (line)=>{
    try {
        const {itemsObj,msgsObj,dateObj, metricObj:{Nodes, JSHeapUsedSize}} = JSON.parse(line)
        let formattedLine = `dateObj\t${dateObj}\titemsObj\t${itemsObj}\tNodes\t${Nodes}\tJSHeapUsedSize\t${JSHeapUsedSize}\ttotalMessagesMiniMongo\t${msgsObj}\t`;
        fs.appendFileSync(msgsTSV, formattedLine+'\n', 'utf-8')
    }
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
    }
})