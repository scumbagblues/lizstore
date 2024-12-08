<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\Products\Category;
use App\Models\Products\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    
    protected $images = ['image1', 'image2', 'image3', 'image4', 'image5'];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $categories = Category::all();
        return Inertia::render('Products/Create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image4' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image5' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'published' => 'nullable|boolean',
        ]);

        $data = $request->all();
        $data['published'] = $request->has('published') ? $request->published : false;

        foreach ($this->images as $i => $image) {
            if ($request->hasFile($image)) {
                $productName = $this->generateImageName($data['name']);
                $file = $request->file($image);
                $filename = "{$productName}." . $file->getClientOriginalExtension();
                $path = $file->storeAs('products', $filename, 'public');
                $data[$image] = $path;
            }
        }
        Product::create($data);

        return redirect()->route('products');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image4' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image5' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'published' => 'nullable|boolean',
           
        ]);

        $product = Product::findOrFail($id);
        $data = $request->all();
        $data['published'] = $request->has('published') ? $request->published : false;

        foreach ($this->images as $i => $image) {
            if ($request->hasFile($image)) {
                $productName = $this->generateImageName($data['name']);
                // Eliminar la imagen anterior si existe
                if ($product->{$image}) {
                    Storage::disk('public')->delete($product->{$image});
                }
                $file = $request->file($image);
                $filename = "{$productName}." . $file->getClientOriginalExtension();
                $path = $file->storeAs('products', $filename, 'public');
                $data[$image] = $path;
            } else {
                $data[$image] = $product->{$image};
            }
        }
       

        $product->update($data);

        return redirect()->route('products');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        foreach ($this->images as $i => $image) {
            if ($product->{"image$i"}) {
                Storage::disk('public')->delete($product->{"image$i"});
            }
        }
        $product->delete();

        return redirect()->route('products');
    }

    protected function generateImageName(string $name)
    {   
        $name = $name . '_' . str()->random(5);
        return str_replace(' ', '_', $name);
    }
}
