var firebaseConfig = {
    apiKey: "AIzaSyA8UmkSbvQBhD-_OYxBYD2n0wCTbjXmb44",
    authDomain: "sa-q-390.firebaseapp.com",
    projectId: "sa-q-390",
    storageBucket: "sa-q-390.appspot.com",
    messagingSenderId: "500405002149",
    appId: "1:500405002149:web:1f60189774700d97d0124c",
    measurementId: "G-NFVT6G38PK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  db = firebase.firestore();
  storage = firebase.storage();