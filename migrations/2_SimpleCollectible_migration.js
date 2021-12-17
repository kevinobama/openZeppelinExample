const simpleCollectible = artifacts.require("SimpleCollectible");

module.exports = function(deployer) {
  deployer.deploy(simpleCollectible);
};