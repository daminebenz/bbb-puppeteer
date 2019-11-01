const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}
const conf = require('./conf')

const config = conf.config
var metricsJSON = path.join(__dirname,`./${basePath}/metrics1.json`)
var fs = require("fs");

async function puppeteer1() {
    const browser = await puppeteer.launch({
        headless: false,
        args: [ 
            '--disable-dev-shm-usage',
            '--use-fake-ui-for-media-stream',
            // '--use-fake-device-for-media-stream',
            // '--use-file-for-fake-audio-capture=' + config.data.audio,
            // '--use-file-for-fake-video-capture=' + config.data.video,
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
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer1&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
        await page.waitFor(3000);
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);

        // Enabling webcam
        await page.waitFor(9000);
        await page.waitForSelector('[aria-label="Share webcam"]');
        await page.click('[aria-label="Share webcam"]');
        await page.waitFor(9000);
        await page.waitFor('video[id="preview"]');
        await page.waitFor(9000);
        await page.waitFor('[aria-label="Start sharing"]');
        await page.click('[aria-label="Start sharing"]');
        await page.waitFor(9000);

        // Enabling full screen Webcam
        await page.evaluate(()=> document.querySelectorAll('[data-test="presentationFullscreenButton"]')[1].click());
        await page.waitFor(9000);

        // Leaving Webcam Full Screen
        await page.waitFor(9000);
        await page.evaluate(()=> document.querySelectorAll('[data-test="presentationFullscreenButton"]')[1].click());

        const metric = await page.metrics();
        const performance = await page.evaluate(() => performance.toJSON())

        metrics['metricObj'] = metric;
        metrics['performanceObj'] = performance;
        
        fs.appendFileSync(metricsJSON, JSON.stringify(metrics, null, 4), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer1 log file has been created !");
        });
        process.exit(0);
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
    browser.close()
}
puppeteer1();