pragma solidity ^0.4.23;

contract DataTypes {
	uint256 public numPayments = 0;

	/* String use example */
    string stringTest = "This is original string";

    function getString() public view returns(string){
        return stringTest;
    }

    function setString(string _value) public {
        stringTest =  _value;
    }

    /* Uint use example */
    uint256 uintTest = 1;

    function getUint() public view returns(uint256){
        return uintTest;
    }

    function setUint(uint256 _value) public{
        uintTest =  _value;
    }

    /* Array use example */ 
    uint256[] arrayTest;


    function pushArray(uint256 _value) public{
        arrayTest.push(_value);
    }

    function getArray() public view returns(uint256[]){
        return arrayTest;
    }


    /* Mapping and struct use example*/
    struct Student {
        uint age;
        string fName;
        string lName;
    }
    mapping(address => Student) students;
    address[] public studentAccs;

    function setStudent(address _address, uint256 _age, string _fName, string _lName) public returns(uint, string, string){
        students[_address].age = _age;
        students[_address].fName = _fName;
        students[_address].lName = _lName;
        studentAccs.push(_address) - 1;
        return (students[_address].age, students[_address].fName, students[_address].lName);
    }

    function getStudents() view public returns(address[]) {
        return studentAccs;
    }
    
    function getStudent(address _address) view public returns (uint, string, string) {
        return (students[_address].age, students[_address].fName, students[_address].lName);
    }
    
    function countStudents() view public returns (uint) {
        return studentAccs.length;
    }

    /* Enum example */
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    function setChoice(uint _value) public {
        choice = ActionChoices(_value);
    }

    function getChoice() public view returns (uint) {
        return uint(choice);
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }
}