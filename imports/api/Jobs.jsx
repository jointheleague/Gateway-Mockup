var created = false;
var Jobs;

if(!created) {
  created = true;
  Jobs = new Mongo.Collection("jobs");
}

export default Jobs;
