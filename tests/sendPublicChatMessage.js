const puppeteer = require('puppeteer');

let sendPublicMessage = {}
sendPublicMessage.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
   
        browser.newPage().then(async page => {
        try{     
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Messenger1&isModerator=true&action=create`);
            
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
        }
        catch (error) {
           console.log({error}, 'there was an error sending a Public Chat Message') 
        }
        browser.close();
    });
});
module.exports = sendPublicMessage;