var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path       = require('path');
var XLSX       = require('xlsx');
var multer     = require('multer');

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//static folder path
app.use(express.static(path.resolve(__dirname,'public')));

const Customer  = require('./customerModel')



//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './views')


      
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  var upload = multer({ storage: storage });

//connect to db
mongoose.connect('mongodb+srv://tholakelebusi:12345@cluster0.blwxz.mongodb.net/test',{useNewUrlParser:true})
.then(()=>{console.log('connected to db')})
.catch((error)=>{console.log('error',error)});






app.get('/',(req,res)=>{
  // res.render('login'); -----making login page a landing page
   Customer.find((err,data)=>{
       if(err){
           console.log(err)
       }else{
           if(data!=''){
               res.render('home',{result:data});
             
           }else{
            this.results=result
             

            
           }
       }
   });
});

app.post('/',upload.single('excel'),(req,res)=>{
  var workbook =  XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  sheet_namelist.forEach(element => {
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist]);
      Customer.insertMany(xlData,(err,data)=>{
          if(err){
              console.log(err);
          }else{
        

            this.dataJson=data;
          
            console.log(this.dataJson)
           
          
            //   localStorage.setItem("Data"+data);
              //window.localStorage.getItem('user'); window.localStorage.clear();
          }
      })
  });
  res.redirect('/');
});



var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));