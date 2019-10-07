const puppeteerA = require('./tests/puppeteerA.test');
const puppeteerB = require('./tests/puppeteerB.test');
const pageTitleCheck = require('./tests/pageTitleCheck.test');
const sendPrivateMessage = require('./tests/sendPrivateMessage.test');
const sendPublicMessage = require('./tests/sendPublicChatMessage.test');
const testingAudio = require('./tests/testingAudio.test');
const breakoutrooms = require('./tests/breakoutrooms.test');
const breakoutRoomTester = require('./tests/breakoutRoomTester.test');
const sharedNotes = require('./tests/sharedNotes.test');

(async () => {
    
    try {
        await pageTitleCheck;
        await puppeteerA;// connecting with Bots and a Moderator1, and setting Messenger2 as a Presenter
        await puppeteerB;// connecting with a Moderator2 and checking if Bot-1 is available in the Userslist
        await testingAudio;// connecting with Microphone and testing all available functionalites of the audio use
        await sendPrivateMessage;// sending private message from Messenger 1 to Messenger 2
        await sendPublicMessage;// sending public message to public chat
        await breakoutrooms;// creating breakoutrooms
        await breakoutRoomTester;// joining an existing Breakoutroom session
        await sharedNotes;// testing all of the functionalities of Shared Notes
    }    
    catch (error){
        console.log({error},'there was an error !')
    }
        
})();