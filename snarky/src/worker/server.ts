import express from 'express'
import { ExecuteJob } from './execute_job.js'
//const executeJob = require('./execute_job'); 
const app = express()
app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/run-job', async (req, res) => {
  console.log("run-job endpoint called");
  const body = req.body;
  console.log(body);

  // now call the execute job function
  const result = await ExecuteJob(body.input, body.methodName);
  res.send(result);
});

app.post('/pick-method', async (req, res) => {
  console.log("run-job endpoint called");
  const body = req.body;
  console.log(body);
  res.send("ok")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
