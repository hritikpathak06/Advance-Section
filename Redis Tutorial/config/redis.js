const { createClient } = require("redis");

// Redis Connection
const RedisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Log Redis connection status
RedisClient.on("connect", () => {
  console.log("Redis client connected");
});

RedisClient.on("error", (err) => {
  console.log("Redis client connection error:", err);
});

// Connect to Redis
const connectRedis = async () => {
  try {
    if (!RedisClient.isOpen) {
      await RedisClient.connect();
      console.log("Successfully connected to Redis");
    }
  } catch (error) {
    console.error("Could not connect to Redis:", error);
  }
};

// Export both RedisClient and the connectRedis function
module.exports = { RedisClient, connectRedis };
