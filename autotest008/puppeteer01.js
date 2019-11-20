const puppeteer = require('puppeteer');
const URL = process.argv[2]
const basePath = process.argv[3]
var path = require('path');   
const metrics = {}
const moment = require('moment');

var metricsJSON = path.join(__dirname,`./${basePath}/metrics.json`)
var fs = require("fs");

async function puppeteer1() {
    /* -- Enable if you want to connect Probe from Browserless Server -- */
    const browser = await puppeteer.launch({
        headless: true,
	    args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    try{
        page.setDefaultTimeout(120000);
        await page.goto(`${URL}/demo/demoHTML5.jsp?username=Probe&isModerator=false&action=create`);
        await page.waitForSelector('[aria-describedby^="modalDismissDescription"]', {timeout: 0});
        await page.click('[aria-describedby^="modalDismissDescription"]');
        
        await page.evaluate(()=>{
            var fps = 0;

            window.requestAnimFrame = (function(){
                return  window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame   || 
                window.mozRequestAnimationFrame      || 
                window.oRequestAnimationFrame        || 
                window.msRequestAnimationFrame       || 
                function(callback, element){
                    window.setTimeout(function(){
                    
                        callback(+new Date);
                    }, 1000 / 60);
                };
            })();
    
            var lastRun;
            (function(window, document){
    
                var canvas       = document.getElementById("app"),
                    context      = window.getContext("2d"),
                    width        = canvas.width,
                    height       = canvas.height,
                    game_running = true,
                    show_fps     = true;
    
                function showFPS(){
                    context.fillStyle = "Black";
                    context.font      = "normal 16pt Arial";
    
                    context.fillText(fps + " fps", 10, 26);
                }
                function gameLoop(){
                    if(!lastRun) {
                        lastRun = new Date().getTime();
                        requestAnimFrame(gameLoop);
                        return;
                    }
                    var delta = (new Date().getTime() - lastRun)/1000;
                    lastRun = new Date().getTime();
                    fps = 1/delta;
                    //Clear screen
                    context.clearRect(0, 0, width, height);
    
                    if (show_fps) showFPS();
    
                    if (game_running) requestAnimFrame(gameLoop);
    
                }
                
                gameLoop();
    
            }(this, this.document))
        })
        process.exit(0)
    }   
    catch(error){
        console.log({error})
        process.exit(1);
    }
}
puppeteer1();
