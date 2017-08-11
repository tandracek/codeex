# NFL Arrest API Search

Basic responsive web app that filters player search results from the NFL arrest API at http://nflarrest.com/api/.
It is built using React for it's frontend and express as the backend that serves up the HTML and makes the API call.

###### To run locally after cloning
```
npm install
npm run build
node server
```
###### Then go to localhost:8000/

#### Libraries/Frameworks used
##### Frontend
- React
- react-responsive-modal for displaying a modal for error messages
- babel for using certain es6 features
- skeleton css framework (slightly modified) for responsive grid

##### Backend
- Express
- node-fetch for making the call to the API
- mocha for testing
- sinon also for testing