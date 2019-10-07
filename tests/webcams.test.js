const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red'
});

let webcams = {}
webcams.init = puppeteer.launch({
        headless: true,
        args: [ '--use-fake-ui-for-media-stream' ]
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=WebcamEnabled&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            try{
                // Enabling webcams
                await page.waitFor('button[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy btn--29prju"]');
                await page.click('button[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy btn--29prju"]');
                await page.waitFor(4000);
                await page.waitFor('video[id="preview"][class="preview--25JmPP"]');
                await page.waitFor('span[class="label--Z12LMR3"]');
                await page.click('span[class="label--Z12LMR3"]');
                await page.waitFor(3000);
                passed += 1;
                console.log(colors.info('Enabling Webcams => Passed '+ passed +' of 4 !'));
            }
            catch (error){
                failed+=1;
                console.log(colors.error('Error while enabling Webcams !',{error}));
            }
            
            try {
                // Enabling full screen Webcams
                await page.waitFor('[data-test="presentationFullscreenButton"]')[0];
                await page.click('[data-test="presentationFullscreenButton"]')[0];
                passed++;
                console.log(colors.info('Enabling full screen Webcams => Passed '+passed+' of 4 !'));
            } catch (error) {
                failed++;
                console.log(colors.error('Error while full screen Webcams !', {error}));
            }

            try {
                // Leaving Webcam Full Screen
                await page.waitFor(5000);
                await page.keyboard.press('Escape', {
                    delay: 100
                });
                passed++;
                console.log(colors.info('Leaving Webcam Full Screen => Passed '+passed+' of 4 !'));
            } catch (error){
                failed++;
                console.log(colors.error('Error while leaving full screen !', {error}));
            }
            
            try {
                // Disabling Webcam
                await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy"]');
                await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy"]');
                passed++;
                console.log(colors.info('Disabling Webcam => Passed '+passed+' of 4'))
            } catch (error) {
                failed++;
                console.log(colors.error('Error while disabling Webcam !', {error}))
            }
        }
        catch (error) {
            console.log({error}, 'There was an error at Webcams !');
        }

        console.log(colors.error(failed+' failed Tests of 4 !'));
        console.log(colors.info(passed+' passed Tests of 4 !'));
        browser.close();
    });
});
module.exports = webcams;
