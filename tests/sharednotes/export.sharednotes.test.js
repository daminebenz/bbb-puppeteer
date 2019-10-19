// File name: Export Shared Notes as PDF
// Test Description:
//      1) Opening again Shared Notes
//      2) Exporting Shared Notes as PDF
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

            // Opening again Shared Notes
            await page.waitFor('[class="noteLink--1Xz6Lp"]');
            await page.click('[class="noteLink--1Xz6Lp"]');
            await page.waitFor(3000);
            await page.screenshot({path: 'images/shared-notes-clicked.png'});

            // writing in Shared Notes
            await page.keyboard.type('This is a shared notes text to export !', {
                delay: 100
            });
            
            // Exporting Shared Notes
            await page.waitForSelector('[data-type="button"][data-key="import_export"]');
            await page.click('[data-type="button"][data-key="import_export"]');
            await page.waitFor('a[id="#exportpdfa"]');
            await page.click('a[id="#exportpdfa"]');
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
