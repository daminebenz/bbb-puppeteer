const fs = require('fs');
const readline = require('readline');
var path = require('path'); 
const basePath = process.argv[2]
var metricsMsgs = path.join(__dirname,`./${basePath}/metricsMsgs.json`)
var metricsProber = path.join(__dirname,`./${basePath}/metricsProber.json`)
var proberJSON = path.join(__dirname,`./${basePath}/proberJSON.json`)
var msgsJSON = path.join(__dirname,`./${basePath}/msgsJSON.json`)

const parsedMsgsMetrics = readline.createInterface({
    input: fs.createReadStream(metricsMsgs),
});
const parsedProberMetrics = readline.createInterface({
    input: fs.createReadStream(metricsProber),
});

parsedProberMetrics.on('line', (line)=>{
    try {
        const {metricObj:{ScriptDuration}} = JSON.parse(line)
        let formattedLine = `{"secondsToInitiallyLoadMessages": ${ScriptDuration}}`;
        fs.appendFileSync(proberJSON, JSON.parse(formattedLine)+'\n', 'utf-8')
    }
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
    }
})

parsedMsgsMetrics.on('line', (line)=>{
    try {
        const {itemsObj,msgsObj,dateObj, metricObj:{Nodes, JSHeapUsedSize}} = JSON.parse(line)
        let formattedLine = `{"dateObj": "${dateObj}","itemsObj": ${itemsObj},"Nodes": ${Nodes},"JSHeapUsedSize": ${JSHeapUsedSize},"totalMessagesMiniMongo": ${msgsObj}}`;
        fs.appendFileSync(msgsJSON, JSON.parse(formattedLine)+'\n', 'utf-8')
    }
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
    }
})