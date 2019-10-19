// File name: Check Page Title
// Test Description:
//      1) Checking Page Title if conforms the API Mate Meeting Title
//

const puppeteer = require('puppeteer');
const URL = process.argv[2]

let pageTitleCheck = {}
pageTitleCheck.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        // Checking if the meeting name is the same as from the API Mate configuration
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Checker&isModerator=true&action=create`);
        await page.waitFor(3000);
        const title = await page.waitForSelector('title').innerHTML;
        const expectedMeetingName = 'BigBlueButton - Demo Meeting';
        
        if (title === expectedMeetingName) {
            process.exit[0]
        }
        else {
            console.log('There was an error, The title you are checking is different from what the page Title is !');
            process.exit[1]
        }
        await page.waitFor(35000);

        browser.close();
    });
    
})
module.exports = pageTitleCheck;