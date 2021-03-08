const Queue = require('bull');

// 1. Initiating the Queue
const sendMailQueue = new Queue('sendMail');

const data = {
  email: 'gmail@gmail.com'
}

const options = {
  repeat: {
    every: 100000,
    limit: 100
  }
};

// 2. Adding a Job to the Queue
sendMailQueue.add(data, options);

// 3. Consumer
sendMailQueue.process(async job => {
  sendMail1(job.data.email);
});

function sendMail1(email) {
  console.log(email)
}

sendMailQueue.on('completed', job => {
  console.log(job)
  console.log(`Job with id ${job.id} has been completed`);
})