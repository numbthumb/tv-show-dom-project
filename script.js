// Creates a page for episode's and show's data
function setup() {
  // createPageForAllShows(url);
  // createEpisodePage(url);
  getAllShowsData(allShows)
  // const allEpisodes = getAllEpisodes();
  // const allShows = getAllShows();
  // getEpisodeData(allEpisodes);
  // episodeSelectionBox(allEpisodes);

}

// Creates the page upon opening and lists all shows
let allShowsListing;
// let url = 'https://api.tvmaze.com/shows';
// const allShows = getAllShows();

// Outputs page for all shows data
function makePageForAllShows(showsList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${showsList.length} show(s)`;
}

function createPageForAllShows(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => { allShowsListing = data; 
  makePageForAllShows(allShowsListing)
  getEpisodeData(allEpisodes)
  episodeSelectionBox(allEpisodes) 
  console.log(data)
});
}
// function createPageForAllShows(url) {
//   fetch(url)
// }

// Outputs data to the page for all shows: Show title, image, summary and a link to the original data source
function getAllShowsData(allShowsList) {
  const rootElem = document.getElementById("root");
  allShowsList.forEach(shows => {
    let createShowsName = document.createElement("p");
    createShowsName.textContent = shows.name;
    rootElem.appendChild(createShowsName);

    let createShowImage = document.createElement("img");
    createShowImage.addEventListener("click", (event) => {
      url = `https://api.tvmaze.com/shows/${shows.id}/episodes`;
      const rootElem = document.getElementById("root");
      rootElem.textContent = " ";
      createPageForAllShows(url);
      createEpisodePage(url);
    })
    if(shows.image === null) {
      createShowImage.src= "https://tvguide1.cbsistatic.com/www/img/tvg-showcard-placeholder.jpg";
    }else{
      createShowImage.src = shows.image.medium;
    }
    createShowsName.appendChild(createShowImage);

    let summary = document.createElement("p");
    summary.innerHTML = shows.summary;
    createShowsName.appendChild(summary);
  
    let copyRight = document.createElement("a");
    copyRight.href = "https://tvmaze.com/";
    copyRight.textContent = "Click here for original source";
    createShowsName.appendChild(copyRight); 
  })
}





// Retrieve's the data for Game of thrones and creates a page for all episode's 
let allEpisodes;
let url = 'https://api.tvmaze.com/shows/82/episodes';
const allShows = getAllShows();
console.log(allShows);

// Outputs page for episode data
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

function createEpisodePage(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => { allEpisodes = data; 
  makePageForEpisodes(allEpisodes)
  getEpisodeData(allEpisodes)
  episodeSelectionBox(allEpisodes) 
  console.log(data)
});
}

function createAllShowsPage(url) {
  fetch(url)
}

// Outputs data to the page such as: Episode title, image, summary and a link to the original data source
function getEpisodeData (episodeList) {
  const rootElem = document.getElementById("root");
  let allShowsButton = document.getElementById("allShows");
  allShowsButton.addEventListener("click", (event) => {
   let rootElem = document.getElementById("root");
   rootElem.textContent = " ";
   setup();
  })
  episodeList.forEach(episode => {
  let createEpisodeName = document.createElement("p");
  createEpisodeName.textContent = episode.name;
  rootElem.appendChild(createEpisodeName);

  let createEpisodeImage = document.createElement("img");
  if(episode.image === null) {
    createEpisodeImage.src= "https://tvguide1.cbsistatic.com/www/img/tvg-showcard-placeholder.jpg";
  }else{
    createEpisodeImage.src = episode.image.medium;
  }
  createEpisodeName.appendChild(createEpisodeImage); 
  
  let seasonNumber = document.createElement("p");
  // seasonNumber.textContent = "Season: " + episode.season;
  seasonNumber.textContent = seasonProcessor(episode.season, episode.number);
  createEpisodeName.appendChild(seasonNumber);
  
  let summary = document.createElement("p");
  summary.innerHTML = episode.summary;
  createEpisodeName.appendChild(summary);

  let copyRight = document.createElement("a");
  copyRight.href = "https://tvmaze.com/";
  copyRight.textContent = "Click here for original source";
  createEpisodeName.appendChild(copyRight);
  });
 
}


// Processes season number with zero padded to two digits 
// Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
function seasonProcessor(seasonNumber, episodeNumber) {
if (seasonNumber < 10) {
  seasonNumber = "0" + seasonNumber;
}
if (episodeNumber < 10) {
  episodeNumber = "0" + episodeNumber;
}
  return `S${seasonNumber} E${episodeNumber}`; 
}


// Outputs a search bar to find episodes and narrow selection down
let searchForEpisodes = document.getElementById("searchBar");
searchForEpisodes.addEventListener("keyup", function (event) {
  searchBar(event.target.value.toLowerCase())
})

// let allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
function searchBar(searchFor) {

  let arrayForAllEpisodes = allEpisodes.filter(episode => {
    return episode.name.toLowerCase().includes(searchFor) || episode.summary.toLowerCase().includes(searchFor);
  })
  rootElem.textContent = "";
  getEpisodeData(arrayForAllEpisodes);
}

// Outputs a drop down box that displays an episode selector
function episodeSelectionBox (episodeSelection) {
  for (let i = 0; i < allEpisodes.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${seasonProcessor(allEpisodes[i].season, allEpisodes[i].number)} - ${allEpisodes[i].name}`;
    episodeSelector.appendChild(option);
  } 
}

let episodeSelector = document.getElementById("episodeSelector");
episodeSelector.addEventListener("change", (event) => { 
  const rootElem = document.getElementById("root");
  let episodeArrayNumber = allEpisodes[episodeSelector.value];
  let newArray = [];
  newArray.push(episodeArrayNumber)
  rootElem.textContent = "";
  getEpisodeData(newArray);


  // Returns user back to all episodes
  let backButton = document.getElementById("goBack");
  backButton.addEventListener("click", (event) => {
  let rootElem = document.getElementById("root");
  rootElem.textContent = " ";
  return setup();
  })
})

// Outputs a drop down box that displays all shows selector
let showSelector = document.getElementById("showSelector");
  let sortedShows = allShows.sort(sortByName);
    for (let i = 0; i < allShows.length; i++) {
      console.log(allShows[i]);
      let option = document.createElement("option");
      option.value = i;
      option.textContent = `${allShows[i].name}`;
      showSelector.appendChild(option);
    } 
    
    function clearDropdownBox (dropDownElement) {
      while(dropDownElement.options.length > 0) {
        dropDownElement.remove(0);
      } 
    }

  showSelector.addEventListener("change", (event) => { 
    clearDropdownBox(episodeSelector); 
    const rootElem = document.getElementById("root");
    let showArrayNumber = allShows[showSelector.value];
    url = `https://api.tvmaze.com/shows/${showArrayNumber.id}/episodes`
    rootElem.textContent = "";
    createEpisodePage(url);
})

function sortByName(a, b) {
const nameA = a.name.toLowerCase();
const nameB = b.name.toLowerCase();

let compare = 0;
if (nameA > nameB) {
  compare = 1;
} else if(nameA < nameB) {
  compare = -1;
}
return compare;
}
// let showAlphabeticalListing = allEpisodes[showSelector.value]
// let alphabeticalArray = []
// alphabeticalArray.sort(compare)


window.onload = setup;