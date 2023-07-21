// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContractV2 is Initializable {
    
    uint private s;
    address private ss;

    // function initialize(address a, uint tmps) public payable initializer {
    //     // "constructor" code...
    //     ss = a;
    //     s = tmps;
    // }

    function Private() public view returns(address){
        return ss;
    }

    function setPrivate(address a) public {
        ss =a ;
    }

    function getUint() public view returns(uint) {
        return s;
    }
}