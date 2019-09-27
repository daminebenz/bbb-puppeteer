const puppeteer = require('puppeteer');

let sendPrivateMessage = {}
sendPrivateMessage.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
        browser.newPage().then(async page => {
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Messenger2&isModerator=true&action=create`);

        browser.close();
    });

});
module.exports = sendPrivateMessage;