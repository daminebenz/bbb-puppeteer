const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path'); 
const TIMELIMIT_SECONDS = parseInt(process.argv[4])
const TIMELIMIT_MILLISECONDS = TIMELIMIT_SECONDS * 1000;
const metrics = {}
const moment = require('moment');

var metricsJSON = path.join(__dirname,`./${basePath}/metrics.json`)
var fs = require("fs");

async function puppeteer1() {
    /* -- Enable if you want to connect Probe from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: false,
	    args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Probe&isModerator=false&action=create`);
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        for (var i = TIMELIMIT_MILLISECONDS; i >= 0; i--) {
            // rAF
            await page.evaluate(()=>{
                let x = window.requestAnimationFrame = function() {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        function(f) {
                            window.setTimeout(f,1e3/60);
                        }
                }(); 
                return x
            })

            var $ = await page.evaluate(()=>document.querySelector.bind(document));


            var fps = 60;
            var now;
            var then = Date.now();
            var interval = 1000/fps;
            var delta;

            // For this demo
            var counter!
            var first = then;

            var second_since = Date.now();
            var second = 0;
            var second_fps = 0;
            
            function draw() {
                
                // Calculating REAL FPS
                if (second > 1000) {
                    second_since = Date.now();
                    second = 0;                    
                    second_fps = 0;
                }
                else {
                    second = Date.now() - second_since;
                    ++second_fps;
                }
                
        
                
                now = Date.now();
                delta = now - then;
                
                if (delta > interval) {

                    then = now - (delta % interval);
                    var time_el = (then - first)/1000;
                    return time_el
                }
                console.log(++counter + 'f / ' + parseInt(time_el) + 's = ' + parseInt(counter/time_el) + 'fps')

            }

            draw();
        }
        await page.waitFor(60000)

        process.exit(0)
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
}
puppeteer1();
