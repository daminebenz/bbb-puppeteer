const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let breakoutRoomTester = {}
breakoutRoomTester.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        try {
            await page.waitFor(10000);
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=breakoutRoomTester&isModerator=true&action=create`);
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            // joining available breakoutrooms sessions
            await page.evaluate(()=>document.querySelector('i[class="itemIcon--Z207zn1 icon-bbb-rooms"]').parentNode.click());
            await page.waitFor('[aria-label="Join room 1"]');
            await page.click('[aria-label="Join room 1"]');
 
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
            passed++;
            console.log(colors.info('    Joining existing Breakoutrooms => Passed '+passed+' of 1 !'))
        }
        catch(error){
            failed++;
            console.log(colors.error({error}, '    There was an error !    '))
        }
        await page.waitFor(50000);
        console.log(colors.error('   '+failed+' failed Test of 1 !'));
        console.log(colors.info('   '+passed+' passed Test of 1 !'));
        browser.close();
    });
})
module.exports = breakoutRoomTester;