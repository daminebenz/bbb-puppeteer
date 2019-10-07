const puppeteer = require('puppeteer');
var colors = require('colors/safe');

colors.setTheme({
    info: 'green',
    error: 'red',
    warn: 'yellow'
});

let poll = {}
poll.init = puppeteer.launch({
        headless: false,
        args: [ '--use-fake-ui-for-media-stream' ],
        executablePath: '/usr/bin/google-chrome'
    }).then(async browser => {
        browser.newPage().then(async page => {
        let passed = 0;
        let failed = 0;
        await page.setViewport({ width: 1042, height: 617});
        try {
            await page.goto(`https://8d1ab45384a1.bbbvm.imdt.com.br/demo/demoHTML5.jsp?username=screenSharingTest&isModerator=true&action=create`, { waitUntil : ['load', 'domcontentloaded']});
            
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
                passed += 1;;
                console.log(colors.info('Starting Poll => Passed '+ passed +' of 7 !'));
            }
            catch (error){
                failed+=1;
                console.log(colors.error({error},'Error while starting a poll !'));
            }

            try{
                // Publishing Poll results
                await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO btn--dDLST"]')[0].click());
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('Publishing Poll Results => Passed '+passed+' of 7 !'));
            } catch (error) {
                failed++;
                console.log(colors.error({error},'Error while Publishing Poll results !'))
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
                console.log(colors.info('Starting Poll => Passed '+ passed +' of 7 !'));
            }
            catch (error){
                failed++;
                console.log(colors.error({error},'Error while starting a poll !'));
            }      

            try{
                // Writing custom Poll options
                await page.waitFor('[class="button--Z2dosza md--Q7ug4 default--Z19H5du customBtn--Z8fMMN"]');
                await page.click('[class="button--Z2dosza md--Q7ug4 default--Z19H5du customBtn--Z8fMMN"]');
                await page.waitFor(3000);
                await page.waitFor('[class="pollInput--Z2euEV9"]');
                await page.click('[class="pollInput--Z2euEV9"]');
                await page.keyboard.type('Poll option 1 !');
                await page.keyboard.press('Tab');
                await page.keyboard.type('Poll option 2 !')
                passed++;
                console.log(colors.info('Writing Poll options => Passed '+passed+' of 7 !'));
            } catch (error){
                failed++;
                console.log(colors.error({error}, 'Error while writing Poll options !'));
            }

            try {
                // Starting the custom Poll
                await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO btn--1lLcwA"]')[0].click());
                await page.waitFor(5000);
                passed++;
                console.log(colors.info('Starting the Custom Poll => Passed '+passed+ ' of 7 !'));
            }
            catch(error) {
                failed++;
                console.log(colors.error({error}, 'There was an error starting Custom Poll !'));
            }

            try{
                // Publishing Poll results
                await page.waitFor(5000);
                await page.evaluate(()=>document.querySelectorAll('[class="button--Z2dosza md--Q7ug4 primary--1IbqAO btn--dDLST"]')[0].click());
                await page.waitFor(3000);
                passed++;
                console.log(colors.info('Publishing Poll Results => Passed '+passed+' of 7 !'));
            } catch (error) {
                failed++;
                console.log(colors.error({error},'Error while Publishing Poll results !'))
            }

            try{
                // Hiding Poll results from presentation
                await page.waitFor('[id="tippy-88"]');
                await page.click('[id="tippy-88"]');
                passed++;
                console.log(colors.info('Hiding Poll results => Passed '+passed+' of 7 !'))
            } catch(error){
                failed++;
                console.log(colors.error({error}, 'Error while hiding Poll results !'))
            }
        }
        catch (error) {
            console.log(colors.warn({error},'There was an error at Polls !'));
        }

        console.log(colors.error(failed+' failed Tests of 7 !'));
        console.log(colors.info(passed+' passed Tests of 7 !'));
        browser.close();
    });
});
module.exports = poll;
