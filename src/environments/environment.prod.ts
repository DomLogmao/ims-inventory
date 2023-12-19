// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const baseUrl = "";

export const environment = {
  production: false,
  pouchdb: "ims_web",
  authenticate: baseUrl + "/authenticate",
  users: baseUrl + "/api/users",
  /*
  items: baseUrl + "/api/items",
  report: baseUrl + "/api/report"
  */


  //REMOVE IF BACKEND IS UP
  usersTemp: '/assets/data/static/user.json',
  productTemp: '/assets/data/static/products.json',
  userDetailsTemp: '/assets/data/static/userDetails.json'
  //REMOVE IF BACKEND IS UP
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
