
/* What this does
    -perform ajax search from query string
    -cache the last query string along with the last results retrieved from ajax
    -if just adding a letter to the query string, simply filter current results
     -how to handle large data loads?
      -maybe it gets cached on the back end, set some arbitrary limit for caching on front end
    -sort the list here or on back end? probably back end, no need to bog down the browser
*/
const URI = "localhost:8081";
let lastAjaxQuery = "";
let lastAjaxResults = [];
const testFetch = (url) => {
    const data = {
        "results": [
            {
                "id": 1,
                "name": "Jason Isbell"
            },
            {
                "id": 2,
                "name": "Drive-By Truckers"
            }
        ]
    }
    const response = new Response(JSON.stringify(data), {
        ok: true
    });
    return Promise.resolve(response);
}
export default (query) => {
    if (lastAjaxQuery.length && query.includes(lastAjaxQuery)) {
        //Already have the results, simply filter
    }

    //Perform the ajax call
    const q = encodeURIComponent(query);
    return testFetch(`${URI}?q=${q}`).then((response) => {
        if (!response.ok) {
            throw `Error retriving artist results: ${response.statusText}`;
        }
        return response.json();
    }).then((data) => {
        lastAjaxQuery = query;
        lastAjaxResults = data.results;
        return data.results;  
    });
}