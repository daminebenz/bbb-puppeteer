const puppeteer = require('puppeteer');

let connectWithMicrophone = {}
connectWithMicrophone.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
        browser.newPage().then(async page => {
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=MicrophoneCheck&isModerator=true&action=create`);
        try {

            await page.waitFor('.icon-bbb-unmute');
            await page.click('.icon-bbb-unmute');
            await page.waitFor('[aria-label="Echo is audible"]');
            await page.click('[aria-label="Echo is audible"]');
            await page.screenshot({path: 'images/2-echo-test-thumb-up.png'});
            await page.waitFor(9000);
            await page.screenshot({path: 'images/3-microphone-connection.png'});
    
            await page.waitFor('[aria-label="Options"]');
            await page.click('[aria-label="Options"]');
            await page.screenshot({path: 'images/5-Options-clicked.png'});
            await page.waitFor(3000);
            await page.waitFor('[aria-labelledby="dropdown-item-label-16"]');
            await page.click('[aria-labelledby="dropdown-item-label-16"]');
            await page.screenshot({path: 'images/6-disconnection-window.png'});
            await page.waitFor(3000);
            browser.close();
        } catch (error) {
            console.error({ error }, 'Something happened at page');
            await page.screenshot({path: 'images/error.png'});
            await page.waitFor(3000);
            browser.close();
        }
        browser.close();
    });

});
module.exports = connectWithMicrophone;