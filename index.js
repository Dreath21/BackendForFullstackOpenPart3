require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')

const app = express()
morgan.token('body', (req, res) => {
return JSON.stringify(req.body);
});

app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
let persons = [
{
"id": "1",
"name": "Arto Hellas",
"number": "040-123456"
},
{
"id": "2",
"name": "Ada Lovelace",
"number": "39-44-5323523"
},
{
"id": "3",
"name": "Dan Abramov",
"number": "12-43-234345"
},
{
"id": "4",
"name": "Mary Poppendieck",
"number": "39-23-6423122"
}
]

app.get('/api/persons', (request, response)=>{
Person.find({}).then(
  result =>{
    response.json(result)
  }
  )
})

app.get('/api/persons/:id', (request, response)=>{
const id = request.params.id
const person = persons.find(p => p.id === id)
if (!person){
response.status(404).end()
}
response.json(person)
})

app.delete('/api/persons/:id', (request, response)=>{
Person.findById(request.params.id).then(person=>{
  if(!person){
    response.status(404).end()
  }
  response.json(person)
}).catch(error=>{
  console.log(error)
  response.status(400).send({error:"malformatted ID"})
})
})


const genID = () =>{
return String((Math.random()*1000000000000).toFixed(0))
}
app.post('/api/persons', (request, response) => {
const person = request.body//{"content":{"name":"Name", "number": "678543"}}

if (!person.name) {
return response.status(400).json({
error: 'name missing'
})}
Person.findById(request.params.name).then(person=>{
  if(person)response.status(404).json(
      { error: 'name must be unique' }
    )
  }
)
if (!person.number){
return response.status(400).json({error: 'number missing'})
}

const personAdd = new Person({
id: genID(),
name: person.name,
number: person.number
})

personAdd.save().then(result=>{
  console.log("added ", result.name, " number ", result.number, "to phonebook")
})
response.json(personAdd)
})
/*
*curl -i -X POST http://localhost:3001/api/persons -H "Content-Type: application/json" -d '{"name": "John", "number": "72829"}'
*/



const PORT = process.env.PORT
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})