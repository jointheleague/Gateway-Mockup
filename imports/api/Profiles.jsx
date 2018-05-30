var created = false;
var Profiles;

if(!created) {
  created = true;
  Profiles = new Mongo.Collection("profiles");
}

export default Profiles;
