var event_id
GE('resister_btn').addEventListener('click',()=>{
    event_id=RandomStr(12)
    db.collection("event").doc(event_id).set({
        name: GE('name_inp').value,
        date:GE('date_inp').value,
        place:GE('place_inp').value,
        tag:GetRadio(),
        description:GE('description_inp').value,
        url:GE('url_inp').value,
    })
    .then(() => {
        console.log("Document successfully written!");
        SetSecret()
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        window.alert(error)
    })
})


function SetSecret(){
    rs=RandomStr(6)
    secret=rs.slice(0,3)+'-'+rs.slice(3)
    db.collection("event_secret").doc(secret).set({
        event_id:event_id,
        name:GE('name_inp').value,
    })
    .then(() => {
        window.alert('登録完了!\nイベントSecretは「'+secret+'」です。\n仲間たちに伝えましょう！')
        console.log("Document successfully written!");
        location.href='/user?uid='+my_uid
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        window.alert(error)
    })
}


function GetRadio(){
    radios=document.getElementsByClassName('radio1')
    for(var i=0; i<radios.length;i++){
        if(radios[i].checked){
            val=radios[i].value
        }
    }
    return val
}
