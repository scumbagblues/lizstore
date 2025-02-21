<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\Products\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{   

    protected $catImage = 'path_category_img';

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
            'name' => 'required|string|max:255|unique:categories,name,NULL,id,deleted_at,NULL',
            'path_category_img' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile($this->catImage)) {
            $categoryName = $this->generateImageName($data['name']);
            $file = $request->file($this->catImage);
            $filename = "{$categoryName}." . $file->getClientOriginalExtension();
            $path = $file->storeAs('categories', $filename, 'public');
            $data[$this->catImage] = $path;
        }
        
        Category::create($data);

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
            'name' => 'required|string|max:255|unique:categories,name,' . $id . ',id,deleted_at,NULL',
            'path_category_img' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $category = Category::findOrFail($id);
        $data = $request->all();

    
            if ($request->hasFile($this->catImage)) {
                $categoryName = $this->generateImageName($data['name']);
                // Eliminar la imagen anterior si existe
                if ($category->{$this->catImage}) {
                    Storage::disk('public')->delete($category->{$this->catImage});
                }
                $file = $request->file($this->catImage);
                $filename = "{$categoryName}." . $file->getClientOriginalExtension();
                $path = $file->storeAs('categories', $filename, 'public');
                $data[$this->catImage] = $path;
            } else {
                $data[$this->catImage] = $category->{$this->catImage};
            }

        $category->update($data);

        return redirect()->route('categories');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->{$this->catImage}) {
            Storage::disk('public')->delete($category->{$this->catImage});
        }
        $category->delete();

        return redirect()->route('categories');
    }    

    protected function generateImageName(string $name)
    {   
        $name = $name . '_' . str()->random(5);
        return str_replace(' ', '_', $name);
    }
}
