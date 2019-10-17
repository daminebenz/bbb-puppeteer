const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let sendPublicMessage = {}
sendPublicMessage.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
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
            passed++;
            console.log(colors.info('    Sending a Public Message => Passed '+passed+' of 1 !    '))
        }
        catch (error) {
            failed++;
            console.log(colors.error({error}, '    There was an error sending a Public Chat Message !    '))
        }
        console.log(colors.error('   '+failed+' failed Test of 1 !    '));
        console.log(colors.info('   '+passed+' passed Test of 1 !    '));
        browser.close();
    });
});
module.exports = sendPublicMessage;