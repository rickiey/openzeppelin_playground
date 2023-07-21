const { ethers } = require("hardhat");

async function main () {
    // Deploying
    const MyNFT = await ethers.deployContract("MyNFT");

    await MyNFT.waitForDeployment()


    MyNFT.interface.forEachFunction(f => {
        // type 和 baseType 都可以
        let params = f.inputs.map(p => p.type)
        let returns = f.outputs.map(o => o.baseType)
        console.log("function name: ", f.name, "input params: ", params, " reuturns ", returns)
    })

    console.log("name: ", await MyNFT.name())
    console.log("symbol: ", await MyNFT.symbol())
    let testAddr = "0x46E3e1Be9F493EBba4d7C4c1d24a61dB08ee8565"
    let mintTX = await MyNFT.safeMint(testAddr, "NFTurl/ipfs cid")
    console.log(mintTX.hash)

    // let balance = await MyNFT.balanceOf(testAddr)
    let balance = await MyNFT["balanceOf(address)"](testAddr)


    console.log("0x46E3e1Be9F493EBba4d7C4c1d24a61dB08ee8565 balance: ", balance)

    for (let tokenID = 0; tokenID < balance; tokenID++) {
        console.log("0x46E3e1Be9F493EBba4d7C4c1d24a61dB08ee8565 tokenURL: ", await MyNFT.tokenURI(tokenID))
    }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
