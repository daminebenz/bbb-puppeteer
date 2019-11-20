const puppeteer = require('puppeteer');
const URL = process.argv[2]
const bot = process.argv[4]

async function bots() {
    /* -- Enable if you want to connect Bots from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: true,
	    args: ['--no-sandbox']
    });
    
    // const browser = await puppeteer.connect({
    //    browserWSEndpoint: `ws://209.133.209.137:3000/?token=joao`
    // });

    const page = await browser.newPage();
    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Bot-${bot}&isModerator=false&action=create`);
        await page.waitFor(5000)
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', { timeout: 0 });
        await page.click('[aria-describedby^="modalDismissDescription"]');
        await page.waitFor(3000)
        for (i=0;i<=2000;i++){
            await page.keyboard.type(`Message ${i} from Bot-${bot} has been sent !`,{
                delay: 100
            });
            await page.keyboard.press('Enter',{
                delay: 100
            });
        }
        await page.waitFor(3000)
        process.exit(0)
    }   
    catch(error){
        const time = new Date()
        console.log({error}, ' at => ',time)
        process.exit(1);
    }
}
bots();