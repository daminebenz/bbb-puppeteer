const puppeteer1 = require('./puppeteer1');
const puppeteer2 = require('./puppeteer2');

(async ()=> {
    let a = puppeteer1; 
    let b = puppeteer2;
    Promise.all(a, b)
})
