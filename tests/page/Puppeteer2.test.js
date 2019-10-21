const puppeteer = require('puppeteer');
const URL = process.argv[2]

let Puppeteer2 = {}
Puppeteer2.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer2&isModerator=true&action=create`);
        try { 
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
        
            await page.evaluate(()=>document.querySelector('[aria-label^="Puppeteer1"]'));
            await page.waitFor(30000);
            process.exit[0];
        }
        catch (error) {
            console.log({error})
            process.exit[1];
        }
        browser.close()
    });

})
module.exports = Puppeteer2;