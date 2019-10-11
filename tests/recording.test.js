const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let recording = {}
recording.init = puppeteer.launch({
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
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=RecordSessionTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await page.evaluate(()=>document.querySelector('[aria-describedby^="modalDismissDescription"]').click());
            await page.waitFor(3000);

            try {
                // Start recording the Meeting
                await page.waitFor('[class="recordingControlOFF--26cqft"][role="button"]');
                await page.click('[class="recordingControlOFF--26cqft"][role="button"]');
                await page.waitFor(5000);
                await page.waitFor('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO button--Z28qGla"]');
                await page.click('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO button--Z28qGla"]');
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Start recording the Meeting => Passed '+passed+' of 2 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while starting recording the Meeting !'))
            }

            try{
                // Pause recording the Meeting
                await page.waitFor('[class="recordingControlON--ZTT4Mq"][role="button"]');
                await page.click('[class="recordingControlON--ZTT4Mq"][role="button"]');
                await page.waitFor(5000);
                await page.waitFor('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO button--Z28qGla"]');
                await page.click('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO button--Z28qGla"]');
                passed++;
                console.log(colors.info('Pause recording the Meeting => Passed '+passed+' of 2 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while pausing recording the Meeting !'))
            }

        } catch (error) {
            console.log(colors.warn({error},'There was an error at the Locks test !'));
        }

        console.log(colors.error(failed+' failed Tests of 2 !'));
        console.log(colors.info(passed+' passed Tests of 2 !'));
        page.close();
    });
});
module.exports = recording;
