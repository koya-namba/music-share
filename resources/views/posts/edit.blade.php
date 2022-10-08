<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Musci Share</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <h1>編集ページ</h1>
        <form action="/music_posts/{{ $music_post->id }}" method="POST"  enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="title">
                <h3>Title</h3>
                <input type="text" name="title" value='{{ $music_post->title }}' />
            </div>
            <div class="memo">
                <h3>Memo</h3>
                <textarea name='memo'>{{ $music_post->memo }}</textarea>
            </div>
            <div class="audio">
                <h3>音声ファイル</h3>
                <audio controls src={{ $music_post->audio_path }} id="audio"></audio><br />
            </div>
            <input type="submit" value="保存"/>
        </form>
        <div class='back'>
            <a href='/music_posts/{{ $music_post->id }}'>詳細に戻る</a>
        </div>
    </body>
</html>
