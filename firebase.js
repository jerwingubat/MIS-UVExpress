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

var loginFormDB = firebase.database().ref("loginForm");
document.getElementById('loginForm').addEventListener('submit', submitForm);
const auth = firebase.auth();
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  // Add a click event listener to the logout button
  logoutBtn.addEventListener('click', function () {
    // Log the execution to the console for debugging
    console.log('Logout button clicked');

    // Sign out the user
    auth.signOut().then(() => {
      // Redirect to the index.html page
      window.location.href = 'index.html';
      // Show an alert (consider using a more user-friendly UI)
      alert('Logout Successful');
    }).catch((error) => {
      // Log any errors to the console
      console.error('Logout error:', error);
    });
  });
} else {
  // Log a message to the console if the logoutBtn element is not found
  console.error('Logout button not found');
}

function submitForm(e) {
  e.preventDefault();
  document.getElementById("loading-animation").style.display = "block";

  var user = getElementVal('username');
  var pass = getElementVal('password');

  // Get the role from the data-role attribute
  var role = document.getElementById('loginForm').dataset.role;

  auth.signInWithEmailAndPassword(user, pass)
    .then((userCredential) => {
      var user = userCredential.user;
      var email = getElementVal('username');
      console.log('User signed in:', user);

      // Check the role before redirecting
      if (email === 'test@gmail.com') {
        window.location.href = 'home.html';
      } else {
        alert('Admin Permission Needed');
      }


      document.getElementById("loading-animation").style.display = "none";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Authentication error:', errorCode, errorMessage);

      alert('Login failed\nPlease check your username and password');
      document.getElementById("loading-animation").style.display = "none";
    });
}


const getElementVal = (id) => {
  return document.getElementById(id).value;
};