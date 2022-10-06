<!DOCTYPE HTML>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Blog</title>
    </head>
    <body>
        <h1>Blog Name</h1>
        <button id="startBtn">Start</button>
        <button id="sound1">音1</button>
        <button id="sound2">音2</button>
        <button id="sound3">音3</button>
        <button id="stopBtn">Stop</button>
        <br />
        <audio controls id="audio"></audio>
        <button id="resetBtn">Reset</button>
        
        <form action="/music_posts" method="POST">
            @csrf
            <div class="title">
                <h2>Title</h2>
                <input type="text" name="music_post[title]" placeholder="タイトル"/>
            </div>
            <div class="audio">
                <h2>音声ファイル</h2>
                <input id='audioFile' type="file" name="music_post[audio]" />
            </div>
            <!--<div class="body">-->
            <!--    <h2>Body</h2>-->
            <!--    <textarea name="post[body]" placeholder="今日も1日お疲れさまでした。"></textarea>-->
            <!--</div>-->
            <input type="submit" value="保存"/>
        </form>
        <div class="back">[<a href="/">back</a>]</div>
        <script src="{{ mix('js/music.js') }}"></script>
    </body>
</html>