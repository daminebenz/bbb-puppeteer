const puppeteer = require('puppeteer');

let puppeteerB = {}
puppeteerB.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
    browser.newPage().then(async page => {
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Moderator2&isModerator=true&action=create`);
        await page.waitFor(3000);
        try { 
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
        
            await page.evaluate(()=>document.querySelector('[aria-label^="Bot-1"]')[0], console.log('Puppeteer B browser will close in 15 seconds'))


            // checking if Bot-0 is available in the users list
            
            await page.waitFor(15000),console.log('Test passed => Bot-1 was found in the users list');
            console.log('Puppeteer B browser closes')
            browser.close();
        }
        catch (error) {
            console.log({error}, 'Bot-1 was not found')
            console.log('Puppeteer B browser will close in 5 seconds after finding an error')
            await page.waitFor(5000);
            console.log('Puppeteer B browser closes')
            browser.close();
        }
    
    });

})
module.exports = puppeteerB;