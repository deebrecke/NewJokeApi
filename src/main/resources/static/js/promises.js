
let promise = new Promise(function (resolve, reject){
    let num = prompt("Enter an numerator");
    let den = prompt("Enter a denominator");

    num = parseFloat(num);
    den = parseFloat(den);

    if(Number.isNaN(num) || Number.isNaN(den)){
        throw Error("User entered non-numerical value(s)");
    }
    if(den === 0){
        reject("Cannot divide by zero")
    }else{
        let result = num / den;
        resolve("Result is " + result);
    }
});

promise
    .then(function (success){
        console.log("The promise was successful")
        console.log(success)
    }, function (failure){
        console.log("The promise was unsuccessful")
        console.log(failure)
    })
    .catch(function (error){
        console.log("Something went wrong")
        console.log(error)
    });