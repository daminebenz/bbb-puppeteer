const puppeteer = require('puppeteer');
const URL = process.argv[2]
const metricsLocation = process.argv[3]
var path = require('path');   
const metrics = []
const metricsTable = [metrics]

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
    await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer1&action=create&isModerator=true`);
    try{
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);

        await page.evaluate(()=>document.querySelector('[aria-label^="Puppeteer2"]'));
        const perf = await page.metrics();

        const performances ={
            'name': 'Puppeteer1 Performance',
            'data': await page.evaluate(() => performance.toJSON())
        } 

        const metric = {
            'name': 'Puppeteer1 Metrics',
            'data': perf
        };

        metrics.push(metric, performances)
        metricsTable.push(metrics)

        fs.writeFileSync(metricsJSON, JSON.stringify(metricsTable, null, 4), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("puppeteer1 log file has been created !");
        });

        fs.readFile(metricsJSON, (err, data) => {
            if (err) {
                return console.error(err);
            };
        
            var data = JSON.parse(data.toString());
            data.age = "23"; // MODIFY
            fs.appendFile(metricsJSON, JSON.stringify(data, null, 4), 'utf-8', (err, result) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log(result);
                    console.log("Success");
                }
        
            });
        });

        process.exit(0);
    }
    catch(error){
        console.log({error})
        process.exit(1);
    }
    browser.close()
}
puppeteer1()