# template-express-socketio-auth
Express+Socket.IO+認証システムのテンプレート

## Requirements
- Node v7.x
- MySQL

## Install
```
git clone https://github.com/Kait-tt/template-express-socketio-auth.git
cd template-express-socketio-auth
npm install
npm run build
mysql -uroot -p -e 'create database template_express_socketio_auth;'
```

## Usage
### Start the server
```
npm start
```

### Enable ssl
```
cp config/default.json config/development.json
# Change ssl.enabled to true, and set ssl.key and ssl.cert.
# e.g.,
# "ssl": {
#   "enabled": true,
#   "key": "c:/XAMPP/apache/conf/ssl.key/server.key",
#   "cert": "c:/XAMPP/apache/conf/ssl.crt/server.crt"
# }
```

## 構成

### ファイル構成

```
(root)
├── bin/www : Webサーバを起動する実行ファイル
├── config/ : コンフィグ群
│   └── default.json : デフォルトのコンフィグファイル
├── lib/ :  Webサーバのライブラリ群
│   ├── controllers/ : Controller
│   │   ├── auth.js : AuthController
│   │   └── index.js : IndexController (Top, 404, 500)
│   ├── modules/ : Modules
│   │   └── session.js : Sessionの共有・永続化モジュール
│   └── socket/ : ソケット通信のライブラリ群
│       ├── client.js : ソケット通信のクライアント
│       └── router.js : ソケット通信のルーティング
├── public/ : クライアントのソースコード
│   ├── dist/ : 配布用 (webpackにより生成される)
│   ├── images/ : 配布用イメージ
│   └── src/ : ソース
│       ├── js/ : JavaScript
│       │   └── entries/ : エントリーファイル群
│       │       └── top.js : トップページのエントリーファイル
│       └── scss/ : SCSS
├── views/ : ビューファイル群
│   ├── error.ejs : エラーページ
│   ├── index.ejs : トップページ
│   └── login.ejs : ログインページ
├── README.md
├── package.json
├── webpack.config.js
├── router.js : サーバのルーティング定義
└── app.js : Webアプリケーションの設定
```
