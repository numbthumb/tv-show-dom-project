// Creates a page for episode's and episode data
function setup() {
  // const allEpisodes = getAllEpisodes();
  // const allShows = getAllShows();
  createEpisodePage(url);
  // getEpisodeData(allEpisodes);
  // episodeSelectionBox(allEpisodes);

}

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
  return setup();
  })
})

// Outputs a drop down box that displays all shows selector
let showSelector = document.getElementById("showSelector");
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


window.onload = setup;