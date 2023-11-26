if (!!window.EventSource) {
    var source = new EventSource('/SensorReadings');
  
    source.addEventListener('open', function(e) {
      console.log("SensorReadings Connected");
    }, false);
  
    source.addEventListener('error', function(e) {
      if (e.target.readyState != EventSource.OPEN) {
        console.log("SensorReadings Disconnected");
      }
    }, false);
  
    source.addEventListener('message', function(e) {
      console.log("message", e.data);
    }, false);
  
    source.addEventListener('readings', function(e) {
        console.log("readings", e.data);
        var data = JSON.parse(e.data);
        console.log(data);
        document.getElementById('accX').innerHTML = data.accX;
        document.getElementById('accY').innerHTML = data.accY;
        document.getElementById('accZ').innerHTML = data.accZ;
        document.getElementById('gyroX').innerHTML = data.gyroX;
        document.getElementById('gyroY').innerHTML = data.gyroY;
        document.getElementById('gyroZ').innerHTML = data.gyroZ;
      }, false);
  }