
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
            L.push(doc.data())
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
            tr.appendChild(td)
        }
        if (flag) {
            main_body.appendChild(tr)
        }
    }
    if (loader) {
        loader.style.display = 'none'
    }
}
