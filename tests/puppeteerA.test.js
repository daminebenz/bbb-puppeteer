const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let puppeteerA = {}
puppeteerA.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    promises = [];
    for(let i = 1; i < 3; i++){
        await promises.push(browser.newPage().then(async page => {
            try{
                await page.goto(`${URL}/demo/demoHTML5.jsp?username=Bot-${i}&action=create`);
                await page.waitFor('[aria-describedby^="modalDismissDescription"]');
                await page.click('[aria-describedby^="modalDismissDescription"]');
                await page.waitFor(3000);
            }
            catch(error){
                console.log({error}, 'Bot-'+i+' failed to connect !')
            }
        }))
    }

    // promoting Bot-2 to Presenter
    
        browser.newPage().then(async page => {
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Moderator1&isModerator=true&action=create`);
            
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
            
            await page.evaluate(() => document.querySelectorAll('[aria-label^="Messenger2"]')[0].click());

            await page.evaluate( () => 
            document.querySelector('[data-test="dropdownContent"][aria-expanded="true"]')
            .querySelector('[data-test="setPresenter"]')
                .click()
            );
            console.log('Puppeteer A browser will close in 50 seconds');
            await page.waitFor(50000);
            console.log('Puppeteer A browser closes')
        }
        catch (error) {
            console.log(colors.error({error}, 'There was an error locating Messenger2 !'))
        }
        browser.close();
    });

    await Promise.all(promises);

});
module.exports = puppeteerA;