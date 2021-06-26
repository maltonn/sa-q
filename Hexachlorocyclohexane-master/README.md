# Tetractan
![image](https://user-images.githubusercontent.com/34613945/111903328-1dca1b00-8a85-11eb-8e97-ffec73775573.png)

勉強会やハッカソンをきっかけに人とつながるアプリ
[発表スライド](https://docs.google.com/presentation/d/1Q1Cl6d2ZDm0-_MmOnjn0BzZZG4a6ysyN17_dZAvXDrk/edit#slide=id.gc93c1fd92e_7_462)

## これは何？
サポーターズの主催する「初めてのハッカソン」の成果物です。
開発期間（時間？）は睡眠含めてほぼ24時間でした。

## How to use
1. Flaskのインストール
2. static/js/config.jsにfirebaseConfigを追加
```
var firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxx",
  projectId: "your-app-id",
  storageBucket: "your-app-id.appspot.com",
  messagingSenderId: "000000000",
  appId: "1:00000000000:web:ffffffffffffffffff",
  measurementId: "X-XXXXXXXX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
db = firebase.firestore();
```

3. ```app.py```を実行した後にlocalhost:5000にアクセス


## screenshots

![image](https://user-images.githubusercontent.com/34613945/111903315-130f8600-8a85-11eb-988b-9b75d1c4d91e.png)
![image](https://user-images.githubusercontent.com/34613945/111903322-14d94980-8a85-11eb-8ae0-b00a17836e8e.png)
