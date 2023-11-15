var gateway = `ws://${window.location.hostname}/SensorReadings`;
var websocket;

function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen    = onOpen;
    websocket.onclose   = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
    console.log(event);
    var data = JSON.parse(event.data);
    console.log(data);
    document.getElementById('accX').innerHTML = data.accX;
    document.getElementById('accY').innerHTML = data.accY;
    document.getElementById('accZ').innerHTML = data.accZ;
    document.getElementById('gyroX').innerHTML = data.gyroX;
    document.getElementById('gyroY').innerHTML = data.gyroY;
    document.getElementById('gyroZ').innerHTML = data.gyroZ;
}

window.addEventListener('load', onLoad);

function onLoad(event) {
    initWebSocket();
    initButton();
}

function initButton() {
    document.getElementById('button').addEventListener('click', click);
}

function click() {
    websocket.send('getSensorReadings');
}