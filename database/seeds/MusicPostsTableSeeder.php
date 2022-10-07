<?php

use Illuminate\Database\Seeder;

class MusicPostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('music_posts')->insert([
            'title' => 'Audio1',
            'audio_path' => 'https://lev-backet.s3.ap-northeast-1.amazonaws.com/myprefix/uHf9ZDEs76LszcZZ8GFS2ZLWXJPGsa1AXJ6gzxCl.wav',
        ]);
    }
}
