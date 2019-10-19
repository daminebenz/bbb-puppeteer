// File name: Multi Bots (Viewers)
// Test Description:
//      1) Connecting with Multi Bots
//
//  => NOTE: This file is used in 2 tests. ("Promoting a Viewer to Presenter" and "Finding a Viewer is Users list")
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]

let multiViewers = {}
multiViewers.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
    promises = [];
    for(let i = 1; i < 6; i++){
        await promises.push(browser.newPage().then(async page => {
            try{
                await page.goto(`${URL}/demo/demoHTML5.jsp?username=Bot-${i}&action=create&isModerator=false`);
                await page.waitFor('[aria-describedby^="modalDismissDescription"]');
                await page.click('[aria-describedby^="modalDismissDescription"]');
                await page.waitFor(30000);
                process.exit[0];
            }
            catch(error){
                console.log({error})
                process.exit[1];
            }
        }))
    }
    browser.close();
    await Promise.all(promises);
});
module.exports = multiViewers;