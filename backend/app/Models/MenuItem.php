<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['name', 'description', 'price', 'image', 'category_id', 'is_available'];

    public function category()
    {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }
}
