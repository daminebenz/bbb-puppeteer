const puppeteer = require('puppeteer');
const ViewerDrawing = require('./ViewerDrawing.test');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let drawer = {}
drawer.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ],
        executablePath: '/usr/bin/google-chrome'
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        page.setDefaultTimeout(1200000);
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=drawerTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            await page.waitFor('[aria-label="Close Join audio modal"]');
            await page.click('[aria-label="Close Join audio modal"]');
            await page.waitFor(3000);
            try {
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
                passed++;
                console.log(colors.info('Drawing => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while Drawing !'))
            }

            try{
                // Clear all annotations
                await page.waitFor('[aria-label="Clear all annotations"]');
                await page.click('[aria-label="Clear all annotations"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('Clear all annotations => Passed '+passed+' of 4 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error},'There was an error while clearing all annotations !'));
            }

            try {
                // Drawing in Violet color
                await page.waitFor('[aria-label="Colors"]');
                await page.click('[aria-label="Colors"]');
                await page.waitFor(3000);
                await page.waitFor('rect[fill="#8800ff"]');
                await page.click('rect[fill="#8800ff"]');
                await page.waitFor(3000);
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
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('Drawing in Violet color => Passed'+passed+' of 4 !'))
            } catch(error){
                failed++
                console.log(colors.error({error},'There was an error at drawing in Violet color !'))
            }
            try {
                // Enabling Multi-User Whiteboard
                await page.waitFor('[aria-label="Turn multi-user whiteboard on"]');
                await page.click('[aria-label="Turn multi-user whiteboard on"]');
                await page.waitFor(3000).then(
                    await ViewerDrawing
                )
                
                passed++;
                console.log(colors.info('Enabling Multi-User Whiteboard => Passed '+passed+' of 4 !'))
                /* WIP */
            } catch (error){
                failed++;
                console.log(colors.error({error},'There was an error while enabling Multi-User Whiteboard !'))
            }
        } catch (error) {
            console.log(colors.warn({error},'There was an error at clicking Undo button !'));
        }

        console.log(colors.error(failed+' failed Tests of 4 !'));
        console.log(colors.info(passed+' passed Tests of 4 !'));
        browser.close();
    });
});
module.exports = drawer;
