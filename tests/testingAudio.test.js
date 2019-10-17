const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let testingAudio = {}
testingAudio.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        try {
            try {
                await page.goto(`${URL}/demo/demoHTML5.jsp?username=aaaa&isModerator=true&action=create`);
                // Connecting using Microphone
                await page.waitFor('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.click('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.screenshot({path: 'images/3-microphone-connection.png'});
                passed += 1;
                console.log(colors.info('    Connecting using Microphone  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while connecting using Microphone !    '));
            }

            try {
                // Echo test
                await page.waitFor('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
                await page.click('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
                await page.screenshot({path: 'images/2-echo-test-thumb-up.png'});
                await page.waitFor(9000);
                passed += 1;
                console.log(colors.info('    Echo test  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while echo test !    '));
            }

            try {
                // Muting Microphone
                await page.waitFor('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
                await page.click('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/Microphone-muted.png'});
                passed += 1;
                console.log(colors.info('    Muting Microphone  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while muting Microphone !    '));
            }

            try {
                // Unmuting Microphone
                await page.waitFor('button[aria-label="Unmute"]');
                await page.click('button[aria-label="Unmute"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/Microphone-unmuted.png'});                
                passed += 1;
                console.log(colors.info('    Unmuting Microphone  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while unmuting Microphone !    '));
            }

            try {
                // Leaving Audio
                await page.waitFor('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
                await page.click('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
                await page.waitFor(9000);
                await page.screenshot({path:'images/Leaving-audio.png'});
                passed += 1;
                console.log(colors.info('    Leaving Audio  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while leaving Audio !    '));
            }

            try {
                // Rejoining audio
                await page.waitFor('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
                await page.click('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/joining-audio-again.png'});
                passed += 1;
                console.log(colors.info('    Rejoining audio  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while rejoining audio !    '));
            }

            try {
                // Connecting with Listen Only Mode
                await page.waitFor('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.click('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/Listen-only-mode.png'});    
                passed += 1;
                console.log(colors.info('    Connecting with Listen Only Mode  => Passed '+ passed +' of 7 !    '));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error({error},'    Error while connecting with Listen Only Mode !    '));
            }
            await page.waitFor(3000);
        }
        catch (error) {
            console.log({error}, '    There was an error !    ');
        }
        console.log(colors.error('   '+failed+' failed Tests of 7 !    '));
        console.log(colors.info('   '+passed+' passed Tests of 7 !    '));    
        browser.close();
    })})
module.exports= testingAudio;