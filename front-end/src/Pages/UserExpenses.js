import {useEffect, useState} from 'react'
import Expenses from "../Components/Expenses"
import Sidebar from '../Components/Sidebar'
import { useCookies } from "react-cookie";
import axios from 'axios';

function UserExpenses() {

  const [newExpense,setNewExpense] = useState({});
  const [popupActive,setPopupActive] = useState(false);
  const [expenseTotal,setExpenseTotal] = useState(0);
  const [monthlyBudget,setMonthlyBudget] = useState({});
  const [displayBudget, setDisplayBudget] = useState({});
  const [cookies, setCookies,removeCookies] = useCookies(["userID"]);
  const [validBudget, setValidBudget] = useState(false);
  
  const [userExpenses,setUserExpenses] = useState([]);
  const [value,setValue] = useState(false)

  let eArr = [150,500,50];

  // function to calculate expense total
  function calcExpenseTotal(eArr){
    let sum = 0
    for(let i = 0; i < eArr.length;i++ )
      sum += eArr[i];
    return sum;
  }
 
 // refreshed the expense total everytime the screen refreshes or expenses change
 useEffect(() =>{
  setTimeout(()=>
  console.log("effect ran"),
  fetchExpenses()
  ,5000)
  // fetchExpenses()
   // setExpenseTotal(calcExpenseTotal(eArr));
},[])

useEffect(()=>{

},[value])

//function to fetch api and add expense
const addExpense = async() => {
  const data = await fetch("http://localhost:5000/expenses",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: newExpense,
      user_id:cookies.userID
    })
  }).then(res =>console.log(res));
  setUserExpenses([...userExpenses,data]);
  setPopupActive(false);
  setNewExpense("");
}

const deleteExpense = (expense) =>{
  setUserExpenses(userExpenses.filter(e => e !== expense))
}

// function for green or red budget
const ExpensePosNeg = ({ number }) => {
  let color = 'black';
  let message = '';

  if (number > 0) {
    color = 'green';
    message = 'Great Job! You are on track with your budget!';
  } else if (number < 0) {
    color = 'red';
    message = 'You are not on budget, lets look at your expenses and reduce them.';
  }

  const numberStyle = {
    color: color,
  };

  return (
    <div>
      <div style={numberStyle}>{number}</div>
      <div>{message}</div>
    </div>
  );
}


// function to fetch user expenses
const fetchExpenses = async() => {
  try{
   const response =  await axios.get('http://localhost:5000/user_expenses', {
      params:{ 
      _id: cookies.userID
    }
  });
 
  if(response.statusText === 'OK'){
    console.log(typeof([response.data]))
    setUserExpenses(response.data);
    setValue(!value)
    return
  }
  else{
    console.log("error when fetching expenses")
  }
}
catch(error){
  console.error("Error fetching expenses:", error);
}

}

// component to properly display monthly budget entered by user
const expenseHandler= (e) =>{
  localStorage.setItem(1,monthlyBudget);
  setDisplayBudget(localStorage.getItem(1));
  setValidBudget(true);
}

const handleLogout=()=>{
  removeCookies("userID");
}

const fallback = ("");

  return (
    <div className="expense-layout">

      
      <h1>Welcome, User Email Here</h1>{/*Pulling name from database once connected*/}
      <h4>Your Expenses</h4>

      <div className = "testDiv">
        
        {/* sum of all expense.prices */}
        <div className='expenseTotalGroup'>
          <div className='expense-total'>Expense Total: ${expenseTotal}</div>
          {/* If user had entered a valid budget display budget if not prompt them to enter one */}
          {validBudget ? 
          <div className='monthly-budget'>Monthly budget: ${displayBudget}</div> : 
          <div > 
            <h3>Enter monthly budget:</h3>
            <input className='monthly-budget-input' type={'number'} placeholder={"monthly budget..."}  value={monthlyBudget} onChange={(e)=>setMonthlyBudget(e.target.value)}></input>
            <button className = 'budgetButton' onClick={expenseHandler}>Add budget</button>
          </div>}
        </div>
      </div>
      
      
      {/*maps expenses from  database once fetched */}
      <div className='expenses'>
          {userExpenses&&<Expenses expenses = {userExpenses} onDelete = {deleteExpense}/>}
      </div> 
    
      
      {/*
      <div className="sidebar">
        <button className='sideOption'>Dashboard</button>
        <button className='sideOption'>Expenses</button>
        <button className='sideOption'>Trends</button>
        <button className='sideOption'>Budget</button>
        
        <button className = "logout" onClick={handleLogout}>Logout</button>
      </div>
      */}

      {/*<div className='mainContent'>*/}
        
        
        
        

        
        
           
        <div className='addExpenseDiv'>
          <div className="addPopup" onClick={()=>setPopupActive(true) }>Add Expense</div>
          <div className='logoutDiv'>
            <button className = 'logout' onClick={handleLogout}>Logout</button>
          </div>
        </div>
        
        {/* sum of all expense.prices */}
        
        
            {popupActive ? ( 
            <div className='popup'>
            
            <div className="content">
              <h3>Add expense</h3>
              <input 
              type='text'
              className='addExpenseInput'
              onChange={e => setNewExpense(e.target.value)}
              value = {newExpense.name} />
              <input 
              type='number'
              className='addExpenseInput'
              onChange={e => setNewExpense(e.target.value)}
              value = {newExpense.price} />
              <input 
              type='number'
              className='addExpenseInput'
              onChange={e => setNewExpense(e.target.value)}
              value = {newExpense.quantity} />
              <button className='createExpenseButton' onClick={addExpense}>Create Expense</button> 
              <a href="#!" className="closePopup" onClick={() => setPopupActive(false)}>cancel</a>
            </div>
          </div>
        ): fallback}
        
        
          
      {/*</div>*/}
    </div>
      
  );
}

export default UserExpenses;
