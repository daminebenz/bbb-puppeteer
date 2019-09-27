const puppeteerA = require('./tests/puppeteerA');
const puppeteerB = require('./tests/puppeteerB');
const pageTitleCheck = require('./tests/pageTitleCheck');
const sendPrivateMessage = require('./tests/sendPrivateMessage');
const sendPublicMessage = require('./tests/sendPublicChatMessage');
const connectWithMicrophone = require('./tests/connectWithMicrophone');

(async () => {
    await pageTitleCheck;
    await puppeteerA;
    await puppeteerB;
    await connectWithMicrophone;
    // await sendPrivateMessage;
    await sendPublicMessage;
})();