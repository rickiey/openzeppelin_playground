const { ethers } = require("hardhat");

async function main () {
    // Deploying
    // const MyToken = await ethers.deployContract("MyToken");

    // let tk = await MyToken.waitForDeployment()

    const MyToken = await ethers.getContractFactory("MyToken")


    let addr = "0x46E3e1Be9F493EBba4d7C4c1d24a61dB08ee8565"
    const cc = await MyToken.deploy(addr, addr)

    let ccc = await cc.waitForDeployment()


    let minttx = await ccc.mint(addr, 999)
    console.log(await ccc.balanceOf(addr))
    // let dd = cc.deployed()
    let burntx = await ccc.burn(addr, 876)
    console.log(await ccc.balanceOf(addr))
    // console.log(dd.address)

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
