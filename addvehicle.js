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
  document.getElementById('logoutBtn').addEventListener('click', function () {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
      alert('Logout Successful')
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  });

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  