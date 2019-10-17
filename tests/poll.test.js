const puppeteer = require('puppeteer');
var colors = require('colors/safe');
const URL = process.argv[2];

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let poll = {}
poll.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream',
                '--window-size=800,600']
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
            
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`${URL}/demo/demoHTML5.jsp?username=PollTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
            await page.waitFor(3000);
            await page.waitFor('[aria-describedby^="modalDismissDescription"]');
            await page.click('[aria-describedby^="modalDismissDescription"]');
            await page.waitFor(3000);

            try{
                // Starting a Poll
                await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
                await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
                await page.waitFor(3000);
                await page.waitFor('[aria-labelledby="dropdown-item-label-22"][aria-describedby="dropdown-item-desc-23"]');
                await page.click('[aria-labelledby="dropdown-item-label-22"][aria-describedby="dropdown-item-desc-23"]');
                await page.waitFor(3000);
                await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 default--Z19H5du pollBtn--119tJ5"]')[5].click());
                await page.waitFor(5000)
                passed++;
                console.log(colors.info('   Starting Poll => Passed '+ passed +' of 9 !   '));
            }
            catch (error){
                
                console.log(colors.error({error},'  Error while starting a poll !   '));
            }

            try{
                // Publishing Poll results
                await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO btn--dDLST"]')[0].click());
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('   Publishing Poll Results => Passed '+passed+' of 9 !    '));
            } catch (error) {
                failed++;
                console.log(colors.error({error},'  Error while Publishing Poll results !   '))
            }

            try{
                // Starting a new Poll
                await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
                await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
                await page.waitFor(3000);
                await page.waitFor('[aria-labelledby="dropdown-item-label-22"][aria-describedby="dropdown-item-desc-23"]');
                await page.click('[aria-labelledby="dropdown-item-label-22"][aria-describedby="dropdown-item-desc-23"]');
                await page.waitFor(3000);              
                passed ++;;
                console.log(colors.info('   Starting Poll => Passed '+ passed +' of 9 !    '));
            }
            catch (error){
                failed++;
                console.log(colors.error({error},'  Error while starting a poll !   '));
            }      

            try{
                // Writing custom Poll options
                await page.waitFor('[aria-label="Custom poll"]');
                await page.click('[aria-label="Custom poll"]');
                await page.waitFor(3000);
                await page.waitFor('[class="pollInput--Z2euEV9"]');
                await page.click('[class="pollInput--Z2euEV9"]');
                await page.keyboard.type('Poll option 1 !',{delay: 100});
                await page.keyboard.press('Tab');
                await page.keyboard.type('Poll option 2 !',{delay: 100})
                passed++;
                console.log(colors.info('   Writing Poll options => Passed '+passed+' of 9 !   '));
            }
            catch(error) {
                failed++;
                console.log(colors.error({error}, '    There was an error starting Custom Poll !    '));
            }

            try{
                // Publishing Poll results
                await page.waitFor(3000);
                await page.waitFor('[aria-label="Start custom poll"]');
                await page.click('[aria-label="Start custom poll"]');
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('   Publishing Poll Results => Passed '+passed+' of 9 !    '));
            } catch (error) {
                failed++;
                console.log(colors.error({error},'  Error while Publishing Poll results !   '))
            }

            try{
                // Hiding Poll results from presentation
                await page.waitFor('[aria-label="Clear all annotations"]');
                await page.click('[aria-label="Clear all annotations"]');
                passed++;
                console.log(colors.info('   Hiding Poll results => Passed '+passed+' of 9 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error}, '    Error while hiding Poll results !    '))
            }

            try {
                // Starting Poll from Uploaded File
                await page.waitFor('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
                await page.click('[class="lg--Q7ufB buttonWrapper--x8uow button--ZzeTUF"]');
                await page.waitFor(3000);
                await page.waitFor('[aria-labelledby="dropdown-item-label-24"][aria-describedby="dropdown-item-desc-25"]');
                await page.click('[aria-labelledby="dropdown-item-label-24"][aria-describedby="dropdown-item-desc-25"]');
                await page.waitFor(3000);
                const fileInput = await page.$('input[type=file]');
                await fileInput.uploadFile('../files/customPoll.pdf');
                await page.evaluate(()=>{
                    document.querySelector('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO confirm--1BlGTz"]')
                    .click()
                })
                await page.waitFor('[aria-label="Quick Poll"]');
                await page.click('[aria-label="Quick Poll"]');
                await page.waitFor(3000);
                await page.evaluate(()=>{document.querySelectorAll('[class="verticalList--Ghtxj"][role="menu"]')[2].click()});
                passed++;
                console.log(colors.info('   Starting Poll from Uploaded File => Passed '+passed+' of 9 !   '))
            } catch (error) {
                failed++;
                console.log(colors.error({error}, '    There was an error when starting Poll from Uploaded File !   '))
            }

            try{
                // Publishing Poll results
                await page.waitFor(3000);
                await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO btn--dDLST"]')[0].click());
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('   Publishing Poll Results => Passed '+passed+' of 9 !    '));
            } catch (error) {
                failed++;
                console.log(colors.error({error},'  Error while Publishing Poll results !   '))
            }

            try{
                // Hiding Poll results from presentation
                await page.waitFor('[aria-label="Clear all annotations"]');
                await page.click('[aria-label="Clear all annotations"]');
                passed++;
                console.log(colors.info('   Hiding Poll results => Passed '+passed+' of 9 !    '))
            } catch(error){
                failed++;
                console.log(colors.error({error}, '    Error while hiding Poll results !    '))
            }
        }
        catch (error) {
            console.log(colors.warn({error},'   There was an error at the Polls test !    '));
            
        }
        browser.close();
        process.env.PASS = passed;
        process.env.FAIL = failed;
        console.log(process.env.PASS, ' passed => ', passed)
        console.log(process.env.FAIL, ' failed => ', failed)
    });
});
module.exports = poll;
