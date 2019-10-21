const puppeteer = require('puppeteer');
const URL = process.argv[2]

let testingAudio = {}
testingAudio.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=ListenOnlyTest&isModerator=false&action=create`);

            // Joining audio
            await page.waitForSelector('i[class="icon--2q1XXw icon-bbb-listen"]');
            await page.click('i[class="icon--2q1XXw icon-bbb-listen"]');
            await page.waitFor(9000);

            // Leaving Audio
            await page.waitForSelector('i[class="icon--2q1XXw icon-bbb-listen"]');
            await page.click('i[class="icon--2q1XXw icon-bbb-listen"]');
            await page.waitFor(9000);
            process.exit[0]
        }
        catch (error) {
            console.log({error});
            process.exit[1]
        }
        browser.close();
    })})
module.exports= testingAudio;