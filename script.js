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

var stickersRef = firebase.database()
    .ref('Stickers');

document.getElementById('stickerForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var sticker_number = getInputVal('number');
    var city = getInputVal('city');
    var phone = getInputVal('phone');

    if (name == '' || city == '' || phone == '' || sticker_number == '') {
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
    var newMessageRef = stickersRef.push();
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

function getStickersByNumber() {
    var sticker_number = document.getElementById('sticker_number').value;

    if (sticker_number == '') {
        document.getElementById('message_error_search').style.display = 'block';
        document.getElementById('message_error_search').innerText = "Erro ao buscar figurinha";

    } else {
        document.getElementById('message_error_search').style.display = 'none';

        stickersRef.once("value")
            .then(function (snapshot) {
                document.getElementById('stickersList').innerHTML = "";

                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();

                    if (childData.sticker_number == sticker_number) {
                        document.getElementById('stickersList').innerHTML += "<div class='card'>Nome: " + childData.name + "<br>Cidade: " + childData.city + "<br>Número de celular: " + childData.phone + "</div>";
                    }
                });

                if (document.getElementById('stickersList').innerHTML == "") {
                    document.getElementById('message_error_search').style.display = 'block';
                    document.getElementById('message_error_search').innerText = "Não encontramos nenhuma figurinha com esse número.";

                    return
                }

                window.scrollBy({
                    top: 1000,
                    behavior: "smooth"
                });
            });
    }
}

function switchButton1() {
    document.getElementById("cadastro").style.display = 'block'
    document.getElementById("procura").style.display = 'none'
    document.getElementById('stickersList').innerHTML = "";
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

function formatPhone() {
    var phone = document.getElementById('phone').value;

    phone = phone.replace(/\D()-/g, "");
    phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
    console.log(phone);
    document.getElementById('phone').value = phone;
}

