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

const positions = {
    QB: "Quarterback",
    RB: "Running Back",
    WR: "Wide Receiver",
    TE: "Tight End",
    OT: "Offensive Tackle",
    OG: "Offensive Guard",
    C: "Center",

    DT: "Defensive Tackle",
    DE: "Defensive End",
    LB: "Line Backer",
    CB: "Cornerback",
    S: "Safety"
};
const resolvePosition = pos => {
    if (!positions[pos]) return pos;
    return positions[pos];
};
const formatPlayerData = data => {
    data.forEach(p => {
        const names = p.Name.split(" ");
        const firstName = names.splice(0, 1);
        const formatted = `${names.join(' ')}, ${firstName}`;
        p.Name = formatted;
        p.FullPosition = resolvePosition(p.Position);
    });
    return data.sort((p1, p2) => p1.Name.localeCompare(p2.Name));
};
const runFetch = url => {
    if (!url || !url.length) return Promise.reject("No url provided for fetch");

    console.log(`Retrieving results from: ${url}`);
    return (0, _nodeFetch2.default)(url).then(resp => {
        if (!resp.ok) {
            console.log(`Error retrieving from ${url}: ${resp.statusText}`);
            throw `Error retriving results: ${resp.statusText}`;
        }
        return resp.json();
    });
};
const API = {
    performFetch: url => {
        return runFetch(url);
    },
    searchPlayer: query => {
        if (!query || !query.length) return Promise.resolve([]);

        const fullUrl = `${URL.player}/search/?term=${query}`;
        return API.performFetch(fullUrl).then(data => {
            return formatPlayerData(data);
        });
    }
};
exports.default = API;