const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red'
});

let testingAudio = {}
testingAudio.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        try {
            try {
                await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=aaaa&isModerator=true&action=create`);
                // Connecting using Microphone
                await page.waitFor('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.click('[class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.screenshot({path: 'images/3-microphone-connection.png'});
                passed += 1;
                console.log(colors.info('Connecting using Microphone  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while connecting using Microphone !',{error}));
            }

            try {
                // Echo test
                await page.waitFor('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
                await page.click('[aria-label="Echo is audible"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow button--1JElwW"]');
                await page.screenshot({path: 'images/2-echo-test-thumb-up.png'});
                await page.waitFor(9000);
                passed += 1;
                console.log(colors.info('Echo test  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while echo test !',{error}));
            }

            try {
                // Muting Microphone
                await page.waitFor('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
                await page.click('button[aria-label="Mute"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi glow--Z1CgAvh"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/Microphone-muted.png'});
                passed += 1;
                console.log(colors.info('Muting Microphone  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while muting Microphone !',{error}));
            }

            try {
                // Unmuting Microphone
                await page.waitFor('button[aria-label="Unmute"]');
                await page.click('button[aria-label="Unmute"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/Microphone-unmuted.png'});                
                passed += 1;
                console.log(colors.info('Unmuting Microphone  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while unmuting Microphone !',{error}));
            }

            try {
                // Leaving Audio
                await page.waitFor('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
                await page.click('button[aria-label="Leave audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi"]');
                await page.waitFor(9000);
                await page.screenshot({path:'images/Leaving-audio.png'});
                passed += 1;
                console.log(colors.info('Leaving Audio  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while leaving Audio !',{error}));
            }

            try {
                // Rejoining audio
                await page.waitFor('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
                await page.click('button[aria-label="Join audio"][class="lg--Q7ufB buttonWrapper--x8uow button--295UAi btn--Z12eHso"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/joining-audio-again.png'});
                passed += 1;
                console.log(colors.info('Rejoining audio  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while rejoining audio !',{error}));
            }

            try {
                // Connecting with Listen Only Mode
                await page.waitFor('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.click('button[aria-label="Listen only"][class="jumbo--Z12Rgj4 buttonWrapper--x8uow audioBtn--1H6rCK"]');
                await page.waitFor(9000);
                await page.screenshot({path: 'images/Listen-only-mode.png'});    
                passed += 1;
                console.log(colors.info('Connecting with Listen Only Mode  => Passed '+ passed +' of 7 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while connecting with Listen Only Mode !',{error}));
            }
            await page.waitFor(3000);
            // Test Results =>
            console.log(colors.error(failed+' failed Tests of 7 !'));
            console.log(colors.info(passed+' passed Tests of 7 !'));    
            browser.close();
        }
        catch (error) {
            console.log({error}, 'There was an error !');
        }
    })})
module.exports= testingAudio;