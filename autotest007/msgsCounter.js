const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
const moment = require('moment');
var path = require('path');   
const metrics = {} 
var metricsMsgs = path.join(__dirname,`./${basePath}/metricsMsgs.json`)
var fs = require("fs");

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}
function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
        hours  = ("0" + date.getHours()).slice(-2);
        minutes = ("0" + date.getMinutes()).slice(-2);
        seconds = ("0" + date.getSeconds()).slice(-2);
    return [ day, mnth, date.getFullYear() ].join("/") + ' ' + [hours, minutes, seconds].join(":");
}
async function msgsCounter() {
   /* -- Enable if you want to connect msgsCounter from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: true,
	    // args: ['--no-sandbox']
   });
//    const browser = await puppeteer.connect({
//        browserWSEndpoint: `ws://209.133.209.137:3000/?token=joao`
//    });
    const page = await browser.newPage();
    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=MsgsCounter&isModerator=false&action=create`);
        await page.waitFor(5000)
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitForSelector('[class="message--Z2n2nXu"]')

        for (i=0;i<=99999999999;i++){
            var x = new Date()
            await page.evaluateHandle(async ()=>{
                let msgs = await document.getElementsByClassName("message--Z2n2nXu")
                return msgs ? msgs[msgs.length - 1].innerText : "none"
            });
            var y = new Date()
            let totalMsgs = await page.evaluate(async()=> {
                let x = await document.querySelectorAll('[class="message--Z2n2nXu"]').length
                return x
            })
            const chat = await page.evaluateHandle(async ()=> {
                let x = require('/imports/api/group-chat-msg/index.js');
                x.GroupChatMsg.findOne({},{sort:{timestamp: -1},fields: {timestamp: 1}});
                var para = document.createElement('p');
                var data = new Date();
                var node = document.createTextNode(data);
                para.appendChild(node);
                let element = document.querySelectorAll('[class="message--Z2n2nXu"]');
                var msg = element[element.length - 1];
                var y = msg.appendChild(para);
                let z = y.innerText
                return Date.parse(z)
            })
            const date = new Date()
            const msgs = await page.evaluateHandle(async ()=> {
                let x = require('/imports/api/group-chat-msg/index.js');
                let y = x.GroupChatMsg.find({},{sort:{timestamp:-1}}).count();
                return y
            })
            var miniMongoMsgsNb = await msgs.jsonValue()
            var miniMongoTimestamp = await chat.jsonValue()
            console.log(miniMongoTimestamp)
            var dateTimestamp = Math.floor(toTimestamp(date) * 1000)

            const metric = await page.metrics();
            const performance = await page.evaluate(() => performance.toJSON())
            var z = y.getTime() - x.getTime();
            var domDuration = z / 1000;

            function diffTimestamp(dateTimestamp, miniMongoTimestamp) {
                var difference = dateTimestamp - miniMongoTimestamp;
                var diff = Math.floor(difference/1000);
                return diff;
            }
            var miniMongoDuration = diffTimestamp(dateTimestamp, miniMongoTimestamp)

            metrics['dateObj'] = moment(date).format('DD/MM/YYYY hh:mm:ss');
            metrics['totalMsgsObj'] = totalMsgs;
            metrics['totalMsgsMiniMongoObj'] = miniMongoMsgsNb;
            metrics['domDurationObj'] = domDuration;
            metrics['miniMongoDurationObj'] = miniMongoDuration / 1000;
            metrics['metricObj'] = metric;
            metrics['performanceObj'] = performance;
            
            fs.appendFileSync(metricsMsgs, JSON.stringify(metrics)+'\n', (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            });
            await page.waitFor(60000)
            i++;
        }
        process.exit(0)
    }   
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
        process.exit(1);
    }
}
msgsCounter();
