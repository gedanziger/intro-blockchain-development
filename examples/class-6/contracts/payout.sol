pragma solidity ^0.4.23;
contract Payout {
	address paymentAddress;
	bool instantSendEth = false;
    uint256 private weiRaised;
    address private whitelist;

    event SetWhitelistAddress(address whitelistAddr);
    event SetInstantSendETH(bool instantSendEth);
    event WeiRaised(uint weiRaised);
    event Deposit(address sender, uint amount);
    event WhitelistResult(bool result);
    event Withdraw(address paymentAddress, uint amount);
	modifier onlyPaymentAddress() {
        require(msg.sender == paymentAddress);
        _;
    }

	constructor(address _paymentAddress) public {
        paymentAddress = _paymentAddress;
    }

	/**
     * @dev Withdraw eth to paymentAddress
     */

    function withdraw() public onlyPaymentAddress {
        paymentAddress.transfer(weiRaised);
        emit Withdraw(paymentAddress, weiRaised);
    }
    
    function setWhitelistAddress(address _addr) public onlyPaymentAddress {
        whitelist = _addr;
        emit SetWhitelistAddress(whitelist);
    }

    function getWhitelistAddress() external view returns(address) {
        return whitelist;
    }

    function setInstantPay() external {
        instantSendEth = true;
        emit SetInstantSendETH(instantSendEth);
    }

    /**
     * @dev fallback function 
     */
    function deposit() payable public {

    	require(whitelist != address(0));
    	address beneficiary = msg.sender;
    	emit Deposit(beneficiary, msg.value);
    	preValidateWhitelist(beneficiary);
    	preValidateInstantSend();
    	uint256 weiAmount = msg.value;
        preValidatePay(beneficiary, weiAmount);
        weiRaised = weiRaised + weiAmount;
        emit WeiRaised(weiRaised);
    }

    /**
     * @dev Check if contributor is whitelisted
     * @param _beneficiary Address to check if whitelisted
     */
    function preValidateWhitelist(address _beneficiary) internal {
        bytes4 sig = bytes4(keccak256("checkWhitelist(address)"));
        bool answer;
        assembly {
            // move pointer to free memory spot
            let ptr := mload(0x40)
            // put function sig at memory spot
            mstore(ptr,sig)
            // append argument after function sig
            mstore(add(ptr,0x04), _beneficiary)

            let result := call(
              15000, // gas limit
              sload(whitelist_slot),  // to addr. append var to _slot to access storage variable
              0, // not transfer any ether
              ptr, // Inputs are stored at location ptr
              0x24, // Inputs are 36 bytes long
              ptr,  //Store output over input
              0x20) //Outputs are 32 bytes long
            /*if eq(result, 0) {
                revert(0, 0)
            }*/
            answer := mload(ptr) // Assign output to answer var
            mstore(0x40,add(ptr,0x24)) // Set storage pointer to new space
        }
        emit WhitelistResult(answer);
        require(answer == true);
    }

    /**
     * @dev Validation of instant send. if instantSendEth false revert transaction
     */
    function preValidateInstantSend() internal view {
        require(instantSendEth != false);
    }

    /**
     * @dev Validation of an incoming pay. 
     * @param _beneficiary Address performing pay
     * @param _weiAmount Value in wei involved in pay
     */
    function preValidatePay(address _beneficiary, uint256 _weiAmount) internal pure {
        require(_beneficiary != address(0));
        require(_weiAmount != 0);
    }
}