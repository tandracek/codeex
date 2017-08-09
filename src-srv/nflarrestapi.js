import fetch from 'node-fetch';

const BASE_URL = 'http://NflArrest.com/api/v1/';
const URL = {
    player: BASE_URL + 'player',
    team: BASE_URL + 'team'
}


const runFetch = (url) => {
    if (!url || !url.length)
        return Promise.reject("No url provided for fetch");

    return fetch(url).then((resp) => {
        if (!resp.ok) {
            throw `Error retriving results: ${resp.statusText}`;
        }
        return resp.json();
    }).then((data) => {
        return data.sort((p1, p2) => p1.Name.localeCompare(p2.Name));
    });
}
export default {
    searchPlayer: (query) => {
        if (!query || !query.length)
            return Promise.resolve([]);

        const fullUrl = `${URL.player}/search/?term=${query}`;
        return runFetch(fullUrl);
    }
}