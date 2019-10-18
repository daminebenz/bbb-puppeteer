const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2];

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let poll = {}
poll.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {            
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=pdfPollTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);
            // Starting Poll from Uploaded File
            await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
            await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
            await page.waitFor(3000);
            await page.waitFor('[aria-labelledby="dropdown-item-label-24"][aria-describedby="dropdown-item-desc-25"]');
            await page.click('[aria-labelledby="dropdown-item-label-24"][aria-describedby="dropdown-item-desc-25"]');
            await page.waitFor(3000);
            const fileInput = await page.$('input[type=file]');
            await fileInput.uploadFile('../files/customPoll.pdf');
            await page.evaluate(()=>{
                document.querySelector('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO confirm--1BlGTz"]')
                .click()
            })
            await page.waitFor('[aria-label="Quick Poll"]');
            await page.click('[aria-label="Quick Poll"]');
            await page.waitFor(3000);
            await page.evaluate(()=>{document.querySelectorAll('[class="verticalList--Ghtxj"][role="menu"]')[2].click()});

            // Publishing Poll results
            await page.waitFor(3000);
            await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO btn--dDLST"]')[0].click());
            await page.waitFor(3000);

            // Hiding Poll results from presentation
            await page.waitFor('[aria-label="Clear all annotations"]');
            await page.click('[aria-label="Clear all annotations"]');
            process.exit(0);
        } catch (error){
            console.log(colors.error({error}))
            process.exit(1);
        }
    browser.close();
    })
});
module.exports = poll;
