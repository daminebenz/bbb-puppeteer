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
                passed++;
                console.log(colors.info('Opening Locks Menu => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'Error while opening Locks Menu !'))
            }

            try {
                // Enabling first unlocked Lock option
                await page.waitForSelector('[class="react-toggle-track invertBackground--xefHH"]', {timeout: 0});
                await page.click('[class="react-toggle-track invertBackground--xefHH"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('Enabling first unlocked Lock option => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'Error while enabling first unlocked Lock option !'))
            }

            try {
                // Applying selected Lock options
                await page.evaluate(
                    ()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO"]')[0]
                    .click()
                );
                passed++;
                console.log(colors.info('Applying selected Lock options => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'Error while applying selected Lock options !'))
            }

            try {
                // Unlocking lockedViewer1
                await page.evaluate(() => document.querySelectorAll('[aria-label^="lockedViewer1"]')[0].click());
                await page.waitFor(5000);

                const element = page.waitForSelector('span[class="userNameSub--1RuGj6"] > span');
                var length = element.length;

                if(length > 0 ){
                    // Unlock him if he's Locked
                    await page.evaluate(()=>document.querySelector('i[class="itemIcon--Z207zn1 icon-bbb-unlock"]').click());
                } else if (length = null ) {
                    // Lock him if he's Unlocked
                    await page.evaluate(()=>document.querySelector('i[class="itemIcon--Z207zn1 icon-bbb-lock"]').click());
                }
                passed++;
                console.log(colors.info('Unlocking lockedViewer1 => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'Error while unlocking lockedViewer1 !'))
            }
        }
        catch (error) {
            console.log(colors.warn({error},'There was an error at the Locks test !'));
        }

        console.log(colors.error(failed+' failed Tests of 4 !'));
        console.log(colors.info(passed+' passed Tests of 4 !'));
        page.close();
    });
});
module.exports = lock;
