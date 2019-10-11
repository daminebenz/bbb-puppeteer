const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let lockedViewer1 = {}
lockedViewer1.init = puppeteer.launch({
        headless: true,
        args: [ '--use-fake-ui-for-media-stream' ],
        executablePath: '/usr/bin/google-chrome'
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=lockedViewer1&isModerator=false&action=create`);
            
            await page.waitFor(3000);
            await page.evaluate(()=>document.querySelector('[aria-describedby^="modalDismissDescription"]').click())
            await page.waitFor(3000);
        
            try {

                passed++;
                console.log(colors.info('Logging in with a Viewer => Passed '+passed+' of 1 !'));
            }
            catch (error){
                failed++;
                console.log(colors.error({error},'Error while logging in with a ViewerLocked1 !'));
            }
        }
        catch (error) {
            console.log(colors.warn({error},'There was an error at the Locks test !'));
        }

        console.log(colors.error(failed+' failed Tests of 1 !'));
        console.log(colors.info(passed+' passed Tests of 1 !'));
    });
});
module.exports = lockedViewer1;
