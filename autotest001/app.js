const puppeteer = require('puppeteer');
const URL = process.argv[2]
const metricsFile = process.argv[3]
var obj = {
    table: []
 };

var fs = require('fs');

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

        console.log('\n==== performance.toJSON() ====\n');
        console.log(
          await page.evaluate(() => JSON.stringify(performance.toJSON(), null, '  '))
        );
      
        console.log('\n==== page.metrics() ====\n');
        const perf = await page.metrics();
        console.log(JSON.stringify(perf, null, '  '));
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
      
        console.log('\n==== performance.toJSON() ====\n');
        console.log(
          await page.evaluate(() => JSON.stringify(performance.toJSON(), null, '  '))
        );
      
        console.log('\n==== page.metrics() ====\n');
        const perf = await page.metrics();
        console.log(JSON.stringify(perf, null, '  '));
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