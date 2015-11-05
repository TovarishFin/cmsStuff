/*things that need to be done...
	easy things
		get the login system working
		segment out routes to different subroutes
			reqAuth
			noAuth
	hard things
		create a way to remotely send orders from template
			uhhhh just create post handlers??? lol???
		create way to track affiliate orders from template
			should just be attached in order being sent to post handler
		make things pretty?
		make some reports available
		properly test the tracking checker... use work tracking id.. why the fuck not...
		need to make db for retailers with usernames and passwords
			secure this shit with hashes?

*/	
//will this work to post orders to Tilaus Tori?
router.post('/retailerOrders',function(req,res){
	Retailers.findOne({retID:req.body.retID},function(err,retailer){
		if(retailer.retID){
			if(retailer.retPW==req.body.retPW){
				newOrder=new Order({
					retailerName: req.body.retID
					stuff: req.body.stuff
					stuff1: req.body.stuff1
				})
				newOrder.save(function(err,name){
					if(err){
						console.log(err);
					} else {
						console.log('retailer order saved');
					}
				});
			} else {
				console.log('authentication for retailer order failed');
			}
})
});
	
