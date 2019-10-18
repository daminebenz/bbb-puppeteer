const puppeteer = require('puppeteer');
const URL = process.argv[2]

let lockedViewer1 = {}
lockedViewer1.init = puppeteer.launch({
        headless: true,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=lockedViewer1&isModerator=false&action=create`);
            
            await page.waitFor(3000);
            await page.evaluate(()=>document.querySelector('[aria-describedby^="modalDismissDescription"]').click())
            await page.waitFor(3000);

        } catch (error) {
            console.log({error});
        }

    });
});
module.exports = lockedViewer1;
