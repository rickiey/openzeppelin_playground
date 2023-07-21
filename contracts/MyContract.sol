// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContract is Initializable {
    uint private s;
    address private ss;

    function initialize(uint a) public payable initializer {
        // "constructor" code...
        s = a;
    }

    function getPrivate() public view returns(uint){
        return s;
    }
}