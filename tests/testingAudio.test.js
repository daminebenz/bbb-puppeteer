const puppeteer = require('puppeteer');

let testingAudio = {}
testingAudio.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
    }).then(async browser => {
        browser.newPage().then(async page => {
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=aaaa&isModerator=true&action=create`);
            // connecting using Microphone
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

            // Leave Audio
            await page.waitFor('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
            await page.click('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
            await page.waitFor(9000);
            await page.screenshot({path:'images/Leaving-audio.png'});

            // join audio again
            await page.waitFor('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
            await page.click('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
            await page.waitFor(9000);
            await page.screenshot({path: 'images/joining-audio-again.png'});

            // connecting with Listen Only Mode
            await page.waitFor('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.click('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
            await page.waitFor(9000);
            await page.screenshot({path: 'images/Listen-only-mode.png'});    

            await page.waitFor(3000);
            // 
            browser.close();
        }
        catch (error) {
            console.log({error}, 'there was an error !');
        }
    })})
module.exports= testingAudio;