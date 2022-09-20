const firebaseConfig = {
    apiKey: "AIzaSyBj0yHhIgVLyIlCclPMpZqwqeVLKkZQEi4",
    authDomain: "site-web-design.firebaseapp.com",
    databaseURL: "https://site-web-design-default-rtdb.firebaseio.com",
    projectId: "site-web-design",
    storageBucket: "site-web-design.appspot.com",
    messagingSenderId: "874167131974",
    appId: "1:874167131974:web:fbbcba2908a2809ad28f47"
};

firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database()
    .ref('Stickers');

document.getElementById('stickerForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var sticker_number = getInputVal('number');
    var city = getInputVal('city');
    var phone = getInputVal('phone');

    if (name == '' || city == '' || phone == '') {
        document.getElementById('message_error').style.display = 'block';
        document.getElementById('message_ok').style.display = 'none';
    } else {
        document.getElementById('message_error').style.display = 'none';

        saveMessage(name, sticker_number, city, phone);
    }
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveMessage(name, sticker_number, city, phone) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        sticker_number: sticker_number,
        city: city,
        phone: phone
    }).then(function () {
        console.log("Data saved successfully!");

        document.getElementById('stickerForm').reset();
        document.getElementById('message_ok').style.display = 'block';
    }).catch(function (error) {
        console.log("Got an error: ", error);
        document.getElementById('message_error').style.display = 'block';
    })
}

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);

    console.log(map);
}

function switchButton1() {
    document.getElementById("cadastro").style.display = 'block'
    document.getElementById("procura").style.display = 'none'
    window.scrollBy({
        top: 1000,
        behavior: "smooth"
    });
}

function switchButton2() {
    document.getElementById("procura").style.display = 'block'
    document.getElementById("cadastro").style.display = 'none'
    window.scrollBy({
        top: 1000,
        behavior: "smooth"
    });
}

