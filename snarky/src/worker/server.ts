import express from 'express'
// import { ExecuteJob } from './execute_job'
const executeJob = require('./execute_job'); 
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/run-job', async (req, res) => {
  console.log("run-job endpoint called");
  console.log(`request is ${req}`);
  const body = req.body;
  // now call the execute job function
  const result = await executeJob.ExecuteJob(body.input, body.methodName);
  res.end(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
