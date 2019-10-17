const puppeteer = require('puppeteer');
const URL = process.argv[2]

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let pageTitleCheck = {}
pageTitleCheck.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
}).then(async browser => {
    browser.newPage().then(async page => {
        try {        
            // checking if the meeting name is the same as from the API Mate configuration
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=Checker&isModerator=true&action=create`);
            await page.waitFor(3000);
            const Title = await page.waitForSelector('title').innerHTML;
            
            const expectedMeetingName = 'BigBlueButton - Demo Meeting';
            
            if (Title = expectedMeetingName) {console.log('the Page Title check has passed !')}
            else {
                console.log('the Page Title check has failed !',Title)
            }
            await page.waitFor(35000);
        }
        catch(error){
            console.log({error}, 'there was an error !')
        }
        browser.close();
    });
    
})
module.exports = pageTitleCheck;