// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  backConnectorURL: 'http://localhost:3030',
  appUrl: 'http://localhost:8100',
  mercadopago: {
    public_key: 'TEST-0d2cfdf1-a9ce-43f5-b536-9ab85066a38b',
    access_token: 'TEST-2593962961382706-051614-5e8dcace04819d29b613ce777e0d35ed-436474213'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
