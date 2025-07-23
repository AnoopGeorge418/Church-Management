const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  houseName: {
    type: String,
   
  },
  address: {
    type: String,
   
  },
  housepincode: {
    type: Number,  
    
  },active: {
    type: Boolean,
    default: true,
  },
  father: {
    name: {
      type: String,
      
    },
    baptism_name: {
      type: String,
     
    },
    age: {
      type: Number,  
      
    },
    dob: {
      type: Date,
      
    },
    phoneNumber: {
      type: String,
      
    },
    email: {
      type: String,
    },
    situation: {
      type: String,
      
    }, 
    status: {
      type: String,
    }, fatherPhoto: String,
    
  },
  mother: {
    name: {
      type: String,
      
    },baptism_name:{
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,  
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    situation: {
      type: String,
     
    },
    status: {
      type: String,
    },
    image:{
      type:Buffer,
    }
  },
  children: [
    {
      name: {
        type: String,
       
      },baptism_name:{
        type: String,
      },
      dob: {
        type: Date,
       
      },
      gender:{
        type: String, 
      },
      age: {
        type: String,  
      
      },
      phoneNumber: {
        type: String,
        
      },
      email: {
        type: String,
      },
      status: {
        type: String,
      },
      situation: {
        type: String,
      }, 
      
      wife: {
        name: {
          type: String,
        },
        baptism_name:{
          type: String,
        },
        dob: {
          type: Date,
          
        },
        age: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        email: {
          type: String,
        },
        situation: {
          type: String,
        }, 
      },
    },
  ],
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;