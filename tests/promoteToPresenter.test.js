const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let promoteToPresenter = {}
promoteToPresenter.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
    // promoting Messenger2 to Presenter
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
        passed++;
        console.log(colors.info('    Promoting Messenger2 to Presenter => Passed '+passed+' of 1 !    '))
    }
    catch (error) {
        console.log(colors.error({error}, '    There was an error locating Messenger2 !    '))
    }
    console.log(colors.error('   '+failed+' failed Tests of 4 !    '));
    console.log(colors.info('   '+passed+' passed Tests of 4 !    '));
    browser.close();
});
})
module.exports = promoteToPresenter;    