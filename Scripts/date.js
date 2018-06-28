var makeDate = function(){
  var d = new Date();
  var formattedDated = "";
  formattedDated += (d.getMonth() + 1)+ "_";

  formattedDated += d.getDate() + "_";

  formattedDated += d.getFullYear();

  return formattedDated;
};

module.exports = makeDate;