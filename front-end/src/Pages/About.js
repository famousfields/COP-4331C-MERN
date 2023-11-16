import React from 'react'

function About() {
  return (
    <div className='about-devs'>

      <div className = 'aboutHeader'>
        <h1>Meet the Team</h1>
      </div>

      <div className='aboutBox'>

        <div className = 'memberCard'>
          <div className = 'cardContent'>
            <img src = 'https://i.imgur.com/jOfEuol.png'></img>
            <br></br>
            <h3>William Fields</h3>
            <p>Front-End</p>
          </div>
        </div>

        <div className = 'memberCard'>
          <div className='cardContent'>
            <img src = 'https://i.imgur.com/jOfEuol.png'></img>
            <h3>Marco Andres Saavedra</h3>
            <p>Database/API</p>
          </div>
        </div>

        <div className = 'memberCard'>
          <div className='cardContent'>
            <img src = 'https://i.imgur.com/jOfEuol.png'></img>
            <h3>Jason Griller</h3>
            <p>API</p>
          </div>
        </div>

        <div className = 'memberCard'>
          <div className='cardContent'>
            <img src = 'https://i.imgur.com/jOfEuol.png'></img>
            <h3>Christian Rodriguez</h3>
            <p>Front-End</p>
          </div>
        </div>

        <div className = 'memberCard'>
          <div className='cardContent'>
            <img src = 'https://i.imgur.com/jOfEuol.png'></img>
            <h3>David Patenaude</h3>
            <p>Database</p>
          </div>
        </div>
      </div>


      {/*
      <div className='dev-entry'>
        <h1>William Fields</h1>
        <h3>Front-end</h3>
        <h4>Loves front-end</h4>
      </div>
      <div className='dev-entry'>
        <h1>Marco Andres Saavedra</h1>
        <h3>Data Base / Application programming interface</h3>
      </div>
      <div className='dev-entry'>
        <h1>Nathan Rodriguez</h1>
        <h3>Data Base</h3>
      </div>
      <div className='dev-entry'>
        <h1>Jason Griller</h1>
        <h3>Application programming interface</h3>
      </div>
      <div className='dev-entry'>
        <h1>Christian Rodriguez</h1>
        <h3>Front-end</h3>
      </div>
      <div className='dev-entry'>
        <h1>David Patenaude</h1>
        <h3>Database</h3>
      </div>
      */}
    </div>

  )
}

export default About;