var Db  = require('./dboperations');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

//add order
router.route('/orders').post((request,response)=>{
   
   let order = {...request.body};

    dboperations.addOrder(order).then(result => {
       response.status(200).json(result);
    })

})

//add inventory
router.route('/inventory').post((request,response)=>{
   
   let inventoryData = {...request.body};

    dboperations.addInventory(inventoryData).then(result => {
       response.status(200).json(result);
    })

})

//Table filler
router.route('/getInformationInventory').get((request,response)=>{

    dboperations.getInformationInventory().then(result => {
       response.json(result[0]);
    })

})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Retail management API is runnning at ' + port);



