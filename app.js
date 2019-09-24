const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: [ '--use-fake-ui-for-media-stream' ]
    });
    const page = await browser.newPage();
    try {
        await page.goto('https://8d1ab45384a1.bbbvm.imdt.com.br');
        await page.screenshot({path: 'images/1-home-page.png'});
        await page.type('#username', 'A');

        page.click('.submit_btn');
        
        await page.waitFor(9000);
        await page.click('.icon-bbb-unmute');
        await page.waitFor(9000);
        await page.click('.icon-bbb-thumbs_up');
        await page.screenshot({path: 'images/2-echo-test-thumb-up.png'});
        await page.waitFor(9000);
        await page.screenshot({path: 'images/3-microphone-connection.png'});

        await page.keyboard.type( "message sent", {
            delay: 100
        });

        await page.keyboard.press('Enter', {
            delay: 100
        });
    
        await page.waitFor(3000);
        await page.screenshot({path: 'images/4-text-message-sent.png'});
        await page.waitFor('[aria-label="Options"]');
        await page.click('[aria-label="Options"]');
        await page.screenshot({path: 'images/5-Options-clicked.png'});
        await page.waitFor(3000);
        await page.waitFor('[aria-labelledby="dropdown-item-label-14"]');
        await page.click('[aria-labelledby="dropdown-item-label-14"]');
        await page.screenshot({path: 'images/6-End-Meeting-window.png'});
        await page.waitFor(3000);
        await page.waitFor('[aria-label="Yes"]');
        await page.click('[aria-label="Yes"]');
        // await page.screenshot({path: 'Logout-clicked.png'});
        
        await page.waitFor(3000);
        await page.screenshot({path: 'images/7-Logout-feedback-screen.png'});
        browser.close();
    } catch (error) {
        console.error({ error }, 'Something happened!');
        browser.close();
    }
})();