const puppeteer = require('puppeteer');
const URL = process.argv[2]

let bots = {}
bots.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
    (async ()=> {
        browser.newPage().then(async page=>{
            for (i=1;i<3;i++){
                await page.goto(`${URL}/demo/demoHTML5.jsp?username=Bot${i}&isModerator=true&action=create`);
            }
            await page.waitFor(30000);
            browser.close();
        });    
    })
})
module.exports = bots;