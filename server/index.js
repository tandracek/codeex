'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 8000;

_app2.default.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});