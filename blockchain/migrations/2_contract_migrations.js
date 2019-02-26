// migrating the appropriate contracts
var HarvesterRole = artifacts.require("./HarvesterRole.sol");
var ManufacturerRole = artifacts.require("./ManufacturerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var AccessControl = artifacts.require("./AccessControl.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(HarvesterRole);
  deployer.deploy(ManufacturerRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(AccessControl);
  deployer.deploy(SupplyChain);
};