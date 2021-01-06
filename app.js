
// This is to create my SERVER, an alternative of ExpressJS
const Hapi = require('hapi');
const fetch = require('node-fetch');





if(process.env.NODE_ENV !== 'production'){
  // if we are on developemnt, load the development variables
  require('dotenv').config();
}






// ----------------------------------creating SERVER
const server = new Hapi.Server({ "host": "localhost", "port": 5000 });







/* -----------------------------------------
.                   routes
----------------------------------------- */
/* -----------------------------------------
.            GET ALL  POPULAR MOVIES
.             go to localhost:5000/
----------------------------------------- */
server.route({
  method: "GET",
  path: "/",
  handler: async ()=>{
    try {
    
      const popularMoviesRes = await fetch(`${ process.env.ROOT_API_URL }/movie/popular?api_key=${ process.env.API_KEY }`)
      const popularMoviesData = await popularMoviesRes.json()
  
  
      return popularMoviesData;
  
  
    } catch (err) {
      return { msg: "Server Error!", error: err.message };
    }
  }
})






/* -----------------------------------------
.             SEARCH ANY MOVIE
.go to localhost:5000/search/ANY_MOVIE_NAME
----------------------------------------- */
server.route({
  method: "GET",
  path: "/search/{term}",
  handler: async (request)=>{
    try {
    
      const searchMoviesRes = await fetch(`${ process.env.ROOT_API_URL }/search/movie?query=${ request.params.term }&api_key=${ process.env.API_KEY }`)
      const searchMoviesData = await searchMoviesRes.json();
  
      return searchMoviesData;
  
  
    } catch (err) {
      return { msg: "Server Error!", error: err.message };
    }
  }
})






/* -----------------------------------------
.         GET DETAILS OF ANY MOVIE
.go to localhost:5000/details/ANY_MOVIE_ID
----------------------------------------- */
server.route({
  method: "GET",
  path: "/details/{id}",
  handler: async (request)=>{
    try {
    
      const movieDetailsRes = await fetch(`${ process.env.ROOT_API_URL }/movie/${ request.params.id }?api_key=${ process.env.API_KEY }`)
      const movieDetailsData = await movieDetailsRes.json()
  
      res.json(movieDetailsData);
  
    
  
    } catch (err) {
      return { msg: "Server Error!", error: err.message };
    }
  }
})




server.start();