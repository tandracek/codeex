import express from 'express';
import path from 'path';
import nflArrestApi from './nflarrestapi';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, '..', 'build')));

const buildErrResp = (msg) => {
  const payload = {
    msg: msg
  }
  return payload;
}
app.get('/player', (req, res) => {
  if (Object.keys(req.query) == 0 || !req.query.q) {
    res.status(400).send(buildErrResp(`No player name found for search.`));
    return;
  }

  nflArrestApi.searchPlayer(req.query.q).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(400).send(buildErrResp(err.message));
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

export default app;