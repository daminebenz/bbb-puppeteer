// File name: Moderator Drawing
// Test Description:
//      1) Drawing
//      2) Clear all annotations
//      3) Drawing in Violet color
//      4) Enabling Multi-User Whiteboard
//

const puppeteer = require('puppeteer');
const ViewerDrawing = require('./ViewerDrawing.whiteboard.test');
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
            await page.waitFor('[aria-label="Close Join audio modal"]');
            await page.click('[aria-label="Close Join audio modal"]');
            await page.waitFor(3000);
            
            // Drawing
            await page.waitFor('[aria-label="Tools"]');
            await page.click('[aria-label="Tools"]');
            await page.waitFor('[aria-label="Pencil"]');
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
                await page.mouse.up();
            }
            await page.waitFor(5000);

            // Clear all annotations
            await page.waitFor('[aria-label="Clear all annotations"]');
            await page.click('[aria-label="Clear all annotations"]');
            await page.waitFor(3000);

            // Drawing in Violet color
            await page.waitFor('[aria-label="Colors"]');
            await page.click('[aria-label="Colors"]');
            await page.waitFor(3000);
            await page.waitFor('rect[fill="#8800ff"]');
            await page.click('rect[fill="#8800ff"]');
            await page.waitFor(3000);
            await page.evaluate((whiteboard) => {
                const { top, left, bottom, right } = whiteboard.getBoundingClientRect();
                return { top, left, bottom, right };
              }, whiteboard);
            for (i = 0; i <= 20; i++) {
                await page.mouse.move(bounds.left + (i * drawingOffset), bounds.top + (i * drawingOffset), { steps });
                await page.mouse.down();
                await page.mouse.move(bounds.left + (i * drawingOffset), bounds.bottom - (i * drawingOffset)), { steps };
                await page.mouse.up();
            }
            await page.waitFor(3000);

            // Enabling Multi-User Whiteboard
            await page.waitFor('[aria-label="Turn multi-user whiteboard on"]');
            await page.click('[aria-label="Turn multi-user whiteboard on"]');
            await page.waitFor(3000)
            process.exit[0]
        } catch (error) {
            console.log({error});
            process.exit[1]
        }
    });
});
module.exports = drawer;
