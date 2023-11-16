// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDFlWG431lDLUpUhMnvmJWi4Epzs5iX1G8",
    authDomain: "nuevo-d374b.firebaseapp.com",
    projectId: "nuevo-d374b",
    storageBucket: "nuevo-d374b.appspot.com",
    messagingSenderId: "142750961373",
    appId: "1:142750961373:web:76cdd4a48cfe651c415534",
    
  },
  apiUrl:"https://dev.matiivilla.cl/duoc/location/",
  recaptcha:{

    sitekey: "6LdAB_QoAAAAAFaLsSf4yxhlQCwAwEj8fn6fe1MI"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
