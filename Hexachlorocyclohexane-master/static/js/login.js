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

function Resister(email,password,callback,ERR_callback){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
          console.log(user)
          callback(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.warn(error)
        if(ERR_callback){
            ERR_callback(error)
        }
    })
}


GE('login_btn').addEventListener('click',()=>{
    email=GE('email_inp').value
    password=GE('password_inp').value
    LogIn(email,password,LogInCallback,ERR_Callback)
})
function LogInCallback(user){
    console.log(user)
}

GE('resister_btn').addEventListener('click',()=>{
    email=GE('email_inp').value
    password=GE('password_inp').value
    Resister(email,password,ResisterCallback,ERR_Callback)
})
function ResisterCallback(user){
    console.log(user)
}


function ERR_Callback(error){
    console.log(error)
    window.alert(error.message)
}

firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
    if (user) {
        location.href='/user-settings'
    }
});

