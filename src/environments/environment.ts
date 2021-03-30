// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  url_processo_industrial:'http://api.tcc2021puc-luizsergio.cf/processoindustrial',
  url_websocket: 'http://api.tcc2021puc-luizsergio.cf/stomp',
  url_authentication:'http://api.tcc2021puc-luizsergio.cf/oauth',
  api_auth_token:'Basic Y2xpZW50SWQ6c2VjcmV0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
