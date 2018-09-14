const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    //Number of the bus
    number : {
      type : Number,
      required : true
    },
    //Bus stops for a specific bus
    stops : {
      type : [[{name: String, lat: Number,lng:Number}]],
      required : false
    },
    route : {
      type : [],
      required : false
    },
    schedule : {
        type : [{name:String,time:[]}],
        require : false
    }
  });

  const Bus = module.exports = mongoose.model('Bus',busSchema);