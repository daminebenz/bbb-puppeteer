const puppeteer = require('puppeteer');

let breakoutRoomTester = {}
breakoutRoomTester.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async pageBreakoutroom => {
        try {
            await pageBreakoutroom.waitFor(10000);
            await pageBreakoutroom.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=breakoutRoomTester&isModerator=true&action=create`);
            await pageBreakoutroom.waitFor(3000);
            await pageBreakoutroom.waitFor('[aria-describedby^="modalDismissDescription"]');
            await pageBreakoutroom.click('[aria-describedby^="modalDismissDescription"]');
            await pageBreakoutroom.waitFor(3000);

            // joining available breakoutrooms sessions
            await pageBreakoutroom.waitFor('[aria-label="Breakout Rooms"]');
            await pageBreakoutroom.click('[aria-label="Breakout Rooms"]');

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