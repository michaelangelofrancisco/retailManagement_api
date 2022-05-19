var config = require('./dbconfig');
const sql = require('mssql');

//add order to the dashboard
async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let addingOrder = await pool.request()
            .input('orderNumber', sql.VarChar, order.orderNumber)
            .input('productName', sql.VarChar, order.productName)
            .input('price', sql.Decimal, order.price)
            .input('size', sql.VarChar, order.size)
            .input('quantity', sql.Int, order.quantity)
            .input('payment', sql.Decimal, order.payment)
            .input('date', sql.DateTime, order.date)
            .input('staff', sql.NVarChar, order.staff)
            .query('INSERT INTO Dashboard (OrderNumber, productName, price, size, quantity, payment, date, staff) VALUES (@orderNumber, @productName, @price, @size, @quantity, @payment, @date, @staff);');
        return addingOrder.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//add new product to the Inventory
async function getBiggestOrderNumber() {

    try {
        let pool = await sql.connect(config);
        let biggest = await pool.request()
            .query('SELECT MAX(OrderNumber) AS max_order_number FROM Dashboard');
        return biggest.recordset;
    }
    catch (err) {
        console.log(err);
    }

}

//add new product to the Inventory
async function addInventory(inventoryData) {

    try {
        let pool = await sql.connect(config);
        let addingInventory = await pool.request()
            .input('productInvName', sql.VarChar, inventoryData.productInvName)
            .input('productInvPrice', sql.Decimal, inventoryData.productInvPrice)
            .input('productInvSize', sql.VarChar, inventoryData.productInvSize)
            .input('productInvQuantity', sql.Int, inventoryData.productInvQuantity)
            .input('productInvDate', sql.Date, inventoryData.productInvDate)
            .query('INSERT INTO Inventory (productInvName, productInvPrice, productInvSize, productInvQty, productInvDate) VALUES (@productInvName, @productInvPrice, @productInvSize, @productInvQuantity, @productInvDate);');
        return addingInventory.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//getting Information from Database "Inventory"
async function getInformationInventory() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Inventory");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//getting Information from Database for "Sales Table"
async function getSalesInformation() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT OrderNumber, date, staff FROM Dashboard GROUP BY OrderNumber, date, staff ");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//getting Information from Database for "Order Number Individual"
async function getOrderNumberInformation(orderNumber) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()      
        .input('orderNumber', sql.Int, orderNumber)
        .query("SELECT productName, price, size, quantity, status, date, staff FROM Dashboard WHERE OrderNumber = @orderNumber;");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//getting customer details from Database for "Order Number Individual" Sales
async function getDetailsOfCustomer(orderNumber) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()      
        .input('orderNumber', sql.Int, orderNumber)
        .query("SELECT DISTINCT OrderNumber, firstname, lastname, address, number, payment, price FROM Dashboard WHERE OrderNumber = @orderNumber;");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    addOrder : addOrder,
    addInventory : addInventory,
    getInformationInventory : getInformationInventory,
    getBiggestOrderNumber: getBiggestOrderNumber,
    getSalesInformation: getSalesInformation,
    getOrderNumberInformation: getOrderNumberInformation,
    getDetailsOfCustomer:getDetailsOfCustomer
}

