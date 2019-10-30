const puppeteer = require('puppeteer-core');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}

var metricsJSON = path.join(__dirname,`./${basePath}/metrics2.json`)
var fs = require("fs");

async function puppeteer2() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome',
        args: [ '--use-fake-ui-for-media-stream',
                '--unlimited-storage', 
                '--full-memory-crash-report',
                '--window-size=800,600'
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

        // Drawing in Violet color
        await page.waitFor('[aria-label="Colors"]');
        await page.click('[aria-label="Colors"]');
        await page.waitFor(3000);
        await page.waitFor('rect[fill="#8800ff"]');
        await page.click('rect[fill="#8800ff"]');
        await page.waitFor(3000);

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

        function download(uri, filename, callback) {
            request.head(uri, function() {
              request(uri)
              .pipe(fs.createWriteStream(filename))
              .on("close", callback);
           });
        }
        
        let scrape = async () => {
            const svgFile = await page.evaluate(() =>
                document.querySelectorAll('svg')[1].innerHTML
            );

            download(svgFile, path.join(__dirname,`./${basePath}/shapes02.svg`), function() {
                console.log("Image downloaded");
            })
        }
        scrape()

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