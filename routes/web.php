<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\POS\SaleController;
use App\Http\Controllers\POS\POSAuthController;

use App\Http\Controllers\BrandController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/', function () {
//    return view('app');
//});



Route::prefix('admin')->group(function(){

    // get started
    Route::get('/', function () {
        return view('admin.auth.login');
    });

    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/logout',function() {
        Auth::logout();
        return redirect('/admin');
    });



        // For Admin Group
        Route::middleware(['check-admin-auth'])->group(function(){

            //users
            Route::resource('users',UserController::class); //user create

            //brands
            Route::resource('brands',BrandController::class); //CRUD
        });
});



Route::prefix('/pos')->group(function(){

    Route::get('/', [SaleController::class, 'index']);
    Route::get('/{any}', [SaleController::class, 'index'])->where('any', '.*');

 });


//protect by guest
Route::prefix('guest')->group(function(){
    Route::get('/{any}', [SaleController::class, 'index'])->where('any', '.*');
});


//protect by auth

Route::prefix('profile')->group(function(){
    Route::get('/{any}', [SaleController::class, 'index'])->where('any', '.*');
});





