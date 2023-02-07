const mongoose = require('mongoose')
 
   


var customerSchema = new mongoose.Schema({

    fname:{  
        type:String  
    },  
    lname:{  
        type:String  
    },  

    dateOB:{  
        type:Date  
    },  
    month:{  
        type:String  
    },  
    income:{  
        type:String  
    },  
    expenses:{  
        type:String  
    }
});
 
  
  
module.exports = mongoose.model('Customer',customerSchema); 
