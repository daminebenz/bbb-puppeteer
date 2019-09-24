const puppeteer = require('puppeteer');

(async () => {
    browser = await puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ]
    });
    const page1 = await browser.newPage();
    try {
        await page1.goto('https://8d1ab45384a1.bbbvm.imdt.com.br');
        await page1.screenshot({path: 'images/1-home-page.png'});
        let r = Math.random().toString(36).substring(7);
        await page1.type('#username', r);

        page1.click('.submit_btn');
        
        await page1.waitFor(9000);
        await page1.waitFor('.icon-bbb-unmute');
        await page1.click('.icon-bbb-unmute');
        await page1.waitFor(20000);
        await page1.waitFor('.icon-bbb-thumbs_up');
        await page1.click('.icon-bbb-thumbs_up');
        await page1.screenshot({path: 'images/2-echo-test-thumb-up.png'});
        await page1.waitFor(9000);
        await page1.screenshot({path: 'images/3-microphone-connection.png'});

        await page1.keyboard.type( "message sent", {
            delay: 100
        });

        await page1.keyboard.press('Enter', {
            delay: 100
        });
    
        await page1.waitFor(3000);
        await page1.screenshot({path: 'images/4-text-message-sent.png'});
        await page1.waitFor('[aria-label="Options"]');
        await page1.click('[aria-label="Options"]');
        await page1.screenshot({path: 'images/5-Options-clicked.png'});
        await page1.waitFor(3000);
        await page1.waitFor('[aria-labelledby="dropdown-item-label-14"]');
        await page1.click('[aria-labelledby="dropdown-item-label-14"]');
        await page1.screenshot({path: 'images/6-End-Meeting-window.png'});
        await page1.waitFor(3000);
        await page1.waitFor('[aria-label="Yes"]');
        await page1.click('[aria-label="Yes"]');
        // await page1.screenshot({path: 'Logout-clicked.png'});
        
        await page1.waitFor(3000);
        await page1.screenshot({path: 'images/7-Logout-feedback-screen.png'});
        browser.close();
    } catch (error) {
        console.error({ error }, 'Something happened at page1');
        await page1.screenshot({path: 'images/error.png'});
        await page1.waitFor(3000);
        browser.close();
    }
    browser2 = await puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ]
    });
    const page2 = await browser2.newPage();
    try {
        await page2.goto('https://8d1ab45384a1.bbbvm.imdt.com.br');
        await page1.screenshot({path: 'images/page2-opening.png'});
        await page2.waitFor(3000);
        browser.close();



    } catch (error) {
        console.error({error}, 'Something happened at page2')
        await page2.screenshot({path: 'images/error-at-page2.png'});
        await page2.waitFor(3000);
        browser.close();
    }
})();
