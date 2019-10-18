// File name: Joining existing BreakoutRooms
// Test Description:
//      1) Opening BreakoutRooms Menu
//      2) Joining Breakout room 1
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]

let breakoutRoomTester = {}
breakoutRoomTester.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
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
            process.exit(0);
        }
        catch(error){
            console.log({error})
            process.exit(1);
        }
        await page.waitFor(50000);
        browser.close();
    });
})
module.exports = breakoutRoomTester;