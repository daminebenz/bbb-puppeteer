const puppeteer = require('puppeteer');
const URL = process.argv[2]
const metricsLocation = process.argv[3]
var path = require('path');   

const metricsJSON = path.join(__dirname,`../${metricsLocation}/metrics.json`)
var fs = require("fs");

async function puppeteer1() {
    const browser = await puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600',
                '--unlimited-storage', 
                '--full-memory-crash-report'
        ]
    });
    const page = await browser.newPage();
    try{
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer1&action=create&isModerator=true`);
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(30000);
        await page.evaluate(()=>document.querySelector('[aria-label^="Puppeteer2"]'));
        const perf = await page.metrics();

        const performances = await page.evaluate(() => performance.toJSON())

        const metric = perf;

        const data = {
            'Puppeteer1 Metric': metric,
            'Puppeteer1 Performance': performances
        }

        fs.writeFile(metricsJSON, JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer1 log file has been created !");
        });
        process.exit[0];
    }
    catch(error){
        console.log({error})
        process.exit[1];
    }
    browser.close()
}

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
        await page.waitFor(30000);

        await page.evaluate(()=>document.querySelector('[aria-label^="Puppeteer1"]'));
        const perf = await page.metrics();

        const performances = await page.evaluate(() => performance.toJSON())

        const metric = perf;

        const data = {
            'Puppeteer2 Metric': metric,
            'Puppeteer2 Performance': performances
        }

        fs.writeFile(metricsJSON, JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer2 log file has been created !");
        });

        process.exit[0];
    }
    catch (error) {
        console.log({error})
        process.exit[1];
    }
    browser.close()
}

puppeteer1();
puppeteer2();