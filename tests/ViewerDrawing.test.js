const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let ViewerDrawing = {}
ViewerDrawing.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        page.setDefaultTimeout(1200000);
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=ViewerDrawing&isModerator=false&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            try {
                // Drawing
                await page.click('[aria-label="Close Join audio modal"]');
                await page.waitForSelector('[class="toolbarContainer--ZqATLX"]');
                await page.click('[aria-label="Tools"]');
                await page.click('[aria-label="Pencil"]');
                const whiteboard = await page.$('div[role=presentation]');                
                await page.waitFor(3000);
                const bounds = await page.evaluate((whiteboard) => {
                    const { top, left, bottom, right } = whiteboard.getBoundingClientRect();
                    return { top, left, bottom, right };
                  }, whiteboard);
                const drawingOffset = 15;
                const steps = 5;
                for (i = 0; i <= 20; i++) {
                    await page.mouse.move(bounds.left + (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
                    await page.mouse.down();
                    await page.mouse.move(bounds.left + (i * drawingOffset), bounds.bottom - (i * drawingOffset)), { steps };
                    await page.mouse.move(bounds.right - (i * drawingOffset), bounds.bottom - (i * drawingOffset), { steps });
                    await page.mouse.move(bounds.right - (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
                    await page.mouse.move(bounds.left + (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
                    await page.mouse.up();
                }
                await page.close();
                process.exit();
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Drawing as Viewer => Passed'+passed+' of 1 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while trying to draw as a Viewer !'))
            }

        } catch (error) {
            console.log(colors.warn({error},'There was an error at Viewer Drawing Test !'));
        }
        console.log(colors.error(failed+' failed Test of 1 !'));
        console.log(colors.info(passed+' passed Test of 1 !'));
        browser.close();
    });
});
module.exports = ViewerDrawing;
