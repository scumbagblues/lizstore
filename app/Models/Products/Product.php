<?php

namespace App\Models\Products;

use App\Models\Products\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description', 'price', 'stock','category_id'];

    protected $appends = ['catname'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getCatnameAttribute()
    {
        return $this->category ? $this->category->name : null;
    }

}
