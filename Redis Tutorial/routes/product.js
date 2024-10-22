const getProductPromise = new Promise((resolve, reject) => {
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
  }, 4000); 
});

module.exports = getProductPromise;
