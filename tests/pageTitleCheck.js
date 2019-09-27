const puppeteer = require('puppeteer');

let pageTitleCheck = {}
pageTitleCheck.init = puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
    browser.newPage().then(async page => {

        // checking if the meeting name is the same as from the API Mate configuration
        await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Checker&isModerator=true&action=create`);
        await page.waitFor(3000);
        const evaluatedTitle =  await page.evaluate( () => document.title)
        await page.goto('https://8d1ab45384a1.bbbvm.imdt.com.br/bigbluebutton/api/getMeetings?checksum=0a794332ed7f70277fd33fd9da1f95ae3d20dcba');
        const configMeetingName = await page.evaluate( ()=> document.querySelectorAll('meetingName')[0].innerHTML)
        const pageTitle = 'BigBlueButton - ' + configMeetingName;
        
        
        if ( evaluatedTitle === pageTitle) {console.log('the Page Title check has passed !')}
        else {
            console.log('the Page Title check has failed !',evaluatedTitle)
        }
        await page.waitFor(3000);

        browser.close();
    });
    
})
module.exports = pageTitleCheck;