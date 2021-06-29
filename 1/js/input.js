loader.style.display = 'none'
GE('send_btn').addEventListener('click', () => {
  loader.style.display = 'block'
  
  var file = GE('obj').files[0]
  console.log(file)
  filename = file.name
  tmp = filename.split('.')
  inner_filename = RandomStr(12)+ '.' + tmp[tmp.length - 1]
  data={
    title: GE('title').value,
    description: GE('description').value,
    filename: filename,
    inner_filename: inner_filename 
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


  storageRef = storage.ref('obj/'+inner_filename);
  storageRef.put(file).then((snapshot) => {
    loader.style.display = 'none'
    console.log('Uploaded a blob or file!');
  }).catch((error) => {
    loader.style.display = 'none'
    console.error(error)
    window.alert(error)
  });

})


