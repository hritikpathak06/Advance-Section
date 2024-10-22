const express = require("express");
require("dotenv").config();
const { RedisClient, connectRedis } = require("./config/redis"); 

const app = express();
const port = process.env.PORT || 3000;

connectRedis();

app.get("/set", async (req, res) => {
  try {
    await RedisClient.set("name", "John Doe");
    await RedisClient.set("roll no",12345)
    res.send("Data set successfully in Redis");
  } catch (error) {
    console.error("Error setting data in Redis:", error);
    res.status(500).send("Error setting data in Redis");
  }
});

app.get("/get", async (req, res) => {
  try {
    const value = await RedisClient.get("name");
    const roll = await RedisClient.get("roll no")
    res.send(`The value for 'name' in Redis is: ${value} and the roll no is ${roll}`);
  } catch (error) {
    console.error("Error getting data from Redis:", error);
    res.status(500).send("Error getting data from Redis");
  }
});

app.listen(port, () => {
  console.log(`Server running on localhost port: ${port}`);
});
