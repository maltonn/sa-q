
function Resister(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      window.alert(error.message)
      console.warn(error)
    })
}


GE('resister_btn').addEventListener('click', () => {
  email = GE('email_inp').value
  password = GE('password_inp').value
  Resister(email, password)
})

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user)
  if (user) {
    if (!user.displayName) {
      user.updateProfile({
        displayName: GE('username_inp').value,
      }).then(function () {
        console.log('update successfuly')
        location.href = '/input'
      }).catch(function (error) {
        console.warn(error)
        window.alert(error)
      });
    }else{
      location.href = '/input'
    }

  }
});
