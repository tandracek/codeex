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
export default (query) => {
    if (!query || !query.length) {
        return Promise.resolve([]);
    }
    if (lastAjaxResults.length && lastAjaxQuery.length && query.includes(lastAjaxQuery)) {
        //Already have the results, simply filter
        return new Promise((resolve, reject) => {
            const filtered = lastAjaxResults.filter(p => p.Name.toLowerCase().includes(query.toLowerCase())).sort((p1, p2) => p1.Name.localeCompare(p2.Name));
            resolve(filtered);
        });
    }

    //Perform the ajax call
    const q = encodeURIComponent(query);
    return fetch(`${URI}/player?q=${q}`).then(parseJson).then((response) => {
        if (!response.ok) {
            let msg = response.statusText;
            if (response.json.msg)
                msg = response.json.msg;
            throw new Error(msg);
        }
        lastAjaxQuery = query;
        lastAjaxResults = response.json;
        return response.json;  
    });
}