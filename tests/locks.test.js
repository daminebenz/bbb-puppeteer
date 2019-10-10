const puppeteer = require('puppeteer');
const lockedViewer1 = require('./lockedViewer1.test')
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
        page.setDefaultTimeout(1200000);
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=LocksTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await lockedViewer1;
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        
            try {
                // Opening Locks Menu
                await page.evaluate(()=>document.querySelectorAll('[class="icon--2q1XXw icon-bbb-settings"]')[0].click());
                await page.waitFor(3000);
                await page.evaluate(()=> document.querySelector('i[class~="icon-bbb-lock"]').parentNode.click())
                await page.waitFor(3000);

                // Enabling Edit Shared Notes Lock
                await page.waitForSelector('[class="react-toggle-track invertBackground--xefHH"]', {timeout: 0});
                await page.click('[class="react-toggle-track invertBackground--xefHH"]');
                
                await page.waitFor(3000);
                
                // Applying
                await page.evaluate(
                    ()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO"]')[0]
                    .click()
                    );
                        
                // Looking and Checking if lockedViewer1 is locked or not
                if(page.evaluate(()=> document.querySelectorAll('[aria-label^="lockedViewer1"]')[0].length > 0)) {
                    // doing something (WIP)
                    if(page.evaluate(()=>document.querySelector('[class="icon-bbb-lock"]'))) {
                        console.log(colors.warn('lockedViewer1 is Locked !'))
                    } else{
                        console.log(colors.warn('lockedViewer1 isn\'t Locked !'))
                    }
                }

                // Unlocking lockedViewer1
                await page.evaluate(() => document.querySelectorAll('[aria-label^="lockedViewer1"]')[0].click());
                await page.waitFor(5000);

                // Unlocking lockedViewer1 if he's Locked                    
                let expectedLockButton = 'Unlock lockedViewer1';
                const unlockButton = page.evaluate(()=>document.getElementsByClassName('span.itemLabel--Z12glHA').innerText);

                if(expectedLockButton=unlockButton){
                    page.evaluate(()=> document.querySelectorAll('[class="item--yl1AH"]')[28].click());
                } else if (unlockButton=null) {
                    console.log('lockedViewer1 doesn\'t have any Locks activated !')
                }

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
    });
});
module.exports = lock;
