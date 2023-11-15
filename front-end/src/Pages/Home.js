import React from 'react';


function Home() {
  return (
    <div className='home-page'>

      <div className='welcomeDiv'>

        <h1>The Expense Tracker</h1>

        <div className='welcomeTextBox'>
            <h2>
            The Expense Tracker is the Simplest way to take control of your finances. 
            Effortlessly track your expenses, manage budgets, and gain insights into your spending habits. 
            </h2>

            <div className='buttonDiv'>
              <a href='/login'>
                <button className='homeButtons' >Login</button>
              </a>
              <a href = '/signup'>
                <button className='homeButtons'>Signup</button>
              </a>
            </div>
        </div> 

      </div>

      <div className='featureStrip'>
        <h1>Features</h1>
      </div>
      
    </div>
  )
}

export default Home;
