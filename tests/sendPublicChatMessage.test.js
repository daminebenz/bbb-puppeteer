const puppeteer = require('puppeteer');
const URL = process.argv[2]

let sendPublicMessage = {}
sendPublicMessage.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        try{     
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Messenger1&isModerator=true&action=create`);
            
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            await page.keyboard.type( "message sent", {
                delay: 100
            });

            await page.keyboard.press('Enter', {
                delay: 100
            });
        
            await page.waitFor(3000);
            await page.screenshot({path: 'images/4-text-message-sent.png'});
            
            await page.waitFor(35000)
            process.exit[0]
        }
        catch (error) {
            console.log({error})
            process.exit[1]
        }
        browser.close();
    });
});
module.exports = sendPublicMessage;