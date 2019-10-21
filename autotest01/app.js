const puppeteer = require('puppeteer');
const testingMic = require('../tests/audio/mic.test');
const testingAudio = require('../tests/audio/listen.test');

puppeteer.launch({
    headless: false,
    args: [ '--use-fake-ui-for-media-stream',
            '--window-size=800,600']
    }).then(async browser => {
    browser.newPage().then(async () => {
    try {
        testingMic;
        testingAudio;
        process.exit[0]
    }
    catch (error) {
        console.log({error});
        process.exit[1]
    }
    browser.close();
})})