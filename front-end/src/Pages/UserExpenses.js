import {useEffect, useState} from 'react'
import Expenses from "../Components/Expenses"
import Sidebar from '../Components/Sidebar'
import { useCookies } from "react-cookie";
import axios from 'axios';

function UserExpenses() {

  const [newExpense,setNewExpense] = useState(
    {
      type: String,
      price: Number,
      quantity:Number,
    }
  );
  const [deleted, setDeleted] = useState(false)
  const [newType,setNewType] = useState("");
  const [newPrice,setNewPrice] = useState();
  const [newQuantity,setNewQuantity] = useState();
  const [popupActive,setPopupActive] = useState(false);
  const [monthlyBudget,setMonthlyBudget] = useState({});
  const [displayBudget, setDisplayBudget] = useState(null);
  const [cookies, setCookies,removeCookies] = useCookies(["userID"],["name"],["monthlyBudget"]);
  const [validBudget, setValidBudget] = useState(false);
  
  const [userExpenses,setUserExpenses] = useState([]);
  const [value,setValue] = useState(false)

  var sum = 0;
  
  var expensTotal= 0;
  expensTotal = userExpenses.map(expense =>(
    sum += expense.price
  ))
  let lastElement = expensTotal[expensTotal.length - 1];

 
 // refreshed the expense total everytime the screen refreshes or expenses change
 useEffect(() =>{
  const fetchExpenses = async() => {
    try{
     const response =  await axios.get('http://localhost:5000/user_expenses', {
        params:{ 
        _id: cookies.userID
      }
    });
   
    if(response.statusText === 'OK'){
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
  }};

  fetchExpenses()
  
},[])


useEffect(()=>{
  
},[userExpenses])

useEffect(()=>{
  const checkBudget = ( ) =>{
    if(displayBudget)
    {
      setValidBudget(true);
    }
    else
    return
  }
  
checkBudget()
},[displayBudget])

//function to fetch api and add expense
const addExpense = async() => {
  
  let bodyjs = JSON.stringify({
    userID:cookies.userID,
    type: newType,
    quantity: newQuantity,
    price: newPrice
  })

  console.log(bodyjs);
  try{
    const data = await fetch("http://localhost:5000/expenses",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyjs
    })
    if(data.statusText === 'OK')
    {
      setUserExpenses([...userExpenses,newExpense]);
      setPopupActive(false);
      setNewExpense("");
      window.location.reload()
      return
    }
    else{
      console.log('Issue when adding expense')
    }
 
  }catch(error){
    console.error(error)
  }
}

const deleteExpense = (expense) =>{
  setUserExpenses(userExpenses.filter(e => e !== expense)
  )
  window.location.reload()
  return
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

//sets dislay budget
useEffect(()=>{
  setDisplayBudget(JSON.parse(window.localStorage.getItem('monthlybudget')));
},[])

//set local storage when display budget changes
useEffect(()=>{
window.localStorage.setItem('monthlybudget', displayBudget)
},[displayBudget])

const expenseHandler= () =>{
  setDisplayBudget(monthlyBudget);
 }

 useEffect(()=>{
 
 },[validBudget])
 const handleClearBudget= ()=>
  {
     localStorage.removeItem("monthlybudget")
     setDisplayBudget(null);
     setValidBudget(false);
  }
 

const handleLogout=()=>{
  removeCookies("userID");
}
function displayExpenseTotal(expenseTotal){
if(expenseTotal == 0)
{
  return 0
}
else 
{
  return expensTotal
}
}

const fallback = ("");

  return (
    <div className="expense-layout">

      <div className='expenseWelcome'>
        <h1>Welcome, {cookies.name}</h1>{/*Pulling name from database once connected*/}
        <button className='logout'onClick={handleLogout}>Logout</button>
      </div>

      <div className = "testDiv">
        {userExpenses.length ? <h2 className='title'>Your Expenses:</h2>:<h2> </h2>}

        {/* sum of all expense.prices */}
        <div className='expenseTotalGroup'>
          <div className='expense-total'>Expense Total: ${displayExpenseTotal(expensTotal)}</div>
          {/* If user had entered a valid budget display budget if not prompt them to enter one */}
          
          {validBudget ? 
          <div className='monthly-budget'>
            Monthly budget: ${displayBudget}
          {/* <button onclick={handleClearBudget}>Clear Budget</button>  */}
          </div>
          : 
          <div > 
            <h3>Enter monthly budget:</h3>
            <input className='monthly-budget-input' type={'number'} placeholder={"monthly budget..."}  value={monthlyBudget} onChange={(e)=>setMonthlyBudget(e.target.value)}></input>
            <button className = 'budgetButton' onClick={expenseHandler}>Add budget</button>
          </div>}
        </div>
      </div>
      
      
      {/*maps expenses from  database once fetched */}
      <div>
          {userExpenses&&<Expenses expenses = {userExpenses} onDelete = {deleteExpense}/>}
      </div> 
    
      {popupActive ? ( 
            <div className='popup'>
            
            <div className="content">
              <input 
              placeholder='Expense Name'
              type='text'
              className='addExpenseInput'
              onChange={e => setNewType(e.target.value)}
              value = {newType} />

            <input 
              type='number'
              placeholder='Expense Price'
              className='addExpenseInput'
              onChange={e =>setNewPrice(e.target.value)}
              value = {newPrice} />
            <input 
              placeholder='Expense Quantity'
              type='number'
              className='addExpenseInput'
              onChange={e => setNewQuantity(e.target.value)}
              value = {newQuantity} />
              <button className='createExpenseButton' onClick={addExpense}>Create Expense</button> 
              <button className='cancelExpenseButton' onClick={() => setPopupActive(false)}>cancel</button> 
            </div>
            
          </div>
          ): <div className="addPopup" onClick={()=>setPopupActive(true) }>Add Expense</div>
        }
      </div>
  );
}

export default UserExpenses;
