var mongoose=require('mongoose');
var orderSchema = new mongoose.Schema({
	itemName: String,
	pMethod: String,
	itemPrice: Number,
	orderStatus: Number,
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
	orderID: String,
	cPhone: Number,
	tNum: String,
	sLabel: String,
},{collection:'orders'});
var order= mongoose.model('Orders', orderSchema);
module.exports={
	order:order
}
