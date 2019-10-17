const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let webcams = {}
webcams.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=WebcamEnabled&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            try{
                // Enabling webcams
                await page.waitFor(9000);
                await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy btn--29prju"]');
                await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy btn--29prju"]');
                await page.waitFor(9000);
                await page.waitFor('video[id="preview"][class="preview--25JmPP"]');
                await page.waitFor(9000);
                await page.waitFor('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO"]');
                await page.click('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO"]');
                await page.waitFor(9000);
                passed += 1;
                console.log(colors.info('    Enabling Webcams => Passed '+ passed +' of 4 !    '));
            }
            catch (error){
                failed+=1;
                console.log(colors.error({error},'    Error while enabling Webcams !    '));
            }
            
            try {
                // Enabling full screen Webcams
                await page.evaluate(()=> document.querySelectorAll('[data-test="presentationFullscreenButton"]')[1].click());
                await page.waitFor(9000);
                passed++;
                console.log(colors.info('    Enabling full screen Webcams => Passed '+passed+' of 4 !    '));
            } catch (error) {
                failed++;
                console.log(colors.error({error},'    Error while full screen Webcams !    '));
            }

            try {
                // Leaving Webcam Full Screen
                await page.waitFor(9000);
                await page.evaluate(()=> document.querySelectorAll('[data-test="presentationFullscreenButton"]')[1].click());
                passed++;
                console.log(colors.info('    Leaving Webcam Full Screen => Passed '+passed+' of 4 !    '));
            } catch (error){
                failed++;
                console.log(colors.error({error},'    Error while leaving full screen !    '));
            }
            
            try {
                // Disabling Webcam
                await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy"]');
                await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--qv0Xy"]')
                passed++;
                console.log(colors.info('Disabling Webcam => Passed '+passed+' of 4 !    '))
            } catch (error) {
                failed++;
                console.log(colors.error({error},'    Error while disabling Webcam !    '))
            }
        }
        catch (error) {
            console.log(colors.warn({error},'    There was an error at Webcams !    '));
        }

        console.log(colors.error('   '+failed+' failed Tests of 4 !    '));
        console.log(colors.info('   '+passed+' passed Tests of 4 !    '));
        browser.close();
    });
});
module.exports = webcams;
