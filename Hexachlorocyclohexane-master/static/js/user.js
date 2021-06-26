url = new URL(location.href)
uid = url.searchParams.get('uid')

db.collection("user").doc(uid).get().then((doc) => {
    if (doc.exists) {
        data=doc.data()
        console.log(data)
        GE('page_title').innerText=data.username+'のマイページ'
        GE('page_title_h1').innerText=data.username+'のマイページ'
        
        GE('username').innerText=data.username
        GE('religion').innerText=data.religion
        GE('introduction').innerText=data.introduction
        GE('icon').src=data.iconpath
        snsns=['github','twitter','instagram','facebook','linkedin']
        sns_links=['https://www.github.com/','https://www.twitter.com/','https://www.instagram.com/','https://www.facebook.com/','https://www.linkedin.com/']
        for(i=0;i<snsns.length;i++){
            if(data[snsns[i]]){
                GE(snsns[i]).href=sns_links[i]+data[snsns[i]]
            }else{
                GE(snsns[i]).outerHTML=''
            }
        }
    } else {
        window.alert('ユーザーが存在しません')
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

firebase.auth().onAuthStateChanged(function(user) {
    if (my_uid!=uid){
        GE('plus').outerHTML=''
        GE('user_settings_btn').outerHTML=''
    }
})

db.collection("event_to_user").where("uid", "==", uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("event").doc(doc.data().event_id).get().then((sub_doc) => {
                sub_doc=sub_doc.data()
                div=CE('div')
                div.innerHTML='<a href="/event?eid='+doc.data().event_id+'"><h4>'+sub_doc.name+'</h4></a><details><div>  <i class="fas fa-calendar-day"></i><span>'+sub_doc.date+'</span></div><div><i class="fas fa-map-marker-alt"></i>   <span>'+sub_doc.place+'</span></div><div><i class="fas fa-pager"></i><a href="'+sub_doc.url+'">イベントページ</a></div></details>'    
                if(sub_doc.tag=='勉強会'){
                    div.classList.add('study_event')
                    GE('study_events').appendChild(div)
                }else{
                    div.classList.add('hackathon_event')
                    GE('hackathon_events').appendChild(div)
                }
            })
        })
    })
    .catch((error) => {
        window.alert(error)
        console.log("Error getting documents: ", error);
    });


