const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path'); 
const TIMELIMIT_SECONDS = parseInt(process.argv[4])
const TIMELIMIT_MILLISECONDS = TIMELIMIT_SECONDS * 1000;
const metric = {}
const fpsObj = {}
const moment = require('moment');

var metricsJSON = path.join(__dirname,`./${basePath}/metrics.json`)
var fpsJSON = path.join(__dirname,`./${basePath}/metricsFPS.json`)
var fs = require("fs");

async function puppeteer1() {
    /* -- Enable if you want to connect Probe from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: false,
	    args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Probe&isModerator=false&action=create`);
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        for (var i = TIMELIMIT_MILLISECONDS; i >= 0; i--) {
            await page.evaluate(async () => {
                return new Promise((resolve) => {
                    window.requestAnimationFrame(resolve);                
                    var fps = 60;
                    var now;
                    var then = Date.now();
                    var interval = 1000/fps;
                    var delta;
                    var counter = 0;
                    var first = then;
                    function draw() {
                        requestAnimationFrame(draw);
                        now = Date.now();
                        delta = now - then;
                        if (delta > interval) {
                            then = now - (delta % interval);
                            var time_el = (then - first)/1000;
                            let fpsVal = ++counter + 'f / ' + parseInt(time_el) + 's = ' + parseInt(counter/time_el) + 'fps'
                            console.log(fpsVal);
                        }
                    }
                    draw();
                })
            })
            const date = new Date()
            const metrics = await page.metrics();
            const performance = await page.evaluate(() => performance.toJSON())

            metric['dateObj'] = moment(date).format('DD/MM/YYYY hh:mm:ss');
            metric['metricsObj'] = metrics;
            metric['performancesObj'] = performance;

            fs.appendFileSync(metricsJSON, JSON.stringify(metric)+'\n', (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            });
            await page.waitFor(60000)
            process.exit(0)
        }  
    } 
    catch(error){
        console.log({error})
        process.exit(1);
    }
}
puppeteer1();
