require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//////////////////////////////////////////////////////////////////////////////////
//CRUD Part I - CREATE
const personSchema = new Schema({
  name: {type: String, required: true}, age : Number, favoriteFoods: [String] 
});

const Person = mongoose.model('Person',personSchema);

////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
//Create and Save a Record of a Model
const createAndSavePerson = (done) => {

  const person = new Person({name: "Jatin", age:25, favoriteFoods: ["pizza","icecream"]});
  person.save(function(err,data){
  done(err,data);
    });
  };
////////////////////////////////////////////////////////////////////////////////
//Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err, data) => {

    done(err, data);

  });
  
};
/////////////////////////////////////////////////////////////////////////////////
//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name : personName},(err, data) => {
    done(err, data);
  });
  
};
////////////////////////////////////////////////////////////////////////////////
//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=> {
    done(err, data);
  });
 
};
/////////////////////////////////////////////////////////////////////////////////////
//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId,(err, data) => {
    done(err,data);
  });
  
};
/////////////////////////////////////////////////////////////////////////////////////
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err, data) => {
  data.favoriteFoods.push(foodToAdd);
  data.save((err,newData)=>{
    done(err,newData);

  })
  });
  
};
//////////////////////////////////////////////////////////////////////////////////////////
//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name : personName},{age : 20 } ,{ new: true}, (err, data) => {
  done(err,data);
});
  
};
///////////////////////////////////////////////////////////////////////////////////////////
//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data)=>{
    done(err, data);
  });
 
};
/////////////////////////////////////////////////////////////////////////////////////////////
//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name : nameToRemove}, (err,data)=> {
  done(err, data);
});
  
};
/////////////////////////////////////////////////////////////////////////////////////////////
//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch}).sort("name").limit(2).select(["name","favoriteFoods"]).exec((err, data) =>{
    done(err, data);
  });

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
