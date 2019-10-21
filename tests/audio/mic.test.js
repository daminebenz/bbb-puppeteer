const puppeteer = require('puppeteer');
const URL = process.argv[2]

let testingMic = {}
testingMic.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Puppeteer1&isModerator=false&action=create`);

            // Connecting using Microphone
            await page.waitForSelector('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.click('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');

            // Echo test
            await page.waitFor('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
            await page.click('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
            await page.waitFor(9000);

            // Muting Microphone
            await page.waitFor('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
            await page.click('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
            await page.waitFor(9000);

            // Unmuting Microphone
            await page.waitFor('button[aria-label="Unmute"]');
            await page.click('button[aria-label="Unmute"]');
            await page.waitFor(9000);

            // Leaving Audio
            await page.waitFor('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
            await page.click('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
            await page.waitFor(9000);
            process.exit[0]
        }
        catch (error) {
            console.log({error});
            process.exit[1]
        }
        browser.close();
    })})
module.exports= testingMic;