<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $search = request('search', false);
        $perPage = request('per_page', 10);

        $query = Product::query();
        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{search}%");
        }

        return ProductListResource::collection($query->paginate($perPage));
    }


    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());

        return new ProductResource($product);
    }


    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $updatedProduct = $product->update($request->validated());

        return new ProductResource($updatedProduct);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
