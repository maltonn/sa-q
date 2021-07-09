var display_name;
var my_uid;
if(loader){
  loader.style.display='None'
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        display_name = user.displayName;
        my_uid=user.uid;
    }else{
        location.href='/sa-q/login'
    }
});

loader.style.display = 'none'

GE('send_btn').addEventListener('click', () => {
  loader.style.display = 'block'
  
  var file = GE('obj_input').files[0]
  console.log(file)
  filename = file.name
  tmp = filename.split('.')
  inner_filename = RandomStr(12)+ '.' + tmp[tmp.length - 1]

  data={
    title: GE('title').value,
    description: GE('description').value,
    filename: filename,
    inner_filename: inner_filename,
    uid:my_uid,
    username:display_name,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  }
  db.collection("obj").doc(inner_filename).set(data)
    .then(() => {
      console.log("Document successfully written!");
      console.log(data)
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      window.alert(error)
    })

  // Create a root reference
  var storageRef = firebase.storage().ref();

  // Create a reference to 'mountains.jpg'
  var mountainsRef = storageRef.child(inner_filename);
  mountainsRef.put(file).then((snapshot) => {
    loader.style.display = 'none'
    console.log('Uploaded a blob or file!');
    location.reload();
  }).catch((error) => {
    loader.style.display = 'none'
    console.error(error)
    window.alert(error)
  });

})



