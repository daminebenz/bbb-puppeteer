const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let lock = {}
lock.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ],
        executablePath: '/usr/bin/google-chrome'
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=LocksTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        
            try {
                // Enabling Share webcam Lock
                await page.evaluate(()=>document.querySelectorAll('[class="icon--2q1XXw icon-bbb-settings"]')[0].click());
                await page.waitFor(3000);
                await page.evaluate(()=>document.querySelectorAll('div[class="scrollable--4fyj"] > ul[class="verticalList--Ghtxj"] > li')[13].click());
                await page.waitFor(3000);

                // checking Shared Webcam Lock
                await page.evaluate(
                    ()=>document.querySelectorAll('[class="react-toggle-track invertBackground--xefHH"]')[0]
                    .click()
                );
                await page.waitFor(5000);
                if($('[aria-label^="lockedViewer1"]').length > 0) {
                    // doing something (WIP)
                }

                // unchecking Shared Webcam Lock
                await page.evaluate(
                    ()=>document.querySelectorAll('[class="react-toggle-track invertBackground--xefHH checked--Z1943og"]')[0]
                    .click()
                );

                await page.waitFor(3000);
                passed++;
                console.log(colors.info('Enabling Share webcam Lock => Passed '+passed+' of 2 !'));
            }
            catch (error){
                failed++;
                console.log(colors.error({error},'Error while enabling share webcam !'));
            }
        }
        catch (error) {
            console.log(colors.warn({error},'There was an error at the Locks test !'));
        }

        console.log(colors.error(failed+' failed Tests of 9 !'));
        console.log(colors.info(passed+' passed Tests of 9 !'));
        browser.close();
    });
});
module.exports = lock;
