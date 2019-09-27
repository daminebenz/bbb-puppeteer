const puppeteer = require('puppeteer');
(async () => {

    puppeteerA = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ]
    }).then(async browser => {
        promises = [];
        for(let i = 0; i < 2; i++){
            console.log('Page ID Spawned', i)
            await promises.push(browser.newPage().then(async page => {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Bot-${i}&action=create`);
            await page.screenshot({path: 'images/result ' + i + '.png'});
            console.log('page'+i);
            }))
        }
        
        // promoting Bot-0 to Presenter
        
        // browser.newPage().then(async page => {
        //     await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Moderator1&isModerator=true&action=create`);
            
        //     await page.waitFor(3000);
        //     await page.waitFor('[aria-describedby^="modalDismissDescription"]');
        //     await page.click('[aria-describedby^="modalDismissDescription"]');
        //     await page.waitFor(3000);
        //     // giving Bot-0 Presenter
            
        //     await page.evaluate(() => document.querySelectorAll('[aria-label^="Bot-0"]')[0].click());
            
        //     await page.evaluate( () => 
        //         document.querySelector('[data-test="dropdownContent"][aria-expanded="true"]')
        //         .querySelector('[data-test="setPresenter"]')
        //         .click()
        //     );
        // });

        await Promise.all(promises)
    });

    puppeteerB = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ]
    }).then(async browser => {
        browser.newPage().then(async page => {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Moderator2&isModerator=true&action=create`);
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
            await page.evaluate(() => document.querySelectorAll('[aria-label^="Bot-0"]')[0])

                // checking if Bot-0 is available in the users list
                .then(console.log('Test passed'))
        });
        
    })
})();