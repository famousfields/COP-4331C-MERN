import React from 'react'
import { useState } from 'react';

const Expenses = (expenses, onDelete) =>
{
  // const [debugExpenses, setDebugExpenses] = useState(null);
  // const setDebugExpens = ()=>{
  //   setDebugExpenses([
  //     {
  //       name: "gas",
  //       price: 10,
  //       quantity:1
  //     },{
  //       name:"food",
  //       price:20,
  //       quantity:2
  //     }
  //   ])
  // }
  return (
    <div>
      
      { expenses?.length ? expenses.map((expense)=>{
        <div className='expense'>
          <div className='text'>{expense.type}</div>
          <div className='price'>{expense.price}</div>
          <div className='quantity'>{expense.quantity}</div> 
          <div className='delete-expense' onClick={onDelete}>x</div>
        </div>
        console.log(expense);
      }) 
      :   
        <>
          {/* <div className='expense'>
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
          </div>  */}
          <h1>No data to display</h1>
      </>
      }
    </div>
  );
}
export default Expenses;
