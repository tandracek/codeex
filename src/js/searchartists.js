const URI = "http://localhost:8000";
let lastAjaxQuery = "";
let lastAjaxResults = [];

const testFetch = (url) => {
    const data = [
        {
            Name: "Aaron Rodgers",
            Position: "QB",
            FullPosition: "Quarterback",
            arrest_count: 0
        },
        {
            Name: "Jordy Nelson",
            Position: "WR",
            FullPosition: "Wide Receiver",
            arrest_count: 2
        },
        {
            Name: "Randall Cobb",
            Position: "WR",
            FullPosition: "Wide Receiver",
            arrest_count: 1
        },
        {
            Name: "Mike Daniels",
            Position: "DT",
            FullPosition: "Defensive Tackle",
            arrest_count: 0
        }
    ];
    const response = new Response(JSON.stringify(data), {
        ok: true
    });
    return Promise.resolve(response);
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
    return testFetch(`${URI}/player?q=${q}`).then((response) => {
        if (!response.ok) {
            throw `Error retriving player results: ${response.statusText}`;
        }
        return response.json();
    }).then((data) => {
        lastAjaxQuery = query;
        lastAjaxResults = data;
        return data;  
    });
}