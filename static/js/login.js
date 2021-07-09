function LogIn(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user)
        })
        .catch((error) => {
            console.warn(error)
            window.alert(error.message)
        });
}



GE('login_btn').addEventListener('click',()=>{
    email=GE('email_inp').value
    password=GE('password_inp').value
    LogIn(email,password)
})

firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
    if (user) {
        location.href='/input'
    }
});