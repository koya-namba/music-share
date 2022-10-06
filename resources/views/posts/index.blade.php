<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Blog</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <h1>Blog Name</h1>
        <div class='create'>
            [<a href='/music_posts/create'>create</a>]
        </div>
        <div class='posts'>
            @foreach ($music_posts as $mucis_post)
                <div class='post'>
                    <h2 class='title'>
                        <a href="/music_posts/{{ $music_post->id }}">
                            {{ $music_post->title }}
                        </a>
                    </h2>
                    <p class='body'>{{ $music_post->detail }}</p>
                </div>
            @endforeach
        </div>
        <div class='paginate'>
            {{ $music_posts->links() }}
        </div>
    </body>
</html>
