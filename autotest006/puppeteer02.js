const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}
const conf = require('./conf')

const config = conf.config
var metricsJSON = path.join(__dirname,`./${basePath}/metrics2.json`)
var fs = require("fs");

async function puppeteer2() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [ 
            '--disable-dev-shm-usage',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
            '--use-file-for-fake-video-capture=' + config.data.video,
            '--unlimited-storage', 
            '--full-memory-crash-report',
            '--window-size=1024,785'
        ]
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1024,
        height: 785
    })
    try{
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer2&isModerator=false&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);

        // Enabling webcam
        await page.waitFor(9000);
        await page.waitForSelector('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy btn--29prju"]');
        await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy btn--29prju"]');
        await page.waitFor(9000);
        await page.waitFor('video[id="preview"]');
        await page.waitFor(9000);
        await page.waitFor('[aria-label="Start sharing"]');
        await page.click('[aria-label="Start sharing"]');
        await page.waitFor(9000);

        // Disabling Webcam
        await page.waitForSelector('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy"]');
        await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy"]')

        const metric = await page.metrics();
        const performance = await page.evaluate(() => performance.toJSON())

        metrics['metricObj'] = metric;
        metrics['performanceObj'] = performance;
        
        fs.appendFileSync(metricsJSON, JSON.stringify(metrics, null, 4), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer2 log file has been created !");
        });
        process.exit(0);
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
}
puppeteer2();