import {useState} from 'react'
import Expenses from '../Components/Expenses'

function UserExpenses() {
  
const [expenses,setExpenses] = useState({});
const [newExpense,setNewExpense] = useState({});
const [popupActive,setPopupActive] = useState(false);

//function to fetch api and add expense
// const addExpense = async() => {
//   const data = await fetch(API_BASE + "expense/new",{
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       text: newExpense
//     })
//   }).then(res =>res.json());
//   setExpenses([...expenses,data]);
//   setPopupActive(false);
//   setNewExpense("");
// }
// function to fetch user expenses
const fetchExpenses= async() =>{
  const data = await fetch("https://localhost:5000/expenses")
  .then(res=>res.json())
  .then((d)=>setExpenses(d))
}
const fallback = ("Can not load ");

  return (
    <div className="expense-layout">
      <h1>Welcome</h1>
      <h4>Your Expenses</h4>
      {/* Can map expenses from  database once fetched */}
      
      <div className='expenses'>
      {/*<div className='expense'>
          <Expenses expenses = {expenses}/>
        </div> */} 
        <div className='expense'>
          <div className='text'>Gas</div>
          <div className='price'>Price: $150</div>
          <div className='delete-expense'>x</div>
        </div>
        <div className='expense'>
          <div className='text'>food</div>
          <div className='price'>Price: $500</div>
          <div className='delete-expense'>x</div>
        </div>
        <div className='expense'>
          <div className='text'>phone bill</div>
          <div className='price'>Price: $50</div>
          <div className='delete-expense'>x</div>
        </div>
      </div>
      <div className='expense-total'>Expense Total: $700</div>
      <div className='total-income'>Total Income: $1500</div>
      <div className="addPopup" onClick={()=>setPopupActive(true) }>+</div>
      {/*popupActive ? (
        <div className='popup'>
          <div className="closePopup" onClick={()=>setPopupActive(false) }>x</div>
          <div className="content">
            <h3>Add expense</h3>
            <input 
            type='text'
            className='add-expense-name'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.name} />
             <input 
            type='number'
            className='add-expense-price'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.price} />
             <button className='button' onClick={addExpense}>Create Expense</button> 
             <button className='button' >Create Expense</button>  
          </div>
        </div>
      ): fallback*/ }
    </div>
  );
}

export default UserExpenses
