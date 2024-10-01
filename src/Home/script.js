// import User from "

const searchbtn = document.getElementById("searchbtn");
const searchbar = document.getElementById("searchbox");
const resultsContainer = document.getElementById("results");

async function handleChange(event) {
  resultsContainer.style.display = "none";
  fetch("../../assets/data/places.json")
    .then((response) => response.json())
    .then((data) => {
      
      resultsContainer.innerHTML = "";

      console.log(event.target.value);
      let query = event.target.value;
      //   let result;
      if (query != "") {
        let result = data?.tourist_places?.filter((item) => {
          if (item.city.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
          return false;
        });
        console.log(`result ${result}`);

        if (result.length > 0) {
          result.forEach((item) => {
            resultsContainer.style.display = 'block';
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultItem.textContent = `${item.city} & ${item.place_name}`;
            resultsContainer.appendChild(resultItem);
          });
        } else {
          // No results found message
          resultsContainer.style.display = "block";
          const noResultItem = document.createElement("div");
          noResultItem.classList.add("result-item");
          noResultItem.textContent = "No results found";
          resultsContainer.appendChild(noResultItem);
        }
      }
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
}

document.addEventListener("click", function (event) {
  const isClickInside =
    searchbar.contains(event.target) || resultsContainer.contains(event.target);
  if (!isClickInside) {
    resultsContainer.style.display = "none";
  }
});

function handleSearchbar() {
  console.log(searchbar.value);
}

searchbar.addEventListener("input", handleChange);
