<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Musci Share</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <h1>詳細ページ</h1>
        <div class='post'>
            <h2 class='title'>タイトル：{{ $music_post->title }}</h2>
            <p>メモ：{{ $music_post->memo }}</p>
            <p>バス：{{ $music_post->audio_path }}</p><br />
            <!--srcにaudio_pathを渡すとファイルを渡せる-->
            <audio controls src={{ $music_post->audio_path }} id="audio"></audio><br />
        </div>
        <div class='back'>
            <a href='/'>一覧に戻る</a>
            <a href='/music_posts/{{ $music_post->id }}/edit'>編集する</a>
        </div>
    </body>
</html>
