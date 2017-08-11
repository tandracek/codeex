const URI = "http://localhost:8000";
let lastAjaxQuery = "";
let lastAjaxResults = [];

const parseJson = (response) => {
    return new Promise((resolve, reject) => {
        response.json().then((data) => resolve({
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            json: data
        }));
    });
}
const API = {
    performFetch: (query) => {
        const q = encodeURIComponent(query);
        return fetch(`${URI}/player?q=${q}`).then(parseJson).then((response) => {
            if (!response.ok) {
                let msg = response.statusText;
                if (response.json.msg)
                    msg = response.json.msg;
                throw new Error(msg);
            }
            return response.json;
        });
    },
    pullFromCache: (query) => {
        return new Promise((resolve, reject) => {
            const filtered = lastAjaxResults.filter(p => p.Name.toLowerCase().includes(query.toLowerCase())).sort((p1, p2) => p1.Name.localeCompare(p2.Name));
            resolve(filtered);
        });
    },
    search: (query) => {
        if (!query || !query.length) {
            return Promise.resolve([]);
        }
        if (lastAjaxResults.length && lastAjaxQuery.length && query.includes(lastAjaxQuery)) {
            //Already have the results, simply filter
            return API.pullFromCache(query);
        }
        return API.performFetch(query).then((results) => {
            // Cache the results so if they simply add to the query we dont need to hit the server
            lastAjaxQuery = query;
            lastAjaxResults = results;  
            return results;
        });
    }
}
export default API;