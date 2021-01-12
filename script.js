  
'use strict';

const getClubData = function(club) {  // create a reusable club generating function

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.clubs');

const request = new XMLHttpRequest();  // doing ajax in js old school 
request.open('GET', `https://data.football-api.com/v3/teams/${club}?Authorization=cfnR6LWc4i4MDFLlPJrajoa465c4qjF594kpIy4b`);  
// opened a Get request

request.send(); // sendoff request to said url


//how do we access and store async result?
request.addEventListener('load', function(){
const [data] = JSON.parse(this.responseText);   //destructure and parse the data received from the API
console.log(data);

// then apply html template literal to store information in
const html = `
<article class="club">
<img class="club__img" src="https://cdn.shortpixel.ai/spai/w_743+q_lossy+ret_img+to_webp/https://www.free-largeimages.com/wp-content/uploads/2014/12/Arsenal_logo-2.jpg" width="200"  />
<div class="club__data">
  <h3 class="club__name">${data.name}</h3>
  <h4 class="club__stadium">${data.venue_name}</h4>
  <p class="club__row"><span>👫</span>${data.venue_capacity}</p>
  <p class="club__row"><span>🗣️</span>${data.founded}</p>
  <p class="club__row"><span>💰</span>${data.country}</p>
</div>
</article>
`;

countriesContainer.insertAdjacentHTML('beforeend', html);  // insert this into the page
countriesContainer.style.opacity = 1;

});

};

getClubData('9002'); // running AJAX calls in parallel
getClubData('8003');
getClubData('7002');
// storing result in a regular variable wont work since its not there yet
// but using an async onLoad ensures we display the data once its recieved  -- 
// equivalent of storing books on user keyPress

//CORS -  cross origin resource sharing 
// API endpoint is the needed URL 

