'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_URL = 'http://NflArrest.com/api/v1/';
const URL = {
    player: BASE_URL + 'player',
    team: BASE_URL + 'team'
};

const runFetch = url => {
    if (!url || !url.length) return Promise.reject("No url provided for fetch");

    return (0, _nodeFetch2.default)(url).then(resp => {
        if (!resp.ok) {
            throw `Error retriving results: ${resp.statusText}`;
        }
        return resp.json();
    }).then(data => {
        return data.sort((p1, p2) => p1.Name.localeCompare(p2.Name));
    });
};
exports.default = {
    searchPlayer: query => {
        if (!query || !query.length) return Promise.reject("No player name provided");

        const fullUrl = `${URL.player}/search/?term=${query}`;
        return runFetch(fullUrl);
    }
};