const puppeteer = require('puppeteer-core');
const BROWSERLESS = `ws://${process.argv[5]}?token=joao`;
const URL = process.argv[2]
const bot = process.argv[4]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}

var metricsJSON = path.join(__dirname,`./${basePath}/metrics${bot}.json`)
var fs = require("fs");

async function puppeteer0() {
    const browser = await puppeteer.connect({
        browserWSEndpoint: BROWSERLESS
    });
    const page = await browser.newPage();
    try{
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Messenger${bot}&isModerator=false&action=create`);
            
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');

        for(i=1;i<=250;i++){
            const delay = Math.floor(Math.random() * 111);
            // Writing Public Chat Message
            await page.keyboard.type( `Messenger${bot}: message `+i+` sent !`, {
                delay
            });

            // Sending Message to Public Chat
            await page.keyboard.press('Enter', {
                delay
            });
        }
                
        await page.waitFor(3000)

        const metric = await page.metrics();
        const performance = await page.evaluate(() => performance.toJSON())
        const itemsNb = await page.evaluate(()=>
            document.querySelectorAll('[class="item--ZDfG6l"]').length
        )

        metrics['itemsObj'] = itemsNb;
        metrics['metricObj'] = metric;
        metrics['performanceObj'] = performance;
        
        fs.appendFileSync(metricsJSON, JSON.stringify(metrics, null, 4), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer log file has been created !");
        });
        process.exit(0);
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
    browser.close()
}
puppeteer0();