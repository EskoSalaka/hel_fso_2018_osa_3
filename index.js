const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(bodyParser.json());
morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status Request body: :body - :response-time ms'));
app.use(express.static('working_frontend/build'));

function isFalseString(str) {
  if (!str || str.length == 0 || !str.trim()) {
    return true;
  } else {
    return false;
  }
}

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      let len = 0;
      if (persons) {
        len = persons.length;
      }
      res.send(`<div>
              <h3>Puhelinluettelossa ${len} nimeä</h3>
              <h3>${new Date()}</h3>
            </div>`);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(Person.format));
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(Person.format(person));
      } else {
        console.log(404);
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Something wrong with the supplied id' });
    });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Something wrong with the supplied id' });
    });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (isFalseString(body.name) || isFalseString(body.number)) {
    return res.status(400).json({
      error:
        'Posted missing or empty attributes. attributes "name" and "number" must be supplied'
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  Person.findOne({ name: newPerson.name })
    .then(result => {
      if (result) {
        console.log('Already exists');
        return res.status(422).json({
          error:
            'Posted "name" is already in the database. Use PUT if you want to update the contacts.'
        });
      } else {
        newPerson
          .save()
          .then(savedPerson => {
            res.json(Person.format(savedPerson));
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/api/persons/:id', (req, res) => {
  const body = req.body;
  
  if (isFalseString(body.name) || isFalseString(body.number)) {
    return res.status(400).json({
      error:
        'PUT missing or empty attributes. attributes "name" and "number" must be supplied'
    });
  }

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson));
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Something wrong with the supplied id' });
    });
});

module.exports = app;
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
