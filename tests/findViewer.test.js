const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let puppeteerB = {}
puppeteerB.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=findViewer&isModerator=false&action=create`);
        await page.waitFor(3000);
        try { 
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        
            await page.evaluate(()=>document.querySelector('[aria-label^="Bot-1"]'))
            passed++;
            console.log(colors.info('    Finding Viewer Test => Passed '+passed+' of 1 !    '))
        }
        catch (error) {
            failed++
            console.log(colors.error({error}, '    There was an error at Locating Bot-1 !    '))
        }
        console.log(colors.error('   '+failed+' failed Test of 1 !    '));
        console.log(colors.info('   '+passed+' passed Test of 1 !    '));
        browser.close();
    });

})
module.exports = puppeteerB;