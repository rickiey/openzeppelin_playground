
const { ethers, upgrades } = require("hardhat");

/*

Both plugins provide functions which take care of managing upgradeable deployments of your contracts.

For example, deployProxy does the following:

1. Validate that the implementation is upgrade safe.

2. Deploy a proxy admin for your project (if needed).

3. Deploy the implementation contract.

4. Create and initialize the proxy contract.

And when you call upgradeProxy:

1. Validate that the new implementation is upgrade safe and is compatible with the previous one.

2. Check if there is an implementation contract deployed with the same bytecode, and deploy one if not.

3. Upgrade the proxy to use the new implementation contract.

The plugins will keep track of all the implementation contracts you have deployed in an .openzeppelin folder in the project root,
 as well as the proxy admin. You will find one file per network there. 
 It is advised that you commit to source control the files for all networks except the development ones
  (you may see them as .openzeppelin/unknown-*.json).

Note: the format of the files within the .openzeppelin folder is not compatible with those of the OpenZeppelin CLI.
 If you want to use the Upgrades Plugins for an existing OpenZeppelin CLI project, you can migrate using the guide.

*/

async function main () {
  // Deploying
  const MyContract = await ethers.getContractFactory("MyContract");
  const instance = await upgrades.deployProxy(MyContract, [1]);
  let v1 = await instance.waitForDeployment();
  let v1addr = await v1.getAddress()
  console.log("v1 address : ", v1addr)
  let privateValue = await instance.getPrivate()
  console.log(privateValue)

  // Upgrading
  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const upgraded = await upgrades.upgradeProxy(v1addr, MyContractV2);

  // import existed contract address
  // const upgraded = await upgrades.forceImport("0x06AC0b95B951Cb78F1DeA5f98AC31FA98008b7Cd", MyContractV2);

  let ud = await upgraded.waitForDeployment()

  let v2Addr = await ud.getAddress()
  console.log("v2 address: ", v2Addr)

  let sets = await upgraded.setPrivate("0x4E5299F787810F1d30ac42Ec00B46F05232C28ae")
  console.log("set private tx hash: ", sets.blockHash)
  let newPrivate = await ud.Private()
  console.log("new private : ", newPrivate)

  let newConUint = await ud.getUint()
  console.log("new uint : ", newConUint)
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
