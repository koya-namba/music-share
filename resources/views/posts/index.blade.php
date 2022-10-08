<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Musci Share</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <h1>一覧ページ</h1>
        <div class='create'>
            [<a href='/music_posts/create'>create</a>]
        </div>
        <div class='posts'>
            @foreach ($music_posts as $music_post)
                <div class='post'>
                    <h2 class='title'>
                        タイトル：
                        <a href="/music_posts/{{ $music_post->id }}">
                            {{ $music_post->title }}
                        </a>
                    </h2>
                    <p>パス：{{ $music_post->audio_path }}</p><br />
                    <audio controls src={{ $music_post->audio_path }} id="audio"></audio><br />
                </div>
            @endforeach
        </div>
    </body>
</html>
