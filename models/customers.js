var mongoose=require('mongoose');
var customerSchema = new mongoose.Schema({
	cFname: String,
	cLname: String,
	ccNumber: Number,
	ccExpDate: Number,
	ccCode: Number,
	BtoAddr: String,
	BtoCity: String,
	BtoState: String,
	BtoZip: Number,
	BtoCountry: String,
	StoAddr: String,
	StoCity: String,
	StoState: String,
	StoZip: Number,
	StoCountry: String,
	cPhone: Number,
	customerID: String
},{collection:'customers'});
var customer= mongoose.model('Customers', customerSchema);
module.exports={
	customer:customer
}
