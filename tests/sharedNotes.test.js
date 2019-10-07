const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red'
});

  
let sharedNotes = {}
sharedNotes.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ]
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=SharedNotesTester&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            try{
                // opening Shared Notes
                await page.waitFor('[class="noteLink--1Xz6Lp"]');
                await page.click('[class="noteLink--1Xz6Lp"]');
                await page.waitFor(3000);
                await page.screenshot({path: 'images/shared-notes-clicked.png'});
                passed += 1;
                console.log(colors.info('Opening Shared Notes  => Passed '+ passed +' of 13 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while opening Shared Notes !',{error}));
            }

            try{
                // writing in Shared Notes
                await page.keyboard.type('This is a shared note !', {
                    delay: 100
                });
                passed+=1;
                console.log(colors.info('Writing in Shared Notes  => Passed '+passed+' of 13 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while trying to write in Shared Notes !',{error}))
            }

            try {
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
                passed += 1;
                console.log(colors.info('Selecting all written shared notes  => Passed '+ passed +' of 13 !'));
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while selecting all written shared notes !',{error}));
            }

            try {
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

                passed += 1;
                console.log(colors.info('Formatting Shared Notes in Text Bold  => Passed '+ passed +' of 13 !'));
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while formatting Shared Notes in Text Bold !',{error}));
            }
            
            try {
                // Hiding Shared Notes
                await page.waitFor('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
                await page.click('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
                await page.waitFor(3000);
                passed += 1;
                console.log(colors.info('Hiding Shared Notes  => Passed '+ passed +' of 13 !'));
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while hiding Shared Notes !',{error}));
            }

            try {
                // Reopening Shared Notes
                await page.waitFor('[class="noteLink--1Xz6Lp"]');
                await page.click('[class="noteLink--1Xz6Lp"]');
                await page.waitFor(3000);
                passed+=1;
                console.log(colors.info('Reopening Shared Notes  => Passed '+ passed +' of 13 !'));
            } catch(error){
                failed+=1;
                console.log(colors.error('Error while reopening Shared Notes !',{error}));
            }

            try {
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
                passed+=1;
                console.log(colors.info('Selecting all written shared notes  => Passed '+ passed +' of 13 !'));
            } catch (error){
                failed+=1;
                console.log(colors.error('Error while selecting all written shared notes !',{error}));
            }

            try {
                // Deleting all written shared notes
                await page.keyboard.press('Backspace', {
                    delay: 100
                });
                passed+=1;
                console.log(colors.info('Deleting all written shared notes  => Passed '+ passed +' of 13 !'));
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while deleting all written shared notes !',{error}));
            }

            try {
                // Hiding Shared Notes
                await page.waitFor('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
                await page.click('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
                await page.waitFor(3000);
                passed+=1;
                console.log(colors.info('Hiding Shared Notes  => Passed '+ passed +' of 13 !'));
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while hiding Shared Notes !',{error}));
            }
            
            try {
                // Reopening Shared Notes
                await page.waitFor('[class="noteLink--1Xz6Lp"]');
                await page.click('[class="noteLink--1Xz6Lp"]');
                await page.waitFor(3000);
                await page.screenshot({path: 'images/shared-notes-clicked.png'});
                passed+=1;
                console.log(colors.info('Reopening Shared Notes  => Passed '+ passed +' of 13 !'));
            } catch(error){
                failed+=1;
                console.log(colors.error('Error while reopening Shared Notes !',{error}));
            }

            try {
                // writing in Shared Notes
                await page.keyboard.type('This is a shared notes text to export !', {
                    delay: 100
                });
                passed+=1;
                console.log(colors.info('Writing in Shared Notes  => Passed '+passed+' of 13 !'));
                
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while trying to write in Shared Notes !',{error}))
            }
            
            try {
                // Hiding Shared Notes
                await page.waitFor('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
                await page.click('[aria-label="Hide note"][class="button--Z2dosza md--Q7ug4 default--Z19H5du hideBtn--2kqDJM"]');
                await page.waitFor(3000);
                passed+=1;
                console.log(colors.info('Hiding Shared Notes  => Passed '+ passed +' of 13 !'));
            } catch (error) {
                failed+=1;
                console.log(colors.error('Error while hiding Shared Notes !',{error}));
            }

            try {            
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
                passed += 1;
                console.log(colors.info('Exporting as PDF => Passed '+ passed +' of 13 !'));
            }
            catch (error){
                failed+=1;
                console.log(colors.error('Error while Exporting Shared Notes as PDF !',{error}))
            }
            
        }
        catch (error) {
            console.log({error}, 'there was an error at Shared Notes !');
        }
        console.log(colors.error(failed+' failed Tests of 13 !'));
        console.log(colors.info(passed+' passed Tests of 13 !'));
        browser.close();
    });
});
module.exports = sharedNotes;