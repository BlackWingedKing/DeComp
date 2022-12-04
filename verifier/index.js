import express from 'express'
import cors from 'cors';
import {doVerify} from './verify.js';

const app = express()
app.use(express.json())
app.use(cors({
  origin: '*'
}));

const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/verify', async (req, res) => {
  console.log("verify endpoint called");
  const body = req.body;
  const {vk, proof} = body;
  console.log("trying to verify")
  const ok = await doVerify(proof, vk);
  const out = {verified: ok};
  console.log(out);
  res.send(out);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
});
