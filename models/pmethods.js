var mongoose=require('mongoose');
var pMethodSchema = new mongoose.Schema({
	type: String
},{collection:'pMethods'});
var  pMethod= mongoose.model('pMethods', pMethodSchema);
module.exports={
	pMethod:pMethod
}
