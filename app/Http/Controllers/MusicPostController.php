<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MusicPost;
use Storage;

class MusicPostController extends Controller
{
    public function index(MusicPost $music_post)
    {
        return view('posts/index')
        ->with(['music_posts' => $music_post->get()]);
    }
    
    public function create()
    {
        return view('posts/create');
    }
    
    public function store(Request $request, MusicPost $music_post)
    {
        $music_post->title = $request['title'];
        
        //s3アップロード開始
        $audio = $request->file('audio');
        // バケットの`myprefix`フォルダへアップロード
        $path = Storage::disk('s3')->putFile('myprefix', $audio, 'public');
        // アップロードしたaudioのフルパスを取得
        $music_post->audio_path = Storage::disk('s3')->url($path);

        $music_post->save();
        
        return redirect('/');
    }
}
