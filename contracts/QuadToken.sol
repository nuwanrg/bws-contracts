// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QuadToken is ERC20 {
    constructor() ERC20("Quadrant Token", "QUAD") {
        _mint(msg.sender, 1000000 * (10 ** decimals()));
    }
}
