var created = false;
var Languages;

if(!created) {
  created = true;
  Languages = new Mongo.Collection("languages");
}

export default Languages;

// export default Languages = new Mongo.Collection("languages");
