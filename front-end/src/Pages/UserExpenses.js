import {useEffect, useState} from 'react'
import Expenses from "../Components/Expenses"
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
  
  const [expenses,setExpenses] = useState(null);
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
    fetchExpenses();
   // setExpenseTotal(calcExpenseTotal(eArr));
  },[])

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
  setExpenses([...expenses,data]);
  setPopupActive(false);
  setNewExpense("");
}

const deleteExpense = (expense) =>{
  setExpenses(expenses.filter(e => e !== expense))
}

// function to fetch user expenses
const fetchExpenses = () => {
  axios.get(`http://localhost:5000/expense`, {
  params:{
  _id: `655cb59801d9e9f051dd43c5`
  }
})
.then(e => setExpenses(e))
.then(console.log(expenses))
.catch(err=>console.log(err))
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
      <button onClick={handleLogout}>Logout</button>
      <h1>Welcome, User Email Here</h1>{/*Pulling name from database once connected*/}
      <h4>Your Expenses</h4>
      
      {/*maps expenses from  database once fetched */}
      <div className='expenses'>
          <Expenses expenses = {expenses} onDelete = {deleteExpense}/>
      </div> 

      {/* sum of all expense.prices */}
      <div className='expense-total'>Expense Total: ${expenseTotal}</div>
      
      {/* If user had entered a valid budget display budget if not prompt them to enter one */}
      {validBudget ? 
      <div className='monthly-budget'>Monthly budget: ${displayBudget}</div> : 
      <div className='monthly-budget-input'> 
        <h3>Enter monthly budget:</h3>
        <input type={'number'} placeholder={"monthly budget..."}  value={monthlyBudget} onChange={(e)=>setMonthlyBudget(e.target.value)}></input>
        <button onClick={expenseHandler}>Add budget</button>
        </div>}
      
      {/* Add expense */}
      <div className="addPopup" onClick={()=>setPopupActive(true) }>+</div>
      {popupActive ? (
        <div className='popup'>
          <div className="closePopup" onClick={()=>setPopupActive(false) }>x</div>
          <div className="content">
            <h3>Add expense</h3>
            <input 
            type='text'
            className='add-expense-name'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.type} />
             <input 
            type='number'
            className='add-expense-price'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.price} />
            <input 
            type='number'
            className='add-expense-price'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.quantity} />
             <button className='button' onClick={addExpense}>Create Expense</button> 
          </div>
        </div>
      ): fallback}
    </div>
  );
}

export default UserExpenses
