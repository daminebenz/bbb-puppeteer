const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
const moment = require('moment');

var path = require('path');   
const metrics = {} 

var metricsMsgs = path.join(__dirname,`./${basePath}/metricsMsgs.json`)
var fs = require("fs");

async function msgsCounter() {
   /* -- Enable if you want to connect msgsCounter from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: true,
	    // args: ['--no-sandbox']
   });
   // const browser = await puppeteer.connect({
   //     browserWSEndpoint: `ws://209.133.209.137:3000/?token=joao`
   // });
    const page = await browser.newPage();
    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=MsgsCounter&isModerator=false&action=create`);
        await page.waitFor(5000)
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);
        
        await page.waitFor(3000)

        for (i=0;i<=99999999999;i++){
            var x = new Date()
            let msgObj = await page.evaluateHandle(async ()=>{
                let msg = await document.getElementsByClassName("message--Z2n2nXu")
                return msg[msg.length - 1].innerText
            });
            var y = new Date();
            const chat = await page.evaluateHandle(()=> {
                let x = require('/imports/api/group-chat-msg/index.js')
                let req = x.GroupChatMsg.findOne({},{sort:{timestamp: -1},fields: {timestamp: 1}})
                return req.timestamp
            })
            var miniMongoTimestamp = chat.jsonValue()
            var miniMongoLastMsgDate = new Date(miniMongoTimestamp)
            var lastMsgDOM = await msgObj.jsonValue()

            const date = new Date()
            const rightnow = moment(date).format('DD-MM-YYYY hh:mm:ss');
            const metric = await page.metrics();
            const performance = await page.evaluate(() => performance.toJSON())
            const itemsNb = await page.evaluate(()=>
                document.querySelectorAll('[class="item--ZDfG6l"]').length
            )
            var z = y.getTime() - x.getTime();
            var domDuration = z / 1000;
            
            metrics['domDurationObj'] = domDuration;
            metrics['miniMongoLastMsgDateObj'] = moment(miniMongoLastMsgDate).format('DD-MM-YYYY hh:mm:ss');
            metrics['lastMsgDOMObj'] = lastMsgDOM;
            metrics['dateObj'] = rightnow;
            var miniMongoDuration = date.getTime() - miniMongoLastMsgDate.getTime();
            metrics['miniMongoDurationObj'] = miniMongoDuration / 1000;
            metrics['itemsObj'] = itemsNb;
            metrics['metricObj'] = metric;
            metrics['performanceObj'] = performance;
            
            fs.appendFileSync(metricsMsgs, JSON.stringify(metrics)+'\n', (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("MsgsCounter log file has been created !");
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
