const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let closedCaptions = {}
closedCaptions.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        page.setDefaultTimeout(1200000);
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=ClosedCaptionsTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await page.evaluate(()=>document.querySelector('[aria-describedby^="modalDismissDescription"]').click());
            await page.waitFor(3000);

            try {
                // Opening Closed Captions Menu
                await page.evaluate(()=> document.querySelector('i[class="itemIcon--Z207zn1 icon-bbb-closed_caption"]').parentNode.click());
                await page.evaluate(()=>document.querySelectorAll('[class="icon--2q1XXw icon-bbb-settings"]')[0].click());
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('    Opening Closed Captions Menu => Passed '+passed+' of 5 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error},'    There was an error while opening the Closed Captions Menu !    '))
            }

            try{
                // Starting Closed Captions
                await page.waitFor('[class="select--Z1QuDod"]');
                await page.waitFor('[class="button--Z2dosza md--Q7ug4 default--Z19H5du startBtn--21jNH1"]');
                await page.click('[class="button--Z2dosza md--Q7ug4 default--Z19H5du startBtn--21jNH1"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('    Starting Closed Captions => Passed '+passed+' of 5 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error},'    There was an error while starting Closed Captions !    '))
            }

            try{
                // Writing in Closed Captions
                await page.keyboard.type('This is a Closed Caption Text !',{delay: 100})
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('    Writing in Closed Captions => Passed '+passed+' of 5 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error},'    There was an error while writing in Closed Captions !    '))
            }

            try{
                // Export Closed Captions as PDF
                await page.waitFor('[class=" buttonicon buttonicon-import_export"]');
                await page.click('[class=" buttonicon buttonicon-import_export"]');
                await page.waitFor(3000);
                await page.waitFor('[data-l10n-id="pad.importExport.exportpdf"]');
                await page.click('[data-l10n-id="pad.importExport.exportpdf"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('    Exporting Closed Captions as PDF => Passed '+passed+' of 5 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error},'    There was an error while export Closed Captions as PDF !    '))
            }

            try{
                // Hiding Closed Captions
                await page.waitFor('[class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--Zyj8Gc"]');
                await page.click('[class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--Zyj8Gc"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('    Hiding Closed Captions => Passed '+passed+' of 5 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error},'    There was an error while Hiding Closed Captions !    '))
            }

        } catch (error) {
            console.log(colors.warn({error},'    There was an error at the Locks test !    '));
        }
        console.log(colors.error('   '+failed+' failed Tests of 5 !    '));
        console.log(colors.info('   '+passed+' passed Tests of 5 !    '));
        page.waitFor(50000);
    });
});
module.exports = closedCaptions;
