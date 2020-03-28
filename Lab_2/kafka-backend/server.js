var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var dashboard = require('./services/dashboard.js');
var announcement = require('./services/announcement')
var enroll = require ('./services/enroll')
var drop = require ('./services/drop')
// function handleTopicRequest(topic_name,fname){
    var topic_name = 'request_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + "message is: ");
        //console.log(message);
        //console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log(data)

        switch (data.km.value) {
            case 'dashboard':
            console.log("In dashboard server.js")
                dashboard.dashboard(data.data, function(err, res){
                    console.log("data - dashboard - server.js");
                    console.log(data);
                    console.log("data.data - dashboard - server.js");
                    console.log(data.data);
                    var payloads = [
                        {
                            topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];
                    producer.send(payloads, function(err, data){
                        //console.log(data);
                    });
                    return;
                });
                break;
            case 'announcement':
                announcement.announcement(data.data, function(err, res){
                    var payloads = [
                        {
                            topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];
                    producer.send(payloads, function(err, data){
                        //console.log(data);
                    });
                    return;
                });
		break;
                case 'enroll':
                enroll.enroll(data.data, function(err, res){
                    var payloads = [
                        {
                            topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];
                    producer.send(payloads, function(err, data){
                        //console.log(data);
                    });
                    return;
                });
		break;
                case 'drop':
                drop.drop(data.data, function(err, res){
                    var payloads = [
                        {
                            topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];
                    producer.send(payloads, function(err, data){
                        //console.log(data);
                    });
                    return;
                });
                break;
                default:
                    return;
        }
        // fname.handle_request(data.data, function(err,res){
        //     console.log('after handle'+res);
        //     var payloads = [
        //         { topic: data.replyTo,
        //             messages:JSON.stringify({
        //                 correlationId:data.correlationId,
        //                 data : res
        //             }),
        //             partition : 0
        //         }
        //     ];
        //     producer.send(payloads, function(err, data){
        //         console.log(data);
        //     });
        //     return;
        // });
        
    });
// }
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("get_dashboard",dashboard)
// handleTopicRequest("announcement",announcement)
