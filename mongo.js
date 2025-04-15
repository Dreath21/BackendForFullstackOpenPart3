const mongoose = require('mongoose');
if (process.argv.length < 3){
console.log("Give password as an arguments");
process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://sinevasankrishloren:${password}@cluster0.pxqj5fb.mongodb.net/personsApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personsSchema = new mongoose.Schema({
name: String,
number: String
})
const Person = mongoose.model("person", personsSchema
)


if(process.argv.length < 5){
  Person.find({}).then(result=>{
    console.log("Phonebook: ")
    result.forEach(rst =>{
      console.log(rst.name, " ", rst.number)
    })
    mongoose.connection.close()
  })
}else if(process.argv.length<6){
const person = new Person({
name: process.argv[3],
number: process.argv[4]
})

person.save().then(result=>{
console.log("added ", result.name, " number ", result.number, "to phonebook")
console.log("Additional----")
console.log("Save new Person", result)
console.log("id: ", result._id.toString())
console.log("Name: ", result.name)
console.log("PhoneNumber: ", result.number)
mongoose.connection.close()
})
}else{
  console.log("You did over do it...")
  mongoose.connection.close()
}