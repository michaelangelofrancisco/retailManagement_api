var config = require('./dbconfig');
const sql = require('mssql');

//add order to the dashboard
async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let addingOrder = await pool.request()
            .input('productName', sql.VarChar, order.productName)
            .input('price', sql.Decimal, order.price)
            .input('size', sql.VarChar, order.size)
            .input('quantity', sql.Int, order.quantity)
            .input('payment', sql.Decimal, order.payment)
            .input('date', sql.DateTime, order.date)
            .input('staff', sql.NVarChar, order.staff)
            .query('INSERT INTO Dashboard (productName, price, size, quantity, payment, date, staff) VALUES (@productName, @price, @size, @quantity, @payment, @date, @staff);');
        return addingOrder.recordsets;
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

module.exports = {
    addOrder : addOrder,
    addInventory : addInventory,
    getInformationInventory : getInformationInventory
}

