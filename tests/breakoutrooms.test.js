const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let breakoutrooms = {}
breakoutrooms.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=breakoutroomUser&isModerator=true&action=create`);
        await page.waitFor(3000);
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);

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

            await page.waitFor(400);
            await page.waitFor('[data-test="modalConfirmButton"]');
            await page.click('[data-test="modalConfirmButton"]');

            await page.waitFor('[aria-label="Breakout Rooms"]');
            await page.click('[aria-label="Breakout Rooms"]');

            await page.waitFor('[aria-label="Join room 1"]');
            await page.click('[aria-label="Join room 1"]');

            await page.waitFor(30000);
            await page.waitFor('[aria-label="End all breakout rooms"]',console.log('BreakOutRoom1 will close in 3 seconds'));
            await page.waitFor(3000);
            await page.click('[aria-label="End all breakout rooms"]');
            await page.bringToFront();

            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        }   
        catch(error){
            console.log({error}, 'there was an error !')
        }
        /* WIP */
        await page.waitFor(50000);
        // browser.close();
    });
})
module.exports = breakoutrooms;