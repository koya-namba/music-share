<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MusicPost;

class MusicPostController extends Controller
{
    public function index(MusicPost $music_post)
    {
        return view('posts/index')
        ->with(['music_posts' => $music_post->getPaginateByLimit()]);
    }
    
    public function show(MusicPost $music_post)
    {
        return view('posts/show')
        ->with(['music_post' => $music_post]);
    }
    
    public function create()
    {
        return view('posts/create');
    }
    
    public function store(Request $request, MusicPost $music_post)
    {
        $input = $request['music_post'];
        dd($request->file('audio'));
        $audio = $input->file('audio');
        
        // $path = Storage::disk('s3')->putFile('')
    }
}
