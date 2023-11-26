if (!!window.EventSource) {
    var sourceSensor = new EventSource('/SensorReadings');
    var sourceReset = new EventSource('/Reset');

    sourceSensor.addEventListener('open', function(e) {
      console.log("SensorReadings Connected");
    }, false);

    sourceReset.addEventListener('open', function(e) {
        console.log("Reset Connected");
      }, false);
  
    sourceSensor.addEventListener('error', function(e) {
      if (e.target.readyState != EventSource.OPEN) {
        console.log("SensorReadings Disconnected");
      }
    }, false);
  
    sourceReset.addEventListener('error', function(e) {
        if (e.target.readyState != EventSource.OPEN) {
          console.log("Reset Disconnected");
        }
      }, false);

    sourceSensor.addEventListener('readings', function(e) {
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

      sourceReset.addEventListener('reset', function(e) {
        console.log("reset", e.data);
      }, false);
  }