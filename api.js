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


//get biggest number
router.route('/orderNumberBiggest').get((request,response)=>{

    dboperations.getBiggestOrderNumber().then(result => {
       response.status(200).json(result[0]);
    })

})

//add inventory
router.route('/inventory').post((request,response)=>{
   
   let inventoryData = {...request.body};

    dboperations.addInventory(inventoryData).then(result => {
       response.status(200).json(result);
    })

})

//Table filler Inventory
router.route('/getInformationInventory').get((request,response)=>{

    dboperations.getInformationInventory().then(result => {
       response.json(result[0]);
    })

})

//Table Filler Sales
router.route('/getInformationSales').get((request,response)=>{

    dboperations.getSalesInformation().then(result => {
      response.json(result[0]);
    })

})

//Table Filler Sales Ordernumber Data's
router.route('/getInformationForOrderNumber/:orderNumber').get((request,response)=>{

    dboperations.getOrderNumberInformation(request.params.orderNumber).then(result => {
      response.json(result[0]);
    })

})

//Table Filler Sales Customer Details of every Ordernumber Data's
router.route('/getCustomerDetailsForOrderNumber/:orderNumber').get((request,response)=>{

    dboperations.getDetailsOfCustomer(request.params.orderNumber).then(result => {
      response.json(result[0]);
    })

})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Retail management API is runnning at ' + port);



