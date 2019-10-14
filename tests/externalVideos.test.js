const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let externalVideos = {}
externalVideos.init = puppeteer.launch({
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
            await page.goto(`https://dev22a.bigbluebutton.org/demo/demoHTML5.jsp?username=externalVideosTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await page.evaluate(()=>document.querySelector('[aria-describedby^="modalDismissDescription"]').click());
            await page.waitFor(3000);

            try {
                // Open and start external Video
                await page.evaluate(()=> document.querySelector('[class="icon--2q1XXw icon-bbb-plus"]').parentNode.click());
                await page.evaluate(()=> document.querySelectorAll('[class="item--yl1AH"]')[9].click());
                await page.waitFor(3000);
                await page.focus('input[id="video-modal-input"][aria-describedby="exernal-video-note"]');
                await page.keyboard.type('https://www.youtube.com/watch?v=oplhZIiMmLs',{delay: 50});
                await page.evaluate(()=> document.querySelector('[class="button--Z2dosza md--Q7ug4 default--Z19H5du startBtn--ZifpQ9"]').click());
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Open and start external Video => Passed '+passed+' of 2 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while Opening and starting external Video !'))
            }
            
            try{
                // Stop external Video Sharing
                await page.evaluate(()=> document.querySelector('[class="icon--2q1XXw icon-bbb-plus"]').parentNode.click());
                await page.evaluate(()=> document.querySelectorAll('[class="item--yl1AH"]')[9].click());
                passed++;
                console.log(colors.info('Stop external Video Sharing => Passed '+passed+' of 2 !'))

            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while stopping external Video Sharing !'))
            }

        } catch (error) {
            console.log(colors.warn({error},'There was an error at the External Videos Test !'));
        }

        console.log(colors.error(failed+' failed Tests of 2 !'));
        console.log(colors.info(passed+' passed Tests of 2 !'));
        browser.close();
    });
});
module.exports = externalVideos;
