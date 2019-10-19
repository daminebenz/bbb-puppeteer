// File name: Listen Only Audio
// Test Description:
//      1) Joining audio
//      2) Connecting with Listen Only Mode
//

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
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=aaaa&isModerator=true&action=create`);

            // Joining audio
            await page.waitFor('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
            await page.click('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
            await page.waitFor(9000);
            await page.screenshot({path: 'images/joining-audio-again.png'});

            // Connecting with Listen Only Mode
            await page.waitFor('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.click('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.waitFor(9000);
            await page.screenshot({path: 'images/Listen-only-mode.png'});    
            await page.waitFor(3000);
            process.exit[0]
        }
        catch (error) {
            console.log({error});
            process.exit[1]
        }
        browser.close();
    })})
module.exports= testingAudio;