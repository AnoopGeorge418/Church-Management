const mongoose = require('mongoose');

const deathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
      housename: {
        type: String,
        required: true
      },
     baptismname: {
      type: String,
      required: true
      },
      age: {
        type: Number,
        required:true
      },
      confession: {
        type: String,
        required: true
      },
      Viaticum: {
        type: String,
        required: true
      },
      Anointing_of_sick: {
        type: String,
        required: true
      },
      sickness:{
        type: String,
        required: true
      },
      date_of_death: {
        type: Date,
        required:true
      },
      date_of_Burial: {
        type: Date,
        required:true
      },
      Parish_Priest:{
        type: String,
        required:true
      },
      Parish_name:{
        type: String,
        required:true
      },

});

const Death = mongoose.model('Death', deathSchema);

module.exports = Death;