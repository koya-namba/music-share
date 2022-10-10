# laravel6 × S3 × Web Audio API

フレームワークにlaravel6を用いて，音声ファイルの保存をS3，簡単な音作成にWea Audio APIを用いる．

## 目次
1. AWSのS3の設定
2. laravelを書く
3. JS/cssを書く

## 参考
S3の設定の参考
- [S3の設定・アップロード方法](https://notepm.jp/sharing/b51bf504-3032-407b-b520-0c73e0c25f70)
- [Rails, Laravel(画像アップロード)向けAWS(IAM:ユーザ, S3:バケット)の設定](https://qiita.com/nobu0717/items/4425c02157bc5e88d7b6)
- [LaravelでAWS S3へ画像をアップロードする](https://qiita.com/nobu0717/items/51dfcecda90d3c5958b8)

JS/cssに関する参考
- [Laravel で JavaScriptをやるときの手法](https://qiita.com/ntm718/items/fed0e1060557a4e28ef3)
- [Laravel日記2 - CSSを適用してみる-](https://qiita.com/kotsuban-teikin/items/9b00d0faa0b7eaf70796)
- [Laravelのアセットに関するTips](https://qiita.com/sakuraya/items/411dbc2e1e633928340e)

## コードを確認する場所
この後色々説明するが全部のコードを載せないので，詳しくは以下を確認．
- app/Http/Controllers/MusicPostController.php
- database/migrations/2022_10_06_013454_create_music_posts_table.php
- resources/views/posts/index.blade.php
- resources/views/posts/create.blade.php
- resources/views/posts/show.blade.php
- resources/views/posts/edit.blade.php
- routes/web.php
- resources/js/music.js
- webpack.mix.js
- public/css/sample.css

## 説明

### AWSのS3の設定

S3の設定は[S3の設定・アップロード方法](https://notepm.jp/sharing/b51bf504-3032-407b-b520-0c73e0c25f70)
を参考にしてください！  
実際に試して，S3にファイルが保存されていることを確認してください！

### laravel6

#### DBを確認
music_posts_tableを確認すると，今回マストで必要なのは，
- title
- audio_path

です．audio_pathにはS3に保存したファイルを表示するpathを保存します．

#### 保存処理
create.blade.phpを確認します．ポイントは
```php
<form action="/music_posts" method="POST"  enctype="multipart/form-data">
```
のようにformタグにenctype="multipart/form-data"を追加することと，
```php
<input id='audioFile' type="file" name="audio" />
```
ファイルを保存するためにinputタグのtypeを'file'にすることです．

次にMusicPostControllerを見ます．
```php
use Storage;
```
を追記します．

そして，storeメソッドを見ます．  
$music_postにはtitleとaudio_pathがマストなのでこの2つを必ず入れてDBに保存します．  
まずはtitleだけ取り出して，$music_postに代入しましょう！
```php
$music_post->title = $request['title'];
```
次にファイルを保存していきますが，ファイル自体はS3に保存し，そのパスをaduio_pathに代入しましょう！
```php
//s3アップロード開始
$audio = $request->file('audio');
// バケットの`myprefix`フォルダへアップロード
$path = Storage::disk('s3')->putFile('myprefix', $audio, 'public');
// アップロードしたaudioのフルパスを取得
$music_post->audio_path = Storage::disk('s3')->url($path);
```
最後に$music_postにはtitleとaudio_pathが代入されているため，DBに登録しましょう！
```php
$music_post->save();
```

#### ファイルを表示する
先ほどまででDBへの保存はできたので，後は表示をしましょう！  
MusicPostControllerのindexメソッド少し覗きます．
```php
return view('posts/index')->with(['music_posts' => $music_post->get()]);
```
となっているので，これはカリキュラム通りです．．．

さて，index.blade.phpを見ます．  
ポイントはaudioタグのsrcに$music_postのaudio_pathを渡しているところです．
```php
<audio controls src={{ $music_post->audio_path }} id="audio"></audio>
```
ファイルを表示するためにはDBに保存されているpathをsrcに代入するだけでOKです！

簡単にはなりますが以上でファイルをS3に保存して，blade.phpに表示する方法を説明になります．

### JS/css
JSやcssの書き方やhtmlへ読み込み方を説明します！

#### 事前準備
以下のコマンドを実行しましょう！

```bash
npm install
npm run dev
```

#### JS
JSを記入する場所は，resources/jsフォルダの中身です！  
ここに適当にファイル(resources/js/hoge.js)を作成して，JSを書いていきましょう！

JSファイルを記入したら，webback.mix.jsに追記をします．
```js
mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/hoge.js', 'public/js')  // 追加
    .sass('resources/sass/app.scss', 'public/css');
```
これで準備OKです！

JSファイルを変更した際には，必ず
```bash
npm run dev
```
を実行しましょう！

最後にcreate.blade.phpを見ます．JSを追加するには<body>タグの一番最後に，
```php
<script src="{{ mix('js/music.js') }}"></script>
```
を追記しましょう！これでJSファイルを実行できます！

#### css
```bash
npm install
npm run dev
```
を実行すると，public/cssフォルダが追加されているはずです！  
この中にpublic/css/fuga.cssを作成して，cssファイルを書いていきましょう！

そして，create.blade.phpを確認します！
```php
<link type="text/css" rel="stylesheet" href="{{ secure_asset('css/fuga.css') }}">
```
を<head>タグの中に追記することでcssを適用できます！

簡単になりますが，これでJS/cssについての説明を終わります．

## まとめ
すごい簡単な説明ですが，S3, JS, cssについてでした．．．
