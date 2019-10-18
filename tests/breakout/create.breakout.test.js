// File name: BreakoutRoom Creation
// Test Description:
//      1) Create Breakoutrooms
//      2) Join Breakout room 1
//      3) End Breakoutrooms
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]

let breakoutrooms = {}
breakoutrooms.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
    browser.newPage().then(async page => {
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=breakoutroomUser&isModerator=true&action=create`);
        await page.waitFor(3000);
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);
        for(let i = 1; i < 3; i++){
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Bot-${i}&action=create&isModerator=false`);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        }
        try {
            await page.evaluate( () => 
            document.querySelectorAll('[aria-label="Manage users"]')[0]
                .click()
            );

            await page.waitFor(3000);
            await page.waitFor('[aria-labelledby="dropdown-item-label-53"]');
            await page.click('[aria-labelledby="dropdown-item-label-53"]');
            await page.waitFor(3000);

            await page.waitFor('[aria-label="Randomly assign"]');
            await page.click('[aria-label="Randomly assign"]');

            await page.waitFor(500);
            await page.waitFor('[data-test="modalConfirmButton"]');
            await page.click('[data-test="modalConfirmButton"]');

            await page.waitFor('[aria-label="Breakout Rooms"]');
            await page.click('[aria-label="Breakout Rooms"]');

            await page.waitFor('[aria-label="Join room 1"]');
            await page.click('[aria-label="Join room 1"]');

            // End breakoutrooms after 33 seconds
            await page.waitFor(30000);

            await page.waitFor('[aria-label="End all breakout rooms"]');
            await page.waitFor(3000);
            await page.click('[aria-label="End all breakout rooms"]');
            await page.bringToFront();

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
module.exports = breakoutrooms;