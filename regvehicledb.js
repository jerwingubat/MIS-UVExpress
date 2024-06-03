const firebaseConfig = {
    apiKey: "AIzaSyDx4wg3HCe1yScsFbBGg1p2J-bKaze4pYw",
    authDomain: "uvexpress-df56c.firebaseapp.com",
    databaseURL: "https://uvexpress-df56c-default-rtdb.firebaseio.com",
    projectId: "uvexpress-df56c",
    storageBucket: "uvexpress-df56c.appspot.com",
    messagingSenderId: "58913712320",
    appId: "1:58913712320:web:6a7b59470abc62f34e2525",
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  var vehicleRegFormDB = firebase.database().ref("vehicleRegForm");
  document.getElementById('vehicleRegForm').addEventListener('submit', submitRegForm);
  document.getElementById('logoutBtn').addEventListener('click', function () {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
      alert('Logout Successful')
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  });

function submitRegForm(e) {
  e.preventDefault();

  var model = getElementVal('vehicleModel').toUpperCase();
  var plateNum = getElementVal('plateNumber').toUpperCase();
  var seatsAvail = getElementVal('seatsAvailable');
  var vehicleStat = getElementVal('vehicleStatus');
  var scheduledTimes = Array.from(document.querySelectorAll('.scheduledTimeInput'))
                         .map(input => input.value);
  // Check if the plate number already exists in the database
  checkPlateNumberExists(plateNum)
    .then((exists) => {
      if (exists) {
        alert('Plate number already exists in the database. Please use a different plate number.');
      } else {
        // Plate number is unique, save the vehicle
        saveVehicle(model, plateNum, seatsAvail, vehicleStat,scheduledTimes);

        
        alert('Vehicle Registration Successful');
        clearInputFields();
      }
    })
    .catch((error) => {
      console.error('Error checking plate number existence:', error);
    });
}

function checkPlateNumberExists(plateNumber) {
  return new Promise((resolve, reject) => {
    // Reference the 'vehicleRegForm' in Firebase
    var query = vehicleRegFormDB.orderByChild('plateNum').equalTo(plateNumber);

    query.once('value')
      .then((snapshot) => {
        resolve(snapshot.exists());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function clearInputFields() {
  document.getElementById('vehicleModel').value = '';
  document.getElementById('plateNumber').value = '';
  document.getElementById('seatsAvailable').value = '';
  document.getElementById('vehicleStatus').value = '';
  document.getElementById('scheduledTimeInput').value='';
}

const saveVehicle = (model, plateNum, seatsAvail, vehicleStat, scheduledTimes) => {
  var newVehicleRegForm = vehicleRegFormDB.child(plateNum);

  newVehicleRegForm.set({
    model: model,
    plateNum: plateNum,
    seatsAvail: seatsAvail,
    vehicleStat: vehicleStat,
    scheduledTimes: scheduledTimes,
  }).then(() => {
    console.log(`Vehicle with plate number ${plateNum} added successfully.`);
  }).catch((error) => {
    console.error(`Error adding vehicle: ${error}`);
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

