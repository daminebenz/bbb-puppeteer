const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}

var metricsJSON = path.join(__dirname,`./${basePath}/metricsProber.json`)
var fs = require("fs");

async function probe() {
    /* -- Enable if you want to connect Probe from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: true,
	    // args: ['--no-sandbox']
    });
    //const browser = await puppeteer.connect({
    //    browserWSEndpoint: `ws://209.133.209.137:3000/?token=joao`
    //});

    const page = await browser.newPage();

    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Probe&isModerator=false&action=create`);
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        
        const date = new Date()
        const metric = await page.metrics();
        const performance = await page.evaluate(() => performance.toJSON())
        const itemsNb = await page.evaluate(()=>
            document.querySelectorAll('[class="item--ZDfG6l"]').length
        )

        metrics['dateObj'] = date;
        metrics['itemsObj'] = itemsNb;
        metrics['metricObj'] = metric;
        metrics['performanceObj'] = performance;
        
        fs.appendFileSync(metricsJSON, JSON.stringify(metrics)+'\n', (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("Prober log file has been created !");
        });
        process.exit(0)
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
}
probe();
