const express = require("express");
require("dotenv").config();
const { RedisClient, connectRedis } = require("./config/redis");
const app = express();
const port = process.env.PORT || 3000;
connectRedis();

app.get("/set", async (req, res) => {
  try {
    await RedisClient.set("name", "John Doe");
    await RedisClient.set("roll no", 12345);
    res.send("Data set successfully in Redis");
  } catch (error) {
    console.error("Error setting data in Redis:", error);
    res.status(500).send("Error setting data in Redis");
  }
});

app.get("/get", async (req, res) => {
  try {
    const value = await RedisClient.get("name");
    const roll = await RedisClient.get("roll no");
    res.send(
      `The value for 'name' in Redis is: ${value} and the roll no is ${roll}`
    );
  } catch (error) {
    console.error("Error getting data from Redis:", error);
    res.status(500).send("Error getting data from Redis");
  }
});

app.get("/products", async (req, res) => {
  try {
    const cacheExists = await RedisClient.exists("products");

    if (cacheExists) {
      // const cachedProducts = await RedisClient.get("products");
      const deletedProducts = await RedisClient.del("products");
      // const products = JSON.parse(cachedProducts);
      return res.json({
        msg: "Getting data from Redis cache",
        //   products,
        deletedProducts,
      });
    }

    const getProductPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Product1",
            price: 5000,
          },
          {
            id: 2,
            name: "Product2",
            price: 3000,
          },
        ]);
      }, 400);
    });

    const products = await getProductPromise;

    //   await RedisClient.set("products", JSON.stringify(products));
    await RedisClient.setEx("products", 10, JSON.stringify(products));
    res.json({
      msg: "Getting data from the database",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on localhost port: ${port}`);
});
