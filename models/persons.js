const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log("Connecting to URL: ", url)
mongoose.connect(url).then(rst=>console.log("Connected to the Mongoose Succesfully")).catch(err=>{
  console.log(url)
  console.log("Connecting Unsuccessfully the problem: ", err.message)})

const personSchema = new mongoose.Schema({
  name:String,
  number:String
})

mongoose.set('toJSON',{
  transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("person", personSchema)