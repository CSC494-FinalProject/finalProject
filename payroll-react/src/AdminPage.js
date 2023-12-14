// // AdminPage.js
// import React from 'react';

// function AdminPage() {
//     return (
//         <div>
//             <h2>Welcome, Admin!</h2>
//             {/* Admin-specific content goes here */}
//         </div>
//     );
// }

// export default AdminPage;

import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import ContinuousPayrollSystem, { abi, address } from './ContinuousPayrollSystem';

function AdminPage({ onLogout }) {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(''); 

    useEffect(() => {
        async function initWeb3() {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const contractInstance = new web3Instance.eth.Contract(
                        abi,
                        address
                    );
                    setContract(contractInstance);

                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]); // Set the account state
                } catch (error) {
                    console.error('Error connecting to Ethereum provider', error);
                }
            } else {
                console.error('Please install MetaMask or another Ethereum provider');
            }
        }

        initWeb3();
    }, []);

    const handleAddEmployee = async () => {
        const employeeAddress = document.getElementById('employeeAddress').value;
        const newSalary = document.getElementById('newSalary').value;
        await contract.methods.addEmployee(employeeAddress, newSalary).send({ from: account });
    };

    const handleUpdateSalary = async () => {
        const employeeAddress = document.getElementById('employeeAddress').value;
        const newSalary = document.getElementById('newSalary').value;
        await contract.methods.updateEmployeeSalary(employeeAddress, newSalary).send({ from: account });
    };

    const handleTerminateEmployee = async () => {
        const employeeAddress = document.getElementById('employeeAddress').value;
        await contract.methods.terminateEmployee(employeeAddress).send({ from: account });
    };

    const getEmployeeDetails = async () => {
        // Implement logic to get employee details from the contract
    };

    const updateEmployeeSalary = async () => {
        // Implement logic to update employee salary using the contract
    };

    const addEmployee = async () => {
        // Implement logic to add an employee using the contract
    };

    const terminateEmployee = async () => {
        // Implement logic to terminate an employee using the contract
    };

    const paySalary = async () => {
        // Implement logic to pay salary using the contract
    };

    const getRecipientExpenses = async () => {
        // Implement logic to get recipient expenses from the contract
    };

    const getTotalExpenses = async () => {
        // Implement logic to get total expenses from the contract
    };


    const handleLogout = () => {
        onLogout();
    };

    return (
        <div className="App">
            <header className="App-header" id="title">
                <h1>ADMIN</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <body>
                <div>
                    <h2>Employee Management</h2>

                    <div>
                        <h3>Get Employee Details</h3>

                        <label htmlFor="getEmployeeDetailsAddress">Employee Address:</label>
                        <input type="text" id="getEmployeeDetailsAddress" /><br />

                        <button onClick={getEmployeeDetails}>Get Details</button><br />
                        <p id="employeeDetails"></p>
                    </div>

                    <div>
                        <h3>Update Employee Salary</h3>

                        <label htmlFor="updateEmployeeAddress">Employee Address:</label>
                        <input type="text" id="updateEmployeeAddress" /><br />

                        <label htmlFor="newSalary">New Salary:</label>
                        <input type="number" id="newSalary" /><br />

                        <button onClick={updateEmployeeSalary}>Update</button>
                    </div>

                    <div>
                        <h3>Add Employee</h3>

                        <label htmlFor="employeeAddress">Employee Address:</label>
                        <input type="text" id="employeeAddress" /><br />

                        <label htmlFor="initialSalary">Initial Salary:</label>
                        <input type="number" id="initialSalary" /><br />

                        <button onClick={addEmployee}>Add</button>
                    </div>

                    <div>
                        <h3>Terminate Employee</h3>

                        <label htmlFor="terminateEmployeeAddress">Employee Address:</label>
                        <input type="text" id="terminateEmployeeAddress" /><br />

                        <button onClick={terminateEmployee} id="terminated">Terminate</button>
                    </div>
                </div>

                <hr />
                <div>
                    <h2>Salary Management</h2>

                    <div>
                        <h3>Pay Salary</h3>

                        <label htmlFor="paySalaryAddress">Employee Address:</label>
                        <input type="text" id="paySalaryAddress" /><br />

                        <button onClick={paySalary}>Pay Salary</button>
                    </div>

                    <div>
                        <h3>Get Recipient Expenses</h3>

                        <label htmlFor="getRecipientExpensesAddress">Recipient Address:</label>
                        <input type="text" id="getRecipientExpensesAddress" /><br />

                        <button onClick={getRecipientExpenses}>Get Expenses</button><br />
                        <p id="recipientExpenses"></p>
                    </div>

                    <div>
                        <h3>Get Total Expenses</h3>

                        <button onClick={getTotalExpenses}>Get Expenses</button><br />
                        <p id="totalExpenses"></p>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default AdminPage;
