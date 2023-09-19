
function getUser(userId, callback) {
    // Simulating an asynchronous operation to fetch user data
    setTimeout(() => {
      const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
      console.log('Fetched user:', user);
      callback(user);
    }, 1000);
  }
  
  function getOrders(userId, callback) {
    // Simulating an asynchronous operation to fetch user's orders
    setTimeout(() => {
      const orders = ['Order1', 'Order2', 'Order3'];
      console.log('Fetched orders:', orders);
      callback(orders);
    }, 1500);
  }
  
  function getOrderDetails(orderId, callback) {
    // Simulating an asynchronous operation to fetch order details
    setTimeout(() => {
      const orderDetails = { id: orderId, amount: 100, status: 'Delivered' };
      console.log('Fetched order details:', orderDetails);
      callback(orderDetails);
    }, 2000);
  }
  
  function processUserOrders(userId) {
    getUser(userId, (user) => {
      getOrders(user.id, (orders) => {
        for (const order of orders) {
          getOrderDetails(order, (orderDetails) => {
            console.log('Processing order:', orderDetails);
          });
        }
      });
    });
  }
  
  // Call the function with a user ID to start the callback hell
  processUserOrders(123);
  