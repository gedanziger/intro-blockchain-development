pragma solidity ^0.4.23;
contract Class {
    uint private students = 10;
    uint private teachers = 5;
    function setTeachers(uint _value) private { teachers = _value; }
    function getTeachers() private  view returns(uint) { return teachers; }
    function setStudents(uint _value) public { students = _value; }
    function getStudents() public view returns(uint) { return students; }
 
    function total() internal view returns (uint) { return students + teachers; }

    function addStudents(uint _value) public returns (uint) {
    	_value += 1;
    	students += _value;
    	return students; 
    }
    function addTeachers(uint _value) external view returns (uint) { 
    	// _value += 1; // error: not allowed to modify param for external function
    	return teachers + _value; 
    }
}

contract EnglishClass {
	Class class = new Class();
    function readData() public view returns(uint) {
        // uint teachers = class.getTeachers(); // error: member `getTeachers` is not visible - private
        // uint total = class.total(); // error: member `total` is not visible - internal
        return class.getStudents();
    }
}

contract BlockchainClass is Class {
    function readTotal() public view returns(uint){
        return total(); // access to internal member (from derived to parent contract)
    }
}