const puppeteer = require('puppeteer');

let puppeteerA = {}
puppeteerA.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
    promises = [];
    for(let i = 1; i < 3; i++){
        await promises.push(browser.newPage().then(async page => {
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Bot-${i}&action=create`);
        console.log('Bot '+i+ ' has connected !');
        }))
    }

    // promoting Bot-0 to Presenter
    
        browser.newPage().then(async page => {
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Moderator1&isModerator=true&action=create`);
        
        await page.waitFor(3000);
        await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000);
        
        await page.evaluate(() => document.querySelectorAll('[aria-label^="Bot-2"]')[0].click());
        
        await page.evaluate( () => 
           document.querySelector('[data-test="dropdownContent"][aria-expanded="true"]')
           .querySelector('[data-test="setPresenter"]')
            .click()
        );
        console.log('Puppeteer A browser will close in 15 seconds');
        await page.waitFor(15000);
        console.log('Puppeteer A browser closes')
        browser.close();
    });

    await Promise.all(promises);

});
module.exports = puppeteerA;