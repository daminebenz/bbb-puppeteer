const puppeteer = require('puppeteer');
const URL = process.argv[2]

let sendPrivateMessage = {}
sendPrivateMessage.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Messenger2&isModerator=true&action=create`);
            
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
            
            await page.evaluate(() => document.querySelectorAll('[aria-label^="Messenger1"]')[0].click());
            
            await page.evaluate( () => 
            document.querySelector('[data-test="dropdownContent"][aria-expanded="true"]')
            .querySelector('[data-test="activeChat"]')
                .click()
            );
            await page.keyboard.type( "message sent to Messenger1", {
                delay: 100
            });

            await page.keyboard.press('Enter', {
                delay: 100
            });
            await page.waitFor(5000);
            await page.screenshot({path: 'images/privte-message-sent.png'});
            await page.evaluate(
                () => document.querySelectorAll('[accesskey="G"]')[0]
                .click());

            await page.waitFor(35000);
            passed++;
            console.log(colors.info('Locating Messenger1 and Sending him a Private Message => Passed '+passed+' of 1 !'))
        }
        catch (error) {
            failed++;
            console.log(colors.error({error}, 'There was an Error locating Messenger1 !'))
        }
        console.log(colors.error(failed+' failed Test of 1 !'));
        console.log(colors.info(passed+' passed Test of 1 !'));
        browser.close();
    });

});
module.exports = sendPrivateMessage;