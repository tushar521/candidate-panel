// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // host: 'http://95.217.233.152',
  host: 'http://localhost',
  port: '3000',
  register: '/api/user/register',
  login: '/api/user/login',
  allProducts: '/api/user/products',
  getAllCategories: '/api/admin/fetch/categories',
  searchproduct: '/api/user/searchProduct',
  addToWishlist: '/api/user/add/favourite',
  removeFromWishList: '/api/user/remove/favourite',
  getProductById: '/product/:productId',
  addToCart: '/api/user/add/cart',
  myCart: '/api/user/my/cart',
  removeFromCart: '/api/user/remove/cart/:fav_id',
  myProfie: '/api/user/myprofile',
  changeProfilePicture: '/api/user/changeImage',
  updateProfile: '/api/user/update/:user_id',
  updateAddress: '/api/user/update/address/:addressId/:userId',
  processPayment: '/api/payment/v1/process/payment',
  forgotPassword: '/api/user/forgot-password',
  purchaseHistory: '/api/user/purchased',

  uploadFile: '/api/file/upload'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
