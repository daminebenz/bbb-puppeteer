const fs = require('fs');
const readline = require('readline');
var path = require('path'); 
const basePath = process.argv[2]
var metrics = path.join(__dirname,`./${basePath}/metrics.json`)
var metricsMsgs = path.join(__dirname,`./${basePath}/metricsMsgs.json`)
var metricsProber = path.join(__dirname,`./${basePath}/metricsProber.json`)
var data = {}

const parsedMsgsMetrics = readline.createInterface({
    input: fs.createReadStream(metricsMsgs),
});
const parsedProberMetrics = readline.createInterface({
    input: fs.createReadStream(metricsProber),
});

parsedProberMetrics.on('line', (line)=>{
    try {
        const {metricObj:{ScriptDuration}} = JSON.parse(line)
        let formattedLine = `{"secondsToInitiallyLoadMessages": ${ScriptDuration}}\n`;
        var obj = {...data,  ...JSON.parse(formattedLine)}
        fs.appendFileSync(metrics, JSON.stringify(obj)+'\n', 'utf-8')
    }
    catch(error){
        console.log({error})
    }
})

parsedMsgsMetrics.on('line', (line)=>{
    try {
        const {itemsObj,msgsObj,dateObj, metricObj:{Nodes, JSHeapUsedSize}} = JSON.parse(line)
        let formattedLine = `{"dateObj": "${dateObj}",\n"itemsObj": ${itemsObj},\n"Nodes": ${Nodes},\n"JSHeapUsedSize": ${JSHeapUsedSize},\n"totalMessagesMiniMongo": ${msgsObj}}\n`;
        data = JSON.parse(formattedLine)
    }
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
    }
})