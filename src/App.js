const app = require("express")()
const PORT = 8000;
//const cors = require("cors")()
const startTime = new Date();

app.get("/", (req,res) => {
  res.status(200).send({resut: `server running on port : ${PORT} since: ${startTime}`} );
  res.end('Hello World');
})

app.listen(PORT, ()=>{console.log(`Server running on port:${PORT}`)});
// function App() {
//   return (
//     <div className="App">
//      <>Hello World!</>
//     </div>
//   );
// }

// export default App;
