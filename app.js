const express = require('express')
const app = express()
const port = 3001

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
const transactions = require("./models/transactions");
const cors = require('cors')
app.use(cors())
app.use(express.json())

// INDEX
app.get("/", (req, res) => {
    res.json(transactions);
  });

  // SHOW
  app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );

    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

  // CREATE
  app.post("/", (req, res) => {
    const newTransaction = {id: transactions.length, ...req.body};
    transactions.push(newTransaction);
    res.status(201).json(newTransaction); // Return created transaction with ID
  });

  // DELETE
  app.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = transactions.findIndex(
      (transaction) => transaction.id === id
    );

    if (index !== -1) {
      const deletedTransaction = transactions.splice(index, 1);
      for(const transaction of transactions){
        if(transaction.id > index){
          transaction.id--
        }
      }
      res.status(200).json(deletedTransaction);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

  // UPDATE
  app.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = transactions.findIndex(
      (transaction) => transaction.id === id
    );

    const newData = req.body

    for(const key in newData){
      if(transactions[index][key] !== newData){
        transactions[index][key] = newData[key]
      }
    }
    

    if (index !== -1) {
        res.status(200).json(transactions[index]);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

module.exports = app