var myname,my_email,photoUrl,emailVerified,my_uid
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        myname = user.displayName;
        my_email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        my_uid=user.uid;
    }else{
        location.href='/login'
    }
});

