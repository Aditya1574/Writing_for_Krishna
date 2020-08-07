//jshint esversion: 6

module.exports.getDate = function() {
  let today = new Date();

  var options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  }

  return today.toLocaleDateString("en-US", options);


}

module.exports.getDay = function(){

  let today = new Date();

  var options = {
    weekday: "long",

  }

  return today.toLocaleDateString("en-US", options);

}
