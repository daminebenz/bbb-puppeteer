const puppeteer = require('puppeteer-core');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}

var metricsJSON = path.join(__dirname,`./${basePath}/metrics1.json`)
var fs = require("fs");

async function puppeteer1() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome',
        args: [ '--use-fake-ui-for-media-stream',
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

        await page.waitFor('[class="icon--2q1XXw icon-bbb-whiteboard"]');
        await page.click('[class="icon--2q1XXw icon-bbb-whiteboard"]')        
        await page.waitFor(3000)

        await page.waitFor('[aria-label="Tools"]');
        await page.click('[aria-label="Tools"]');
        await page.waitFor('[aria-label="Pencil"]');        
        await page.click('[aria-label="Pencil"]');

        const whiteboard = await page.$('div[role=presentation]');                
        await page.waitFor(3000);
        const bounds = await page.evaluate((whiteboard) => {
            const { top, left, bottom, right } = whiteboard.getBoundingClientRect();
            return { top, left, bottom, right };
            }, whiteboard);
        const drawingOffset = 15;
        const steps = 5;

        for (i = 0; i <= 15; i++) {
            await page.mouse.move(bounds.left + (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
            await page.mouse.down();
            await page.mouse.move(bounds.left + (i * drawingOffset), bounds.bottom - (i * drawingOffset)), { steps };
            await page.mouse.move(bounds.right - (i * drawingOffset), bounds.bottom - (i * drawingOffset), { steps });
            await page.mouse.move(bounds.right - (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
            await page.mouse.move(bounds.left + (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
            await page.mouse.up();        
        }

        await page.waitFor(20000)

        // Disabling Multi-User Whiteboard
        await page.waitFor('[class="icon--2q1XXw icon-bbb-multi_whiteboard"]');
        await page.click('[class="icon--2q1XXw icon-bbb-multi_whiteboard"]');
        
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