
const dataObj =  require("./data.js") ; 

const mongoose = require('mongoose');

const listingModel = require("../models/listing")  ;

const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust" ;

let initialize1 =  async () =>{
    mongoose.connect(mongoUrl);
};

initialize1()
.then( ()=>
{
    console.log("Connection has made at index1.js file!") ;
})
.catch((err)=>{
    console.log("There is a error") ;
});


let initdata = async() =>
{
    await listingModel.deleteMany({}) ;

    await listingModel.insertMany(dataObj.data) ;

}

initdata()
.then((res) =>
{
    console.log("data added successfully in index1.js file")
})
.catch((err)=>{
    console.log("There is a error at index1.js") ;
    console.log("error at index1.js : " , err) ;
})

