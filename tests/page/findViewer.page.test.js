// File name: Finding a Viewer (without Locks)
// Test Description:
//      1) Connecting to a Meeting and fetching a User in the Users list
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]
const multiViewers = require('./multiViewers.bots.test');

let findViewer = {}
findViewer.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=findViewer&isModerator=false&action=create`);
        multiViewers;
        await page.waitFor(3000);
        try { 
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        
            await page.evaluate(()=>document.querySelector('[aria-label^="Bot-1"]'))
            process.exit[0];
        }
        catch (error) {
            console.log({error})
            process.exit[1];
        }
        browser.close();
    });

})
module.exports = findViewer;