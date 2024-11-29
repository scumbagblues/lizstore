<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\Products\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Products/Categories/Index', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);
        
        Category::create($request->all());

        return redirect()->route('categories');
    }

    public function show(Category $category)
    {
        return Inertia::render('Categories/Show', ['category' => $category]);
    }

    public function edit($id)
    {   
        $category = Category::findOrFail($id);
        return Inertia::render('Products/Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->all());

        return redirect()->route('categories');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories');
    }    
}
