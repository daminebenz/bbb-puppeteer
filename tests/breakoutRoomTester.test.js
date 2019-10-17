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
    browser.newPage().then(async pageBreakoutroom => {
        try {
            await pageBreakoutroom.waitFor(10000);
            await pageBreakoutroom.goto(`${URL}/demo/demoHTML5.jsp?username=breakoutRoomTester&isModerator=true&action=create`);
            await pageBreakoutroom.waitFor(3000);
            await pageBreakoutroom.waitFor('[aria-describedby^="modalDismissDescription"]');
            await pageBreakoutroom.click('[aria-describedby^="modalDismissDescription"]');
            await pageBreakoutroom.waitFor(3000);

            // joining available breakoutrooms sessions
            await pageBreakoutroom.evaluate(()=>document.querySelector('i[class="itemIcon--Z207zn1 icon-bbb-rooms"]').parentNode.click());
            await pageBreakoutroom.waitFor('[aria-label="Join room 1"]');
            await pageBreakoutroom.click('[aria-label="Join room 1"]');
 
            await pageBreakoutroom.waitFor(3000);
            await pageBreakoutroom.waitFor('[aria-describedby^="modalDismissDescription"]');
            await pageBreakoutroom.click('[aria-describedby^="modalDismissDescription"]');
            await pageBreakoutroom.waitFor(3000);
        }
        catch(error){
            console.log({error}, 'there was an error !')
        }
        await pageBreakoutroom.waitFor(50000);
        // browser.close();
    });
})
module.exports = breakoutRoomTester;