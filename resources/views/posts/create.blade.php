<!DOCTYPE HTML>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Create Music</title>
        <!--cssの読み込み方-->
        <link type="text/css" rel="stylesheet" href="{{ secure_asset('css/sample.css') }}">
    </head>
    <body>
        <h1>作成ページ</h1>
        
        <button id="startBtn">Start</button>
        <button id="sound1">音1</button>
        <button id="sound2">音2</button>
        <button id="sound3">音3</button>
        <button id="stopBtn">Stop</button><br />
        
        <audio controls id="audio"></audio><br />
        <a id="download">Download</a>
        <button id="resetBtn">Reset</button>
        
        <h2>以下で音楽をDBに登録</h2>
        <form action="/music_posts" method="POST"  enctype="multipart/form-data">
            @csrf
            <div class="title">
                <h3>Title</h3>
                <input type="text" name="title" placeholder="タイトル"/>
            </div>
            <div class="audio">
                <h3>音声ファイル</h3>
                <!--inputタグのtypeを'file'にする-->
                <input id='audioFile' type="file" name="audio" />
            </div>
            <input type="submit" value="保存"/>
        </form>
        <div class="back">[<a href="/">一覧に戻る</a>]</div>
        <!--JSの読み込み方-->
        <script src="{{ mix('js/music.js') }}"></script>
    </body>
</html>
