/*
params = {}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}
*/



window.onload = ()=>{
    L=[]
    db.collection("obj").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            L.push(doc.data())
        });
        MakeTable(L)
    });
}

function MakeTable(data) {
    // tmp = []

    // for (d of data) {
    //     for (key of Object.keys(d)) {
    //         if (key != 'primary_key' && key != 'sid') {
    //             tmp.push(key)
    //         }
    //     }
    // }
    // st = new Set(tmp)
    // keys_lst = [...st.values()]

    keys_lst=['title','filename','username']    
    for (key of keys_lst) {
        th = document.createElement('th')
        th.innerText = key
        th.classList.add('uk-text-left')
        table_keys.appendChild(th)
    }
    for (d of data) {
        tr = document.createElement('tr')
        for (key of keys_lst) {
            td = document.createElement('td')
            td.innerText = d[key] || ''
            tr.appendChild(td)
        }
        main_body.appendChild(tr)
    }
    if(loader){
        loader.style.display='none'
    }
}
