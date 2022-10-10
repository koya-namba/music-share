<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MusicPost;
// S3を使うために必要
use Storage;

class MusicPostController extends Controller
{
    public function index(MusicPost $music_post)
    {
        return view('posts/index')->with(['music_posts' => $music_post->get()]);
    }
    
    public function create()
    {
        return view('posts/create');
    }
    
    public function store(Request $request, MusicPost $music_post)
    {
        // titleを入れる
        $music_post->title = $request['title'];
        
        //s3アップロード開始
        $audio = $request->file('audio');
        // バケットの`myprefix`フォルダへアップロード
        $path = Storage::disk('s3')->putFile('myprefix', $audio, 'public');
        // アップロードしたaudioのフルパスを取得
        $music_post->audio_path = Storage::disk('s3')->url($path);

        // $music_postにはtitleとaudio_pathが入っている
        $music_post->save();
        
        return redirect('/');
    }
    
    public function show(MusicPost $music_post)
    {
        return view('posts/show')->with(['music_post' => $music_post]);
    }
    
    public function edit(MusicPost $music_post)
    {
        return view('posts/edit')->with(['music_post' => $music_post]);
    }
    
    public function update(MusicPost $music_post, Request $request)
    {
        $music_post->title = $request['title'];
        $music_post->memo = $request['memo'];
        $music_post->save();
        
        return redirect('/music_posts/' . $music_post->id);
    }
}
