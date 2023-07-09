// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DataHashStore {
    struct HashData {
        bytes32 hash;
        uint timestamp;
        string identifier;
    }

    mapping(address => HashData[]) private userHashes;

    function storeHash(bytes32 dataHash, string memory identifier) public {
        HashData memory newHashData = HashData({
            hash: dataHash,
            timestamp: block.timestamp,
            identifier: identifier
        });

        userHashes[msg.sender].push(newHashData);
    }

    function retrieveHashes() public view returns (HashData[] memory) {
        return userHashes[msg.sender];
    }
}
