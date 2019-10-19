// File name: Format Shared Notes Text
// Test Description:
//      1) Opening Shared Notes
//      2) Writing in Shared Notes
//      3) Selecting all written shared notes
//      4) Formatting Shared Notes in Text Bold
//      5) Hiding Shared Notes
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]

let sharedNotes = {}
sharedNotes.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=SharedNotesTester&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            // Opening Shared Notes
            await page.waitFor('[class="noteLink--1Xz6Lp"]');
            await page.click('[class="noteLink--1Xz6Lp"]');
            await page.waitFor(3000);
            await page.screenshot({path: 'images/shared-notes-clicked.png'});

            // Writing in Shared Notes
            await page.keyboard.type('This is a shared note !', {
                delay: 100
            });

            // Selecting all written shared notes
            await page.keyboard.down('Control', {
                delay: 100
            });
            await page.keyboard.press('KeyA', {
                delay: 100
            });
            await page.keyboard.up('Control', {
                delay: 100
            });

            // Formatting Shared Notes in Text Bold
            await page.keyboard.down('Control', {
                delay: 100
            });
            await page.keyboard.press('KeyB', {
                delay: 100
            });
            await page.keyboard.up('Control', {
                delay: 100
            });

            // Hiding Shared Notes
            await page.waitFor('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
            await page.click('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
            await page.waitFor(3000);
            process.exit[0]
        }
        catch (error) {
            console.log({error});
            process.exit[1]
        }
        browser.close();
    });
});
module.exports = sharedNotes;