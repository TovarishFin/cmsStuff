var mongoose=require('mongoose');
var productSchema = new mongoose.Schema({
	prodName: String,
	prodCode: String,
	prodPrice: Number
},{collection:'products'});
var product= mongoose.model('Products',productSchema);
module.exports={
	product:product
}
