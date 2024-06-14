// const awsconfig = {
//   Auth: {
//     region: 'us-east-1',
//     userPoolId: 'us-east-1_426YN0Yxw',
//     userPoolWebClientId: '5eq4vtt6omatba4hlmkkc68kgj',
//     authenticationFlowType: 'USER_SRP_AUTH',
//     oauth: {
//       domain: 'fun-facts-app.auth.us-east-1.amazoncognito.com',
//       scope: [
//         'phone',
//         'email',
//         'openid',
//         'profile',
//         'aws.cognito.signin.user.admin',
//       ],
//       redirectSignIn:
//         'https://fun-facts-app.auth.us-east-1.amazoncognito.com/oauth2/idpresponse',
//       redirectSignOut:
//         'https://fun-facts-app.auth.us-east-1.amazoncognito.com/logout',
//       responseType: 'code',
//     },
//   },
// };

// export default awsconfig;
// const awsmobile = {
//   aws_project_region: 'us-east-1',
//   aws_cognito_identity_pool_id:
//     'us-east-1:b3f6b61d-5542-4019-8900-9e35c2fb8169',
//   aws_cognito_region: 'us-east-1',
//   aws_user_pools_id: 'us-east-1_426YN0Yxw',
//   aws_user_pools_web_client_id: '5eq4vtt6omatba4hlmkkc68kgj',
//   oauth: {
//     domain: 'fun-facts-app.auth.us-east-1.amazoncognito.com',
//     scope: [
//       'phone',
//       'email',
//       'openid',
//       'profile',
//       'aws.cognito.signin.user.admin',
//     ],
//     redirectSignIn:
//       'https://fun-facts-app.auth.us-east-1.amazoncognito.com/oauth2/idpresponse',
//     redirectSignOut:
//       'https://fun-facts-app.auth.us-east-1.amazoncognito.com/logout',
//     responseType: 'code',
//   },
// };

// export default awsmobile;
const awsconfig = {
  Auth: {
    region: 'us-east-1', // Your AWS region
    userPoolId: 'us-east-1_UzyFXrdgr', // Your User Pool ID
    userPoolWebClientId: '744plnpl2irvocbc1eb0ah4plf', // Your User Pool Web Client ID
    identityPoolId: 'us-east-1:99d31f4c-68ed-4c9f-bf18-c3ba4f1df02b', // Your Identity Pool ID
    oauth: {
      domain: 'fun-facts-app.auth.us-east-1.amazoncognito.com', // Your Cognito domain
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'funfactapp://callback/', // Your app's redirect URL
      redirectSignOut: 'funfactapp://signout/', // Your app's signout URL
      responseType: 'code', // Authorization code grant flow
    },
  },
};
export default awsconfig;
