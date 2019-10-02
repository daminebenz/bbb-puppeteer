const puppeteer = require('puppeteer');

let pageTitleCheck = {}
pageTitleCheck.init = puppeteer.launch({
    headless: true,
    args: [ '--use-fake-ui-for-media-stream' ]
}).then(async browser => {
    browser.newPage().then(async page => {
        try {        
            // checking if the meeting name is the same as from the API Mate configuration
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=Checker&isModerator=true&action=create`);
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