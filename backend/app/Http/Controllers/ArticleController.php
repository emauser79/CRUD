<?php

namespace App\Http\Controllers;

use App\Models\Article;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::all();
    }

    public function store(Request $request)
    {
        return Article::create($request->all());
 
    }

    public function show(Article $article)
    {
        return $article;
    }

    public function update(Request $request, Article $article)
    {
        $article->update($request->all());
        return $article;
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}



