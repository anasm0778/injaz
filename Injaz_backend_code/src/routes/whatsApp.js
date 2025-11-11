const accountSid = 'AC74e07a59879611d14837ec0b16c5a4ce';
const authToken = '05fa3d42cf11dbb516338f92c41a951f';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Your appointment is coming up on July 21 at 3PM',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+918826882676'
    })
    .then(message => console.log(message.sid))
    .done();