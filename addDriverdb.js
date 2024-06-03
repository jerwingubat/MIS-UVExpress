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
  var driverRegFormDB = firebase.database().ref("driverRegForm");
  document.getElementById('driverRegForm').addEventListener('submit',submitRegForm);
  document.getElementById('logoutBtn').addEventListener('click', function () {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
      alert('Logout Successful')
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  });

  function submitRegForm(e){
    e.preventDefault();

    var driver_name = getElementVal('driverName').toUpperCase();
    var license_number = getElementVal('licenseNumber').toUpperCase();
    var driver_age = getElementVal('driverAge');
    var driver_address = getElementVal('driverAddress').toUpperCase();
 
    checkLicenseNumberExists(license_number)
    .then((exists) => {
      if (exists) {
        alert('License number already exists in the database. Please use a different license number.');
      } else {
        // License number is unique, save the vehicle
        saveDriver(driver_name, license_number, driver_age, driver_address);
        alert('Vehicle Registration Successful');
        clearInputFields();
      }
    })
    .catch((error) => {
      console.error('Error checking license number existence:', error);
    });
  }
  function checkLicenseNumberExists(license_number) {
    return new Promise((resolve, reject) => {
      // Reference the 'driverRegForm' in Firebase
      var query = driverRegFormDB.orderByChild('license_number').equalTo(license_number);
  
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
    document.getElementById('driverName').value = '';
    document.getElementById('licenseNumber').value = '';
    document.getElementById('driverAge').value = '';
    document.getElementById('driverAddress').value = '';
  }

  const saveDriver = (driver_name, license_number, driver_age, driver_address) => {
    var newDriverRegForm = driverRegFormDB.child(license_number);

    newDriverRegForm.set({
        driver_name:driver_name,
        license_number:license_number,
        driver_age:driver_age,
        driver_address:driver_address,
    })
  };


  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };