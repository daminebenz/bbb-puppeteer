// File name: Drawing
// Test Description:
//      1) Drawing in Presentation
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]

let drawer = {}
drawer.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        page.setDefaultTimeout(1200000);
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=drawerTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor(3000);
            // Drawing
            await page.click('[aria-label="Close Join audio modal"]');
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
            process.exit[0]
        } catch (error) {
            console.log({error});
            process.exit[1]
        }
        browser.close();
    });
});
module.exports = drawer;