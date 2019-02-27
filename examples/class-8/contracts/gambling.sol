pragma solidity ^0.4.23;
import "./oracle.sol";
contract Gambling is usingOraclize{
    
    event FundLoaded(uint256 weiAmount);
    event Withdraw(address indexed withdrawer, uint256 amount);
    event RandomNumber(string result);    
    event WonGame(address indexed gambler, uint256 amount);
    event LostGame(address indexed player, string result);
    
    mapping(address => uint256) private _gambles;
    mapping(bytes32 => address) private _betAddresses;
    mapping(bytes32 => uint256) private _betAmounts;

    address _owner;
    uint256 private _weiRaised;
    
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    constructor() public {
        _owner = msg.sender;
    }

    function load_funds() payable public onlyOwner {
        uint256 weiAmount = msg.value;
        _weiRaised = _weiRaised + weiAmount;
        emit FundLoaded(weiAmount);
    }

    function get_balance() external view returns(uint256) {
        return (address(this).balance);
    }

    function weiRaised() external view returns(uint256) {
        return _weiRaised;
    }

    function get_gamble(address owner) external view returns(uint256) {
        return _gambles[owner];
    }

    function withdraw_funds() public {
        address withdrawer = msg.sender;
        uint256 amount = _gambles[withdrawer];
        require(amount > 0);
        withdrawer.transfer(amount);
        _weiRaised = _weiRaised - amount;
        emit Withdraw(withdrawer, amount);
        _gambles[withdrawer] = 0;
    }

    
    function () public payable {
        uint256 weiAmount = msg.value;
        require(address(this).balance >= weiAmount * 2);
        require(oraclize_getPrice("URL") < address(this).balance);
        
        bytes32 myid = oraclize_query(3, "URL", "json(https://api.random.org/json-rpc/1/invoke).result.random.data.0", '\n{"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"cb0248fc-fd15-4925-92bb-45af02429b40","n":1,"min":0,"max":7,"replacement":true,"base":10},"id":1}');

        _betAddresses[myid] = msg.sender;
        _betAmounts[myid] = msg.value;

    }

    function __callback(bytes32 myid, string result) {
        require(msg.sender == oraclize_cbAddress());
        emit RandomNumber(result);

        if ((uint(bytes(result)[0]) - 48 <= 2) && (uint(bytes(result)[0]) - 48 >= 0)) {
            _gambles[_betAddresses[myid]] = _betAmounts[myid] * 2;
            _betAmounts[myid] = 0;
            emit WonGame(_betAddresses[myid], _gambles[_betAddresses[myid]]);
        } else {
            _weiRaised = _weiRaised + _betAmounts[myid];
            _betAmounts[myid] = 0;
            emit LostGame(_betAddresses[myid], "Lost game");
        }
    } 
}