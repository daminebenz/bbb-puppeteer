const puppeteer = require('puppeteer');
const URL = process.argv[2]

let multiViewers = {}
multiViewers.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    promises = [];
    for(let i = 1; i < 3; i++){
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