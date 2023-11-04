import React,{useState} from 'react'
import Expenses from '../Components/Expenses'

function UserExpenses() {
const [expenses,setExpenses] = useState({});

  return (
    <div className="expense-layout">
      <h1>Welcome</h1>
      <h4>Your Expenses</h4>
      <div className='expenses'>
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
      <button>add expense</button>
    </div>
  )
}

export default UserExpenses
