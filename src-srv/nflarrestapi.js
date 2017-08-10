import fetch from 'node-fetch';

/* Performs the API call to retrieve the players
*/

const BASE_URL = 'http://NflArrest.com/api/v1/';
const URL = {
    player: BASE_URL + 'player',
    team: BASE_URL + 'team'
}

/* Converts the 2 character position to the full position */
const positions = {
    QB: "Quarterback",
    RB: "Running Back",
    FB: "Fullback",
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
}
const resolvePosition = (pos) => {
    if (!positions[pos])
        return pos;
    return positions[pos];
}

/* Will modify the data slightly to be more readable, then sort the data */
const formatPlayerData = (data) => {
    data.forEach((p) => {
        const names = p.Name.split(" ");
        const firstName = names.splice(0, 1);
        const formatted = `${names.join(' ')}, ${firstName}`;
        p.Name = formatted;
        p.FullPosition = resolvePosition(p.Position);
    });
    return data.sort((p1, p2) => p1.Name.localeCompare(p2.Name));
}

/* Performs the network call */
const runFetch = (url) => {
    if (!url || !url.length)
        return Promise.reject("No url provided for fetch");

    console.log(`Retrieving results from: ${url}`);
    return fetch(url).then((resp) => {
        if (!resp.ok) {
            console.log(`Error retrieving from ${url}: ${resp.statusText}`);
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

/* Simple functional methods for performing the search */
const API = {
    performFetch: (url) => {
        return runFetch(url);
    },
    searchPlayer: (query) => {
        if (!query || !query.length)
            return Promise.resolve([]);

        const fullUrl = `${URL.player}/search/?term=${query}`;
        return API.performFetch(fullUrl).then((data) => {
            return formatPlayerData(data);
        });
    }
}
export default API;