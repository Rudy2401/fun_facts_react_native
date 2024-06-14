const awsconfig = {
  Auth: {
    region: 'us-east-1', // Your AWS region
    userPoolId: 'us-east-1_xx', // Your User Pool ID
    userPoolWebClientId: 'xx', // Your User Pool Web Client ID
    identityPoolId: 'us-east-1:9xx', // Your Identity Pool ID
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
