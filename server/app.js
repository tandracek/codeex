'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nflarrestapi = require('./nflarrestapi');

var _nflarrestapi2 = _interopRequireDefault(_nflarrestapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'build')));

const buildErrResp = msg => {
  const payload = {
    msg: msg
  };
  return payload;
};
app.get('/player', (req, res) => {
  if (Object.keys(req.query) == 0 || !req.query.q) {
    res.status(400).send(buildErrResp(`No player name found for search.`));
    return;
  }

  _nflarrestapi2.default.searchPlayer(req.query.q).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(400).send(buildErrResp(`Error retrieving players: ${err}`));
  });
});

app.get('*', (req, res) => {
  res.sendFile(_path2.default.resolve(__dirname, '..', 'build', 'index.html'));
});

exports.default = app;