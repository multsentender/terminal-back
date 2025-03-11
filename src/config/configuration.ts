export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION || '1h',
  },

  polygon: {
    apiKey: process.env.POLYGON_API_KEY,
    wsUrl: process.env.POLYGON_WS_URL,
  },

  auth: {
    serverUrl: process.env.AUTH_SERVER_URL,
  },
});
