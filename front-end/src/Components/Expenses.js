import React from 'react'

const Expenses = (expenses) =>
{
  return (
    <>
      { Array.isArray(expenses) && expenses ? expenses.map((expense)=>{
        // <div className='expense'>
        //   <div className='text'>{expense.name}</div>
        //   <div className='price'>{expense.price}</div>
        //   <div className='quantity'>{expense.quantity}</div>
        //   <div className='delete'>x</div>
        // </div>
        console.log(expense);
      }) 
      :   
        <>
  
          <div className='expense'>
            <div className='text'>Gas</div>
            <div className='price'>Price: $150</div>
            <div className='delete-expense'><button>x</button></div>
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
      </>
      }
    </>
  );
}
export default Expenses;
