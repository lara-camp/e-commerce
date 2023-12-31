<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use App\Models\product;
use App\Models\BuyToken;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;

class ProductApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return  Product::latest()
                        ->filter(request(['search', 'category', 'brand']))
                        ->paginate(6)
                        ->withQueryString();

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $rules = [
            'name' => ['required', 'max:255', Rule::unique('products', 'name')],
            'product_code' => ['required', 'numeric', Rule::unique('products', 'product_code')],
            'category_id' => ['required', Rule::exists('categories', 'id')],
            'brand_id' => ['required', Rule::exists('brands', 'id')],
            'description' => ['required'],
            'stock_qty' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
        ];

        $validator = Validator::make(request()->all(), $rules);

        if ($validator->fails()) {
            return $validator->errors();
        } else {
            $image_path =  request()->file('image') ? request()->file('image')->store('image', 'images') : null;
            $formData = [
                'name' => request()->name,
                'product_code' => request()->product_code,
                'category_id' => request()->category_id,
                'brand_id' => request()->brand_id,
                'image' => $image_path,
                'description' => request()->description,
                'stock_qty' => request()->stock_qty,
                'price' => request()->price
            ];

            $result = product::create($formData);
            if ($result) {
                return ['Result' => 'Data has been saved'];
            } else {
                return ['Result' => 'Operation Fail'];
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($productCode)
    {
        $product =  product::where('product_code', $productCode)->first()->load(['brand']);

        if (!$product) {
            return response()->json(['message' => 'brand not found'], 404);
        }

        // Return the product as a JSON response
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($productCode)
    {
        $product =  product::where('product_code', $productCode)->first();
        $rules = [
            'name' => ['required', 'max:255', Rule::unique('products', 'name')->ignore($product->product_code)],
            'product_code' => ['required', 'numeric', Rule::unique('products', 'product_code')->ignore($product->product_code)],
            'category_id' => ['required', Rule::exists('categories', 'id')],
            'brand_id' => ['required', Rule::exists('brands', 'id')],
            'description' => ['required'],
            'stock_qty' => ['required', 'numeric'],
            'price' => ['required', 'numeric']
        ];

        $validator = Validator::make(request()->all(), $rules);

        if ($validator->fails()) {
            return $validator->errors();
        } else {
            if (request()->hasFile('image')) {
                $image = request()->image;
                $fileName = date('Y') . $image->getClientOriginalName();
                $path = request()->image->storeAs('image', $fileName, 'images');
                $product['image'] = $path;
            }

            $result = $product->update(request()->all());

            if ($result) {
                return ['Result' => 'Data has been updated'];
            } else {
                return ['Result' => 'Operation Fail'];
            }
        }
    }
    // createToken for buying product
    public function createToken(Product $product)
    {

        $token = Str::random(30);

        $quantity = request("qty");

        $product->buyTokens()->create([
            "token" => $token,
            "qty" => $quantity,
            "price" => $quantity * $product->price,
            "expires_at" => Carbon::now()->addDay(),
        ]);

        return response()->json([
            "token" => $token,
        ],200);
    }

    // retrieve buying product by using token
    public function getBuyingProduct(BuyToken $token)
    {
        $buyingProduct = $token->product;
        return response()->json([
            "buyingProduct" => $token->load(["product"])
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $productCode)
    {
        // $product =  product::where('product_code', $productCode)->first();
        $result = product::where('product_code', $productCode)->first()->delete();

        if($result){
            return ['Result' => 'Item has been deleted'];
        } else {
            return ['Result' => 'Operation Fail'];
        }
    }

    public function BestSellerProducts(){
        $bestSeller = Product::orderBy('score','desc')->take(5)->get();
        return response()->json([
            'message'=>'These are best seller products',
            'bestSeller'=>$bestSeller
        ]);
    }

    public function RandomProduct(){
        $randomProduct = Product::inRandomOrder()->take(3)->get();
        return response()->json([
            'random'=> $randomProduct,
        ],200);
    }
}

