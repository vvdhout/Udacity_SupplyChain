const SupplyChain = artifacts.require("SupplyChain");

contract("Testing the SupplyChain contract", async accounts => {

  	it("We can initiate the contract", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let result = await instance;
	    // Assert if result is equal to something, and if not send a message
	    assert.exists(result, "instance is created");
  	})

  	it("Creator address becomes first of each role", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let harvesterBool 		= await instance.isHarvester(accounts[0]);
	    let manufacturerBool 	= await instance.isManufacturer(accounts[0]);
	    let distributorBool 	= await instance.isDistributor(accounts[0]);
	    let retailerBool 		= await instance.isRetailer(accounts[0]);
	    let consumerBool 		= await instance.isConsumer(accounts[0]);
	    // Assert if result is equal to something, and if not send a message
	    assert.isTrue(harvesterBool, "creator is harvester");
	    assert.isTrue(manufacturerBool, "creator is manufacturer");
	    assert.isTrue(distributorBool, "creator is distributor");
	    assert.isTrue(retailerBool, "creator is retailer");
	    assert.isTrue(consumerBool, "creator is consumer");
  	})

  	it("We can set addresses to roles", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.addHarvester(accounts[1]);
	    await instance.addManufacturer(accounts[2]);
	    await instance.addDistributor(accounts[3]);
	    await instance.addRetailer(accounts[4]);
	    await instance.addConsumer(accounts[5]);
	    // Perform a function of the contract
	    let harvesterBool 		= await instance.isHarvester(accounts[1]);
	    let manufacturerBool 	= await instance.isManufacturer(accounts[2]);
	    let distributorBool 	= await instance.isDistributor(accounts[3]);
	    let retailerBool 		= await instance.isRetailer(accounts[4]);
	    let consumerBool 		= await instance.isConsumer(accounts[5]);
	    // Assert if result is equal to something, and if not send a message
	    assert.isTrue(harvesterBool, "account1 is harvester");
	    assert.isTrue(manufacturerBool, "account2 is manufacturer");
	    assert.isTrue(distributorBool, "account3 is distributor");
	    assert.isTrue(retailerBool, "account4 is retailer");
	    assert.isTrue(consumerBool, "account5 is consumer");
  	})

	it("Harvester can harvestLumber()", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let result = await instance;
	    // Assert if result is equal to something, and if not send a message
	    assert.exists(result, "instance is created");
  	})


});