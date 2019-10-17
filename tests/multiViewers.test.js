const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let multiViewers = {}
multiViewers.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    promises = [];
    let passed = 0;
    let failed = 0;
    for(let i = 1; i < 3; i++){
        await promises.push(browser.newPage().then(async page => {
            try{
                await page.goto(`${URL}/demo/demoHTML5.jsp?username=Bot-${i}&action=create&isModerator=false`);
                await page.waitFor('[aria-describedby^="modalDismissDescription"]');
                await page.click('[aria-describedby^="modalDismissDescription"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('    Multi Viewers Connection Test => Passed '+passed+' of 1 !    '))
            }
            catch(error){
                failed++;
                console.log(colors.error({error}, '    There was an error at Bot-'+i+'\'s connection !    '))
            }
        }))
    }
    console.log(colors.error('   '+failed+' failed Test of 1 !    '));
    console.log(colors.info('   '+passed+' passed Test of 1 !    '));
    browser.close();
    await Promise.all(promises);
});
module.exports = multiViewers;