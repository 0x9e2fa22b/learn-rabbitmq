const amqp = require('amqplib/callback_api');

function test(data) {
  console.log(`Test: ${data}`)
}

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'queue_name1';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
      console.log("[x] Received %s", msg.content.toString());
      test(msg.content.toString())
    }, {
      noAck: true
    });
  });
});