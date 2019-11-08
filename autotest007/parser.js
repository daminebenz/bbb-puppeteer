const fs = require('fs');
const readline = require('readline');
var path = require('path'); 
const basePath = process.argv[2]
var durationJSON = path.join(__dirname,`./${basePath}/durationJSON.json`)
var dataJSON = path.join(__dirname,`./${basePath}/dataJSON.json`)
var metrics = path.join(__dirname,`./${basePath}/metrics.json`)

var metricsMsgsFile = path.join(__dirname,`./${basePath}/metricsMsgs.json`)
var metricsProberFile = path.join(__dirname,`./${basePath}/metricsProber.json`)

const parsedMsgsMetricsFile = readline.createInterface({
    input: fs.createReadStream(metricsMsgsFile),
});
const parsedProberMetricsFile = readline.createInterface({
    input: fs.createReadStream(metricsProberFile),
});

parsedProberMetricsFile.on('line', (line)=>{
    try {
        const {metricObj:{ScriptDuration}} = JSON.parse(line)
        let formattedLine = `{"secondsToInitiallyLoadMessages": ${ScriptDuration}\n}`;
        fs.appendFileSync(durationJSON,formattedLine+',','utf-8')
    }
    catch(error){
        console.log({error})
    }
})

parsedMsgsMetricsFile.on('line', (line)=>{
    try {
        const {itemsObj,msgsObj,dateObj, metricObj:{Nodes, JSHeapUsedSize}} = JSON.parse(line)
        let formattedLine = `{"dateObj": ${dateObj}\n,"itemsObj": ${itemsObj}n,\"Nodes": ${Nodes}\n,"JSHeapUsedSize": ${JSHeapUsedSize}\n,"totalMessagesMiniMongo": ${msgsObj}\n}`;
        fs.appendFileSync(dataJSON,formattedLine+',','utf-8')
    }
    catch(error){
        console.log({error})
    }
})
fs.appendFileSync(metrics,JSON.parse(durationJSON, dataJSON), 'utf-8')