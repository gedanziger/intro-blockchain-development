pragma solidity ^0.4.23;
contract Whitelist {
	mapping (address => bool) whitelist;
	
    event Whitelisted(address whitelistAddr, bool result);

	function addWhitelist(bytes _signature) public {
        bytes32 messageHash = keccak256("\x19Ethereum Signed Message:\n17I love MouseBelt!");
        // Recover address of message signer
        address recovered = getRecoveredAddress(_signature, messageHash);
        require(recovered == msg.sender);
        Add(msg.sender);
    }

    function checkWhitelist(address _addr) external view returns(bool) {
        return whitelist[_addr];
    }

	/**
     * @dev give an account access whitlisted role
     * @param _addr Address to whitelist
     */

	function Add(address _addr) internal {
        require(_addr != address(0));
        whitelist[_addr] = true;
        emit Whitelisted(_addr, true);
    }

    /**
     * @dev remove an account access whitlisted role
     */

	function remove(address _account) internal {
        require(_account != address(0));
        whitelist[_account] = false;
    }

    function getRecoveredAddress(bytes sig, bytes32 dataHash)
            internal
            pure
            returns (address addr)
    {
            bytes32 ra;
            bytes32 sa;
            uint8 va;

            // Check the signature length
            if (sig.length != 65) {
                return (0);
            }

            // Divide the signature in r, s and v variables
            assembly {
                ra := mload(add(sig, 32))
                sa := mload(add(sig, 64))
                va := byte(0, mload(add(sig, 96)))
            }

            if (va < 27) {
                va += 27;
            }

            address recoveredAddress = ecrecover(dataHash, va, ra, sa);

            return (recoveredAddress);
    }

}