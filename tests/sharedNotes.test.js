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

            // opening Shared Notes
            await page.waitFor('[class="noteLink--1Xz6Lp"]');
            await page.click('[class="noteLink--1Xz6Lp"]');
            await page.waitFor(3000);
            await page.screenshot({path: 'images/shared-notes-clicked.png'});

            // writing in Shared Notes
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

            // Reopening Shared Notes
            await page.waitFor('[class="noteLink--1Xz6Lp"]');
            await page.click('[class="noteLink--1Xz6Lp"]');
            await page.waitFor(3000);

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

            // Deleting all written shared notes
            await page.keyboard.press('Backspace', {
                delay: 100
            });

            // Hiding Shared Notes
            await page.waitFor('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
            await page.click('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
            await page.waitFor(3000);

            // Reopening Shared Notes
            await page.waitFor('[class="noteLink--1Xz6Lp"]');
            await page.click('[class="noteLink--1Xz6Lp"]');
            await page.waitFor(3000);
            await page.screenshot({path: 'images/shared-notes-clicked.png'});

            // writing in Shared Notes
            await page.keyboard.type('This is a shared notes text to export !', {
                delay: 100
            });

            // Hiding Shared Notes
            await page.waitFor('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
            await page.click('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
            await page.waitFor(3000);

            // opening again Shared Notes
            await page.waitFor('[class="noteLink--1Xz6Lp"]');
            await page.click('[class="noteLink--1Xz6Lp"]');
            await page.waitFor(3000);
            await page.screenshot({path: 'images/shared-notes-clicked.png'});

            // Exporting Shared Notes
            await page.waitForSelector('[data-type="button"][data-key="import_export"]');
            await page.click('[data-type="button"][data-key="import_export"]');

            // Choosing PDF
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
