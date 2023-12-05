// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContinuousPayrollSystem {
    address public owner;
    mapping(address => Employee) public employees;
    mapping(address => uint256) public recipientExpenses;
    uint256 public totalExpenses;

    enum ExpenseCategory { General, Supplies, Services, Equipment } 

    struct Employee {
        uint256 salary;
        uint256 lastPayDay;
        bool isTerminated;
    }

    event EmployeeAdded(address indexed employee, uint256 salary);
    event SalaryPaid(address indexed employee, uint256 amount);
    event ExpenseAdded(address indexed spender, uint256 amount, ExpenseCategory category);
    event PaymentSent(address indexed recipient, uint256 amount, string description);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier employeeExists(address employeeAddress) {
        require(employees[employeeAddress].salary > 0, "Employee does not exist");
        _;
    }

    modifier notTerminated(address employeeAddress) {
        require(!employees[employeeAddress].isTerminated, "Employee is terminated");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addEmployee(address employeeAddress, uint256 initialSalary) external onlyOwner {
        require(employees[employeeAddress].salary == 0, "Employee already exists");
        employees[employeeAddress] = Employee(initialSalary, block.timestamp, false);
        emit EmployeeAdded(employeeAddress, initialSalary);
    }

    function updateEmployeeSalary(address employeeAddress, uint256 newSalary) external onlyOwner employeeExists(employeeAddress) notTerminated(employeeAddress) {
        employees[employeeAddress].salary = newSalary;
        emit EmployeeAdded(employeeAddress, newSalary);
    }

    function terminateEmployee(address employeeAddress) external onlyOwner employeeExists(employeeAddress) notTerminated(employeeAddress) {
        employees[employeeAddress].isTerminated = true;
    }

    function paySalary(address employeeAddress) external onlyOwner employeeExists(employeeAddress) notTerminated(employeeAddress) {
        Employee storage employee = employees[employeeAddress];
        uint256 secondsPassed = block.timestamp - employee.lastPayDay;
        require(secondsPassed >= 1 minutes, "Salary can only be paid once per minute");

        uint256 amountToPay = (employee.salary * secondsPassed) / 60; 
        employee.lastPayDay = block.timestamp;
        totalExpenses += amountToPay;

        payable(employeeAddress).transfer(amountToPay);
        emit SalaryPaid(employeeAddress, amountToPay);
    }

    function addExpense(uint256 amount, ExpenseCategory category) external onlyOwner {
        totalExpenses += amount;
        emit ExpenseAdded(msg.sender, amount, category);
    }

    function sendPayment(address recipient, uint256 amount, string memory description) external onlyOwner {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Invalid amount");

        payable(recipient).transfer(amount);
        totalExpenses += amount;
        recipientExpenses[recipient] += amount;
        emit PaymentSent(recipient, amount, description);
    }

    function getEmployeeDetails(address employeeAddress) external view employeeExists(employeeAddress) returns (uint256 salary, uint256 lastPayDay, bool isTerminated) {
        Employee storage employee = employees[employeeAddress];
        return (employee.salary, employee.lastPayDay, employee.isTerminated);
    }

    function getTotalExpenses() external view returns (uint256) {
        return totalExpenses;
    }

    function getRecipientExpenses(address recipient) external view returns (uint256) {
        return recipientExpenses[recipient];
    }
}
