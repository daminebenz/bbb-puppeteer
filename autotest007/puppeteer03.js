const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]

var path = require('path');   
const metrics = {}
const moment = require('moment');

var metricsJSON = path.join(__dirname,`./${basePath}/puppeteer03.json`)
var fs = require("fs");

async function puppeteer03() {
    const browser = await puppeteer.launch({
        headless: true,
	    args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer03&isModerator=false&action=create`);
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        
        const date = new Date()
        const metric = await page.metrics();
        const performance = await page.evaluate(() => performance.toJSON())
        const msgs = await page.evaluateHandle(async ()=> {
            let x = require('/imports/api/group-chat-msg/index.js');
            let y = x.GroupChatMsg.find({},{sort:{timestamp:-1}}).count();
            return y
        }); 

        var miniMongoMsgsNb = await msgs.jsonValue()
        var x = new Date()
        let totalMsgs = await page.evaluate(async()=> {
            let n = await document.querySelectorAll('[class="message--Z2n2nXu"]').length
            return n
        }); 

        var y = new Date()      
        var z = y.getTime() - x.getTime();
        var domDuration = z / 1000;

        metrics['dateObj'] = moment(date).format('DD/MM/YYYY hh:mm:ss');
        metrics['totalMsgsDomObj'] = totalMsgs;
        metrics['totalMsgsMiniMongoObj'] = miniMongoMsgsNb;
        metrics['domDurationObj'] = domDuration;
        metrics['metricsObj'] = metric;
        metrics['performancesObj'] = performance;
        
        fs.appendFileSync(metricsJSON, JSON.stringify(metrics)+'\n', (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
        process.exit(0)
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
}
puppeteer03();
