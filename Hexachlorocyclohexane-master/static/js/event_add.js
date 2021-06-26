GE('add_event_btn').addEventListener('click',()=>{
    console.log(GE('secret_inp').value)
    db.collection("event_secret").doc(GE('secret_inp').value).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            db.collection("event_to_user").doc(doc.data().event_id+'-'+my_uid).set({
                event_id: doc.data().event_id,
                uid:my_uid,
                username:myname,
                iconpath:photoUrl,
            })
            .then((docRef) => { 
                window.alert(doc.data().name+'が登録されました！')
                location.href=location.href.split('#')[0]
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                window.alert(error)
            })
        } else {
            window.alert('Secretに対応するイベントがありません')
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
})