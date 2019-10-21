const puppeteer = require('puppeteer');
const URL = process.argv[2]

let Puppeteer1 = {}
Puppeteer1.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
    browser.newPage().then(async page => {
        try{
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer1&action=create&isModerator=true`);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');

            await page.waitFor(30000);
            await page.evaluate(()=>document.querySelector('[aria-label^="Puppeteer2"]'));
            process.exit[0];
        }
        catch(error){
            console.log({error})
            process.exit[1];
        }
        browser.close()
    })
    
});
module.exports = Puppeteer1;