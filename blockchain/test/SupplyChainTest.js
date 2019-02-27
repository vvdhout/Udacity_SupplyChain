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

	it("Harvester can harvestLumber(), we can fetch the item", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.harvestLumber(1, accounts[1], "Greg Pillar", "Good ol' Lumberjack from Tilburg, The Netherlands", "51.560506", "5.083633", "You want some Dutch lumber, ye? These lumber been hacked up al' good by me self, ye. It's from Warande forrest, capish?", {from: accounts[1]});
	    let itemFetch1 = await instance.fetchItemBufferOne(1);
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    // Assert if result is equal to something, and if not send a message
	    assert.exists(itemFetch1, "fetching item buffer one");
	    assert.exists(itemFetch2, "fetching item buffer two");
	    assert.equal(itemFetch1.ownerID, accounts[1], "owner equals the harvester");
	    assert.equal(itemFetch1.originHarvesterName, "Greg Pillar", "owner equals the harvester");
  	})

  	it("Harvester can processLumber(), packageLumber(), and sellLumber()", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.processLumber(1, {from: accounts[1]});
	    await instance.packageLumber(1, {from: accounts[1]});
	    await instance.sellLumber(1, web3.utils.toWei("0.20"), {from: accounts[1]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(Number(itemFetch2.productPrice), web3.utils.toWei("0.20"), "lumber is on sale for 0.20 ETH")
  	})

  	it("Manufacturer can buy the lumber that is on sale", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let balanceManufacturer = await web3.eth.getBalance(accounts[2]);
	    await instance.buyLumber(1, {value: web3.utils.toWei("0.40"), from: accounts[2]});
	    let balanceManufacturerNew = await web3.eth.getBalance(accounts[2]);
	    let difference = web3.utils.fromWei(String(balanceManufacturer - balanceManufacturerNew));
	    // Check if lumber is on sell
	    let itemFetch1 = await instance.fetchItemBufferOne(1);
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.manufacturerID, accounts[2], "manufacturerID has been set to manufacturer's address");
	    assert.equal(itemFetch1.ownerID, accounts[2], "ownerID has been set to manufacturer's address");
	    assert.equal(Math.round(difference* 100) / 100, 0.20, "payment made and change has been returned");
  	})

  	it("Harvester can shipLumber() after having sold it", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.shipLumber(1, {from: accounts[1]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.itemState, 5, "Item state has been changed to shipped");
  	})

  	it("Manufacturer can receive product", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.receiveLumber(1, {from: accounts[2]});
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    // Assert if result is equal to something, and if not send a message
	    assert.equal(itemFetch2.itemState, 6, "Item state has been changed to received");
  	})

  	it("Manufacturer can manufactureProduct() and at notes", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.manufactureProduct(1, "We are turing this beautiful lumber from the Souther Netherlands in a super neat table.", {from: accounts[2]});
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    // Assert if result is equal to something, and if not send a message
	    assert.equal(itemFetch2.itemState2, 1, "Lumber has converted to a product (state)");
	    assert.equal(itemFetch2.productNotesByManufacturer, "We are turing this beautiful lumber from the Souther Netherlands in a super neat table.", "Manufacturer has added notes.");
  	})

  	it("Manufacturer can packageProduct(), and sellProduct()", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.packageProduct(1, {from: accounts[2]});
	    await instance.sellProductByManufacturer(1, web3.utils.toWei("0.70"), {from: accounts[2]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(Number(itemFetch2.productPrice), web3.utils.toWei("0.70"), "product is on sale for 0.70 ETH");
  	})

  	it("Distributor can buy the product that is on sale", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let balanceDistributor = await web3.eth.getBalance(accounts[3]);
	    await instance.buyProductByDistributor(1, {value: web3.utils.toWei("0.80"), from: accounts[3]});
	    let balanceDistributorNew = await web3.eth.getBalance(accounts[3]);
	    let difference = web3.utils.fromWei(String(balanceDistributor - balanceDistributorNew));
	    // Check if lumber is on sell
	    let itemFetch1 = await instance.fetchItemBufferOne(1);
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.distributorID, accounts[3], "distributorID has been set to manufacturer's address");
	    assert.equal(itemFetch1.ownerID, accounts[3], "ownerID has been set to manufacturer's address");
	    assert.equal(Math.round(difference* 100) / 100, 0.70, "payment made and change has been returned");
  	})

  	it("Manufacturer can shipProductByManufacturer() after having sold it", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.shipProductByManufacturer(1, {from: accounts[2]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.itemState, 11, "Item state has been changed to shipped");
  	})

  	it("Distributor can sellProductByManufacturer()", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.sellProductByDistributor(1, web3.utils.toWei("0.85"), {from: accounts[3]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(Number(itemFetch2.productPrice), web3.utils.toWei("0.85"), "product is on sale for 0.85 ETH");
  	})

  	it("Retailer can buyProductByRetailer that is on sale", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let balance = await web3.eth.getBalance(accounts[4]);
	    await instance.buyProductByRetailer(1, {value: web3.utils.toWei("0.87"), from: accounts[4]});
	    let balanceNew = await web3.eth.getBalance(accounts[4]);
	    let difference = web3.utils.fromWei(String(balance - balanceNew));
	    // Check if lumber is on sell
	    let itemFetch1 = await instance.fetchItemBufferOne(1);
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.retailerID, accounts[4], "distributorID has been set to retailer's address");
	    assert.equal(itemFetch1.ownerID, accounts[4], "ownerID has been set to retailer's address");
	    assert.equal(Math.round(difference* 100) / 100, 0.85, "payment made and change has been returned");
  	})

  	it("Distributor can shipProductByDistributor() after having sold it", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.shipProductByDistributor(1, {from: accounts[3]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.itemState, 14, "Item state has been changed to shipped");
  	})

  	it("Retailer can sellProductByRetailer()", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.sellProductByRetailer(1, web3.utils.toWei("0.99"), {from: accounts[4]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(Number(itemFetch2.productPrice), web3.utils.toWei("0.99"), "product is on sale for 0.99 ETH");
  	})

  	it("Consumer can purchase() the product that is on sale", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let balance = await web3.eth.getBalance(accounts[5]);
	    await instance.purchase(1, {value: web3.utils.toWei("0.99"), from: accounts[5]});
	    let balanceNew = await web3.eth.getBalance(accounts[5]);
	    let difference = web3.utils.fromWei(String(balance - balanceNew));
	    // Check if lumber is on sell
	    let itemFetch1 = await instance.fetchItemBufferOne(1);
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.consumerID, accounts[5], "consumerID has been set to consumer's address");
	    assert.equal(itemFetch1.ownerID, accounts[5], "ownerID has been set to consumer's address");
	    assert.equal(Math.round(difference* 100) / 100, 0.99, "payment made and change has been returned");
  	})

  	it("Retailer can shipProductByRetailer() after having sold it", async () => {
  		// Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.shipProductByRetailer(1, {from: accounts[4]});
	    // Check if lumber is on sell
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    assert.equal(itemFetch2.itemState, 17, "Item state has been changed to shipped");
  	})

  	it("Consumer can receiveProduct() after shipment", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    await instance.receiveProduct(1, {from: accounts[5]});
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    // Assert if result is equal to something, and if not send a message
	    assert.equal(itemFetch2.itemState, 18, "Item state has been changed to received");
  	})

  	it("We can fetchItemBufferOne()", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let itemFetch1 = await instance.fetchItemBufferOne(1);
	    // Assert if result is equal to something, and if not send a message
	    assert.exists(itemFetch1, "fetching item buffer one");
	    assert.equal(itemFetch1.originHarvesterName, "Greg Pillar", "owner equals the harvester");
  	})

  	it("We can fetchItemBufferTwo()", async () => {
	    // Get deployed contract
	    let instance = await SupplyChain.deployed();
	    // Perform a function of the contract
	    let itemFetch2 = await instance.fetchItemBufferTwo(1);
	    // Assert if result is equal to something, and if not send a message
	    assert.exists(itemFetch2, "fetching item buffer two");
	    assert.equal(itemFetch2.itemUPC, 1, "upc matches 1");
  	})


});