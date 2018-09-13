const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    //Number of the bus
    number:{
      type : Number,
      required: true
    },
    //Bus stops for a specific bus
    stops:{
      type : [{name: String, lat: Number,lon:Number}],
      required : true
    },
    schedule:{
        type : [{name:String,time:[]}],
        require : true
    }
  });

  const bus = module.exports = mongoose.model('Bus',busSchema);