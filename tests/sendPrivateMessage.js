const puppeteer = require('puppeteer');

let sendPrivateMessage = {}
sendPrivateMessage.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
        browser.newPage().then(async page => {
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Messenger2&isModerator=true&action=create`);
        
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

        await page.waitFor(35000)

        browser.close();
    });

});
module.exports = sendPrivateMessage;