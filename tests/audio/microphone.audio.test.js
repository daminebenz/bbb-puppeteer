// File name: Microphone Connection
// Test Description:
//      1) Connecting using Microphone
//      2) Echo test
//      3) Muting Microphone
//      4) Unmuting Microphone
//      5) Leaving Audio
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

            // Connecting using Microphone
            await page.waitFor('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.click('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.screenshot({path: 'images/3-microphone-connection.png'});

            // Echo test
            await page.waitFor('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
            await page.click('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
            await page.screenshot({path: 'images/2-echo-test-thumb-up.png'});
            await page.waitFor(9000);

            // Muting Microphone
            await page.waitFor('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
            await page.click('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
            await page.waitFor(9000);
            await page.screenshot({path: 'images/Microphone-muted.png'});

            // Unmuting Microphone
            await page.waitFor('button[aria-label="Unmute"]');
            await page.click('button[aria-label="Unmute"]');
            await page.waitFor(9000);
            await page.screenshot({path: 'images/Microphone-unmuted.png'});                

            // Leaving Audio
            await page.waitFor('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
            await page.click('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
            await page.waitFor(9000);
            await page.screenshot({path:'images/Leaving-audio.png'});
            process.exit[0]
        }
        catch (error) {
            console.log({error});
            process.exit[1]
        }
        browser.close();
    })})
module.exports= testingAudio;