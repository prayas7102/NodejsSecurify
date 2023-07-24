function stepOne(callback) {
    setTimeout(function() {
      console.log("Step 1 completed");
      callback();
    }, 1000);
  }
  
  function stepTwo(callback) {
    setTimeout(function() {
      console.log("Step 2 completed");
      callback();
    }, 2000);
  }
  
  function stepThree(callback) {
    setTimeout(function() {
      console.log("Step 3 completed");
      callback();
    }, 1500);
  }
  
  stepOne(function() {
    stepTwo(function() {
      stepThree(function() {
        console.log("All steps completed!");
      });
    });
  });
  