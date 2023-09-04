export const BASE_URL = "https://rxje2xzpme.us-east-1.awsapprunner.com/api/v1";
// export const BASE_URL = "http://localhost:4500/api/v1";

export default {
  // -----AUTH------//
  signUp: BASE_URL + "/user/signup",
  signIn: BASE_URL + "/user/testLogin",
  upload: BASE_URL + "/user/upload",
  sendOTP: BASE_URL + "/user/sendOTP",
  verifyOTP: BASE_URL + "/user/verify",
  forgotPassword: BASE_URL + "/user/forgotPassword",
  resetPassword: BASE_URL + "/user/resetPassword",
  verifyOTPresetPassword: BASE_URL + "/user/verifyOTPResetPassword",
  logOut: BASE_URL + "/user/logout",
  updateUser: BASE_URL + "/user",

  // -----------Products--------------//

  getProducts: BASE_URL + "/product/getAll?limit=1000",
  upDateProduct: BASE_URL + "/product/update",
  createProduct: BASE_URL + "/product/create",
  deleteProduct: BASE_URL + "/product/delete",
  allBookedProduct: BASE_URL + "/booking/allbookedproducts",

  // -----------Gallery--------------//

  getGallerys: BASE_URL + "/gallery/getAll?limit=1000",
  upDateGallery: BASE_URL + "/gallery/update",
  createGallery: BASE_URL + "/gallery/create",
  deleteGallery: BASE_URL + "/gallery/delete",
  // -------------Services-------------//

  getAllServices: BASE_URL + "/service/getall",
  createService: BASE_URL + "/service/create",
  deleteService: BASE_URL + "/service/delete",
  updateService: BASE_URL + "/service/update",
  allBookedServices: BASE_URL + "/booking/allbookedservices",

  // -------------Services-------------//
  getAllUser: BASE_URL + "/user",
  getState: BASE_URL + "/user/stats",
  getallReviews: BASE_URL + "/globalReviews/getall?limit=1000&sort=-createdAt",

  //-------------Tax---------------//
  getAllTax: BASE_URL + "/tax/getall",
  createTax: BASE_URL + "/tax/create",
  deleteTax: BASE_URL + "/tax/delete",
  updateTax: BASE_URL + "/tax/update",

  //-------------Schedule---------------//
  getAllSchedule: BASE_URL + "/schedule/getall",
  createSchedule: BASE_URL + "/schedule/create",
  deleteSchedule: BASE_URL + "/schedule/delete",
  updateSchedule: BASE_URL + "/schedule/update",

  //-------------Info---------------//
  getAllInfo: BASE_URL + "/info/getall",
  createInfo: BASE_URL + "/info/create",
  deleteInfo: BASE_URL + "/info/delete",
  updateInfo: BASE_URL + "/info/update",
};
