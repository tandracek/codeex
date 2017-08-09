"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeSpotifyApi = require("node-spotify-api");

var _nodeSpotifyApi2 = _interopRequireDefault(_nodeSpotifyApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spotify = new _nodeSpotifyApi2.default({
    id: "b3c68d414390451ea7db100ffbb1a457",
    secret: "248606980a534bbf9dfb2ec5ffb7cbda"
});

exports.default = () => {
    spotify.search({ type: 'artist', query: 'jason' }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log("error!");
        console.log(err);
    });
};