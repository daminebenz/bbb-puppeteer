const puppeteerA = require('./tests/puppeteerA');
const puppeteerB = require('./tests/puppeteerB');
const pageTitleCheck = require('./tests/pageTitleCheck');
const sendPrivateMessage = require('./tests/sendPrivateMessage');
const sendPublicMessage = require('./tests/sendPublicChatMessage');
const connectWithMicrophone = require('./tests/connectWithMicrophone');
const breakoutrooms = require('./tests/breakoutrooms');
const breakoutRoomTester = require('./tests/breakoutRoomTester');

(async () => {
    
    try {
        await pageTitleCheck;
        await puppeteerA;
        await puppeteerB;
        await connectWithMicrophone;
        await sendPrivateMessage;
        await sendPublicMessage;
        await breakoutrooms;
        await breakoutRoomTester;
    }    
    catch (error){
        console.log({error},'there was an error !')
    }
        
})();