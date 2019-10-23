const puppeteer = require('puppeteer');
const URL = process.argv[2]
const metricsLocation = process.argv[3]
var path = require('path');   
const metrics = []

const metricsJSON = path.join(__dirname,`../${metricsLocation}/metrics2.json`)
var fs = require("fs");

async function puppeteer2() {
    const browser = await puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600',
                '--unlimited-storage', 
                '--full-memory-crash-report'
        ]
    });
    const page = await browser.newPage();
    await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer2&isModerator=true&action=create`);
    try { 
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(10000);

        await page.evaluate(()=>document.querySelector('[aria-label^="Puppeteer1"]'));
        const perf = await page.metrics();

        const performances ={
            'name': 'Puppeteer2 Performance',
            'data': await page.evaluate(() => performance.toJSON())
        } 

        const metric = {
            'name': 'Puppeteer2 Metrics',
            'data': perf
        };

        metrics.push(metric, performances)

        fs.appendFileSync(metricsJSON, JSON.stringify(metrics, null, 4), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer2 log file has been created !");
        });

        process.exit(0);
    }
    catch (error) {
        console.log({error})
        process.exit(1)
    }
    browser.close()
}
puppeteer2()