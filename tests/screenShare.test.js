const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let screenShare = {}
screenShare.init = puppeteer.launch({
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
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=screenShareTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await page.click('[aria-label="Close Join audio modal"]');
            try {
                // Starting Screen Sharing
                await page.waitForSelector('[aria-label="Share your screen"]');
                await page.click('[aria-label="Share your screen"]');
                page.on('dialog', async dialog => {
                    await dialog.accept();
                });
                await page.waitFor(10000);
                passed++;
                console.log(colors.info('Starting Screen Sharing => Passed '+passed+' of 4 !'));
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while starting Screen Sharing !'));
            }

            try {
                // Make Screen Share Full Screen
                await page.waitForSelector('[aria-label="Make Screen share fullscreen"]');
                await page.click('[aria-label="Make Screen share fullscreen"]');
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Make Screen Share in Full Screen => Passed '+passed+' of 4 !'));
            } catch (error){
                failed++;
                console.log(colors.error({error},'There was an error while Making the Screen Share in Full Screen !'));
            }

            try {
                // Leave Screen Share Full Screen
                await page.keyboard.press('Escape');
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Leave Screen Share Full Screen => Passed '+passed+' of 4 !'));
            } catch (error){
                failed++;
                console.log(colors.error({error},'There was an error while leaving the Screen Share Full Screen !'));
            }

            try {
                // Stopping Screen Sharing
                await page.waitForSelector('[aria-label="Stop sharing your screen"]');
                await page.click('[aria-label="Stop sharing your screen"]');
                page.on('dialog', async dialog => {
                    await dialog.accept();
                });
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Stopping Screen Sharing => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while stopping Screen Sharing !'))
            }
        } catch (error) {
            console.log(colors.warn({error},'There was an error at Screen Sharing Test !'));
        }

        console.log(colors.error(failed+' failed Tests of 4 !'));
        console.log(colors.info(passed+' passed Tests of 4 !'));
        browser.close();
    });
});
module.exports = screenShare;
