const mongoose = require('mongoose');
const Person = require('./models/person');

let args = process.argv.slice(2);
//console.log("args:", args);

//When using mongodb, we dont need to worry about creating unique id's
//since mongo handles this for us!
if (args.length === 0) {
  console.log('puhelinluettelo:');

  Person.find({}).then(persons => {
    //console.log(persons.map(Person.format));

    persons.forEach(person => {
      console.log(person.name, person.number);
      //console.log(Person.format(person));
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: String(args[0]),
    number: String(args[1])
  });

  person.save().then(result => {
    console.log(
      `Lisätään henkilö ${result.name} numero ${result.number} luetteloon`
    );
    mongoose.connection.close();
  });
}
