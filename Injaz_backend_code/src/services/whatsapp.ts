import pkg from 'twilio';


const accountSid = 'AC74e07a59879611d14837ec0b16c5a4ce';
const authToken = '05fa3d42cf11dbb516338f92c41a951f';
const client = pkg(accountSid, authToken);
export const sendWhatsAppmessage = ({ message }) => {
  client.messages
    .create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+918826882676',
    })
    .then((message) => console.log(message.sid));
};

/**
* @description for setting up the initial whatsapp message
Send a WhatsApp message
Use WhatsApp and send a message from your device to
WhatsApp logo+1 415 523 8886

with code
 
join adjective-practical


*/
