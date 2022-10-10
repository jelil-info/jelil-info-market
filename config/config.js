const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mern-marketplaceCH7andCH8',
  stripe_connect_test_client_id: "stripeConnectTestClientId",
  stripe_test_secret_key: "stripeTestSecretKey",
  stripe_test_api_key: "stripeTestApiKey"
}

export default config

