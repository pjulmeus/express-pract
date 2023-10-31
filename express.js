
const express = require('express');
const ExpressError = require('./expressError')

const app = express();



/// mean is sum of the array/lenghth of the array 

function mean(req){
    let sum = 0
    nums = req.params.nums.split(',').map(Number);
    console.log(nums)
    for(let n of nums){
        console.log(n)
        sum += n
        console.log(sum)
    }
total = sum/nums.length
console.log(total)
return total
}

/// mode is finding the most frequent number
function mode(req){

    let obj= {} 
    let max = -Infinity
    let objK = -Infinity
    
    nums = req.params.nums.split(',').map(Number);
    for(let n of nums){
        if(obj[n]) obj[n] += 1
        else obj[n] = 1
    }
  
    for(let key in obj){
            if(obj[key] > max){
                max = obj[key]
                objK = key
            }
        } 
     return objK
}


function median(req){
    nums = req.params.nums.split(",").sort((a, b) => a - b).map(Number);
    console.log(nums)
    console.log(nums.length)
    if(nums.length % 2 === 0){
       half = Math.floor(nums.length/2)
       console.log(half)
       console.log(nums[half])
       console.log(nums[half-1])
       amount = (nums[half] + nums[half- 1])/2
       return amount
    } else {
      half = Math.floor(nums.length/2)
      return nums[half]
    }
    
}


app.get('/mean/:nums', (req, res, next) =>{
try{
let num = req.params.nums.split(',')
    if (num.length) throw new ExpressError("No numbers in the query ", 404)
let word = (req.url)
    console.log(word)
    url = word.split("/")
    console.log(url[1])
total = mean(req)    
return res.json({operation: `${url[1]}`,
                        value : total})
} catch (e){
    next(e)
}

})


app.get('/mode/:nums', (req, res, next) =>{
try{
let num = req.params.nums.split(',')
console.log(num)
if (!num.length) throw new ExpressError("No numbers in the query ", 404)
    let word = (req.url)
    console.log(word)
    url = word.split("/")
    console.log(url[1])
total = mode(req)    
return res.json({operation: `${url[1]}`,
                        value : total})    
} catch (e){
    next(e)
}
})

app.get('/median/:nums', (req, res, next) =>{
try{
    let num = req.params.nums.split(',')
if (!num.length) throw new ExpressError("No numbers in the query ", 404)
    let word = (req.url)
    console.log(word)
    url = word.split("/")
    console.log(url[1])
total = median(req)    
return res.json({operation: `${url[1]}`,
                        value : total})

} catch(e) {
 next(e)
}

})



app.get('/all/:nums', (req, res, next) =>{
try {
    let num = req.params.nums.split(',')
if (!num.length) throw new ExpressError("No numbers in the query ", 404)
    let word = (req.url)
    console.log(word)
    url = word.split("/")
    console.log(url[1])

med = median(req)
mod = mode(req)   
means = mean(req)

return res.json({operation: `${url[1]}`,
                        mean: means, 
                    median : med, mode: mod})

} catch (e){
    next(e)
}

})

app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
  // generic error handler
  app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });
  // end generic handler
  app.listen(3000, function() {
    console.log('Server is listening on port 3000');
  });
