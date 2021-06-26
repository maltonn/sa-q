//ログイン
email='hoge@example.com'
password='qwertyws'
callback=(user_data)=>{
    console.log('callbacked')
}
SignIn(email,password,callback)


//データベース登録
dic={
    'email':'hoge@example.com',
    'user':'HOGE',
    'content':'hello world!'
}
method='add'// or scan
callback=(res)=>{
    console.log('callbacked 2')
}

method='add'
Send(method,dic,callback)

