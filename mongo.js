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

/*Person.find({}).then(result=>{ result.forEach(note=>{console.log(note)})
* mongoose.connection.close()
})**/

const person = new Person({
name: "Aunty Cina",
number: "0599-722-0208"
})

person.save().then(result=>{
console.log("Save new Person", result)
console.log("id: ", result._id.toString())
console.log("Name: ", result.name)
console.log("PhoneNumber: ", result.number)

mongoose.connection.close()
})