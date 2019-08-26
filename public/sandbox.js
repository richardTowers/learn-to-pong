onmessage = function(messageEvent) {
  console.log('From worker: ', messageEvent.data);
}