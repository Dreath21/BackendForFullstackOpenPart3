const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', (req, res) => {
return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
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
response.json(persons)
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
const id = request.params.id
persons = persons.filter(person => person.id !== id)

response.status(204).end()
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
if (persons.find(p => p.name == person.name)){
return response.status(404).json({ error: 'name must be unique' })
} else if (!person.number){
return response.status(400).json({error: 'number missing'})
}

const personAdd = {
id: genID(),
name: person.name,
number: person.number
}

persons = persons.concat(personAdd)
response.json(personAdd)
})
/*
*curl -i -X POST http://localhost:3001/api/persons -H "Content-Type: application/json" -d '{"name": "John", "number": "72829"}'
*/



const PORT = 3001
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})