<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'MusicPostController@index');
Route::get('/music_posts/create', 'MusicPostController@create');
Route::post('/music_posts', 'MusicPostController@store');
Route::get('/music_posts/{music_post}', 'MusicPostController@show');
Route::get('/music_posts/{music_post}/edit', 'MusicPostController@edit');
Route::put('/music_posts/{music_post}', 'MusicPostController@update');
