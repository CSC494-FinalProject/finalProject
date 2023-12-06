import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" id="title">
        <h1>$ PAYR0LL</h1>
      </header>
      
      <body>
        <div>

          <h2>Real time payment:</h2>
          <div id="login">
            <h4 id="login-title">Log in to employee account</h4>
            <p>Username:</p>
            <input/>
            <p>Password:</p>
            <input type="password"/>
          </div>

          <div>
            <h3>Salary earned so far:</h3>
            <h2 id="money">$65.4321</h2>
            <p>Clock in time: 07:28</p>
            <p id="time">Clock out time: ...</p>
          </div>

          <div>
              <h4>Add Expense</h4>
              <label for="expenseAmount">Amount:</label>
              <input type="number" id="expenseAmount"/>
              <label for="expenseCategory">Category:</label>
              <select id="expenseCategory">
                  <option value="0">General</option>
                  <option value="1">Supplies</option>
                  <option value="2">Services</option>
                  <option value="3">Equipment</option>
              </select>
              <button onclick="addExpense()">Add Expense</button>
            <p><i>Automatically deducted from salary</i></p>
          </div>
        </div>

        <hr/>
        <div>
          <h2>Send Payment</h2>
          <label for="paymentRecipient">Recipient Address:</label>
          <input type="text" id="paymentRecipient"/>
          <label for="paymentAmount">Amount:</label>
          <input type="number" id="paymentAmount"/>
          <label for="paymentDescription">Description:</label>
          <input type="text" id="paymentDescription"/>
          <button onclick="sendPayment()">Send Payment</button>
        </div>

        <hr/>
        <h2>Deposits:</h2>
      </body>
    </div>
  );
}

export default App;
