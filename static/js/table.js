var display_name='';
var my_uid;
if(loader){
    loader.style.display='None'
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        display_name = user.displayName;
        my_uid=user.uid;
    }
});

params = {}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}



window.onload = () => {
    L = []
    db.collection("obj").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            dic = doc.data()
            dic['id'] = doc.id
            L.push(dic)
        });
        MakeTable(L)
    });
}

function MakeTable(data) {
    if (true) {
        keys_lst = ['title', 'filename', 'username', 'timestamp']
    }
    else { //keyがあらかじめ決まってない場合：DBに含まれるキーを全部使って表を取得
        tmp = []

        for (d of data) {
            for (key of Object.keys(d)) {
                if (key != 'primary_key' && key != 'sid') {
                    tmp.push(key)
                }
            }
        }
        st = new Set(tmp)
        keys_lst = [...st.values()]
    }


    for (key of keys_lst) {
        th = document.createElement('th')
        th.innerText = key
        th.classList.add('uk-text-left')
        table_keys.appendChild(th)
    }
    for (d of data) {
        flag = true
        tr = document.createElement('tr')
        for (key of keys_lst) {

            if (params[key] && params[key] != d[key]) { // paramに指定された値と違う値が入ってる
                flag = false
                break
            }

            td = document.createElement('td')
            td.innerText = (d[key]) || ''

            if (key == 'timestamp' && d['timestamp']) {//firebase timestamp → Js Date
                date = new Date
                td.innerText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }

            tr.setAttribute('data-inner_filename', d['inner_filename']) ///
            tr.setAttribute('data-id', d['id']) ///

            tr.appendChild(td)
        }
        if (flag) {

            if (display_name==tr.querySelectorAll('td')[keys_lst.indexOf('username')].innerText) { //ログインしてるユーザーとアップロードしたユーザーが同じなら、消すアイコンを設置
                td = document.createElement('td')
                icon = document.createElement('button')
                icon.setAttribute('uk-icon', 'icon: trash')
                icon.style.color = 'black'
                icon.classList.add('pointer', 'uk-button', 'uk-button-link')
                td.appendChild(icon)
                tr.appendChild(td)


                icon.addEventListener('click', function () {
                    tr = this.parentNode.parentNode
                    innner_filename = tr.getAttribute('data-inner_filename')
                    if (!window.confirm('削除しますか？')) {
                        return
                    }

                    //storageからの削除
                    firebase.storage().ref().child(innner_filename).delete().then(function () {
                        console.log('object successfully deleted')
                        tr.outerHTML = ''
                    }).catch(function (error) {
                        console.log("Error removing object: ", error)
                    });

                    //DBからの削除
                    id = tr.getAttribute('data-id')
                    db.collection("obj").doc(id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });

                })
            }


            main_body.appendChild(tr)
        }
    }
    if (loader) {
        loader.style.display = 'none'
    }
}
