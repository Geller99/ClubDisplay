("use strict");
const selectedClubs = ["9002", "8003", "7002"];

/*
  The code below is a requester function,
  it basically does the same thing yours did but...
  this one you can reuse for whatever method and url you need in the future.
  It also covers two cases: 
    - resolve (you get the data successfully)
    - reject (the promise is not resolved but your code won't break, it will continue to run everything else)
*/
async function requester(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject(
          new Error("There has been an error", {
            status: this.status,
            statusText: xhr.statusText,
          })
        );
      }
    };
    xhr.send();
  });
}

/*
  The function below accepts as an argument 
  the club object with all the data,
  with it it prepares the html node and
  inserts it as you did before.
*/
const displayClub = (club) => {
  const countriesContainer = document.querySelector(".clubs");
  const html = `
        <article class="club">
        <img class="club__img" src="https://cdn.shortpixel.ai/spai/w_743+q_lossy+ret_img+to_webp/https://www.free-largeimages.com/wp-content/uploads/2014/12/Arsenal_logo-2.jpg" width="200"  />
        <div class="club__data">
          <h3 class="club__name">${club.name}</h3>
          <h4 class="club__stadium">${club.venue_name}</h4>
          <p class="club__row"><span>👫</span>${club.venue_capacity}</p>
          <p class="club__row"><span>🗣️</span>${club.founded}</p>
          <p class="club__row"><span>💰</span>${club.country}</p>
        </div>
        </article>
      `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
  return countriesContainer;
};

/*
  First, we want to get the club data,
  we need it to be an async function since
  we are waiting for the requester function
  to return what we need.
  I could have also do this directly in getData()
  but I thought it was going to be easier to read this way
*/
const getClubData = async (item) => {
  return requester(
    "GET",
    `https://data.football-api.com/v3/teams/${item}?Authorization=cfnR6LWc4i4MDFLlPJrajoa465c4qjF594kpIy4b`
  );
};

/*
  Second, we want the user to see the cards 
  when all the cards are already available...
  so we instruct our async code to wait until ALL promises
  are finished to return its input
*/
const getData = async () => {
  return Promise.all(
    selectedClubs.map((item) => {
      return getClubData(item);
    })
  );
};

/*
  The last piece of code here is calling the getData()
  as soon as the page is executed. ALL the promises
  are solved in the getData THEN the displayClub() function is called
  to inject the html and display the clubs.
*/
getData().then((data) => {
  data.map((item) => {
    return displayClub(item);
  });
});
