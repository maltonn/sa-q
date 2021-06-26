firebase.auth().onAuthStateChanged(function(user) {
    db.collection("user").doc(my_uid).get()
    .then((doc) => {
        if (doc.exists) {
            data=doc.data()
            GE('username_inp').value=data.username
            document.querySelector('option[value='+data.gender+']').selected=true
            document.querySelector('option[value='+data.age_group+']').selected=true
            document.querySelector('option[value='+data.religion+']').selected=true
            GE('github_inp').value=data.github
            GE('twitter_inp').value=data.twitter
            GE('instagram_inp').value=data.instagram
            GE('facebook_inp').value=data.facebook
            GE('linkedin_inp').value=data.linkedin
            GE('introduction_inp').value=data.introduction
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            GE('update_btn').innerText='登録'
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    GE('my_email').innerText=my_email
    GE('update_btn').addEventListener('click',()=>{
        r=Randint(4)+1
        g=GE('gender_inp').options[GE('gender_inp').selectedIndex].value
        if(g=='male'){
            photoURL='../static/img/man'+r+'.png'
        }else if(g=='female'){
            photoURL='../static/img/woman'+r+'.png'
        }else{
            photoURL='../static/img/normal.png'
        }
        
        user.updateProfile({
            displayName:GE('username_inp').value,
            photoURL: photoURL,
        }).then(function() {
        // Update successful.
        }).catch(function(error) {
            window.alert(error)
        });

        db.collection("user").doc(my_uid).set({
            iconpath:photoURL,
            username: GE('username_inp').value,
            email: my_email,
            gender: GE('gender_inp').options[GE('gender_inp').selectedIndex].value,
            age_group:GE('age_group_inp').options[GE('age_group_inp').selectedIndex].value,
            religion:GE('religion_inp').options[GE('religion_inp').selectedIndex].value,
            github:GE('github_inp').value,
            twitter:GE('twitter_inp').value,
            instagram:GE('instagram_inp').value,
            facebook:GE('facebook_inp').value,
            linkedin:GE('linkedin_inp').value,
            introduction:GE('introduction_inp').value,
        })
        .then(() => {
            console.log("Document successfully written!");
            if(my_uid){
                location.href='user?uid='+my_uid
            }
            //AddCookie('profile_done','done')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            window.alert(error)
        })
    })
});

/*
if(GetCookie('profile_done')){
    location.href='user?uid='+my_uid
}

*/