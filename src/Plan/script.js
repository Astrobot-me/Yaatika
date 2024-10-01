let plc = [];

// Fetch the data after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  fetch("../../assets/data/places.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Add this to inspect the JSON structure
      if (data.tourist_places && Array.isArray(data.tourist_places)) {
        plc = data.tourist_places;
        // Populate the dropdowns after data is fetched
        populateDropdown("start-destination", plc);
        populateDropdown("end-destination", plc);
      } else {
        console.error(
          "Error: 'tourist_places' key is missing or not an array in the JSON file."
        );
      }
    })
    .catch((e) => {
      console.log("Fetch Error: ", e.message);
    });
});

// Function to populate dropdowns
function populateDropdown(id, places) {
  const dropdown = document.getElementById(id);
  // Clear any previous options
  dropdown.innerHTML = '<option value="">Select a Destination</option>';

  // Populate dropdown with places
  places.forEach((place) => {
    const option = document.createElement("option");
    option.value = place.city;
    option.text = `${place.place_name}, ${place.city}`;
    dropdown.appendChild(option);
  });
}

document
  .getElementById("travel-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect form values
    const startDestination = document.getElementById("start-destination").value;
    const endDestination = document.getElementById("end-destination").value;
    const tripDays = document.getElementById("trip-days").value;
    const startDate = document.getElementById("start-date").value;

    // Generate trip timeline using OpenAI API
    const timelineData = await generateTripTimeline(
      startDestination,
      endDestination,
      tripDays,
      startDate
    );

    // Parse and display the timeline data in the DOM
    const tripTimeline = document.getElementById("trip-timeline");
    tripTimeline.innerHTML = ""; // Clear previous timeline

    if (timelineData && timelineData.timeline) {
      let timelineHTML = `<h3 class="text-2xl font-bold text-gray-900 mb-4">Your AI-Generated Trip Timeline</h3>`;

      // Assuming the timeline is returned as an array of days in JSON format
      const timeline = JSON.parse(timelineData.timeline); // Convert to JSON if needed

      timeline.forEach((day, index) => {
        timelineHTML += `
          <div class="mb-4">
            <h4 class="text-lg font-semibold text-gray-700">Day ${
              index + 1
            } - ${day.title}</h4>
            <p class="text-gray-600">${day.description}</p>
          </div>
        `;
      });

      tripTimeline.innerHTML = timelineHTML;
    } else {
      tripTimeline.innerHTML = `<p class="text-red-500">Unable to generate a trip timeline. Please try again.</p>`;
    }
  });

// Handle form submission
// document.getElementById("travel-form").addEventListener("submit", function (event) {
//   event.preventDefault();

//   // Collect form values
//   const startDestination = document.getElementById("start-destination").value;
//   const endDestination = document.getElementById("end-destination").value;
//   const tripDays = document.getElementById("trip-days").value;
//   const startDate = document.getElementById("start-date").value;

//   // Filter places based on start and end destination
//   const startPlace = plc.find((place) => place.city === startDestination);
//   const endPlace = plc.find((place) => place.city === endDestination);

//   // Generate a trip plan based on the number of days
//   const tripTimeline = document.getElementById("trip-timeline");
//   tripTimeline.innerHTML = ""; // Clear previous timeline

//   // Validate that surrounding_places exists and is an array
//   if (startPlace && endPlace) {
//     let timelineHTML = `<h3 class="text-2xl font-bold text-gray-900 mb-4">Your Trip Timeline</h3>`;

//     if (Array.isArray(startPlace.surrounding_places) && startPlace.surrounding_places.length > 0) {
//       // Create timeline for each day
//       for (let i = 0; i < tripDays; i++) {
//         const day = i + 1;
//         const surroundingPlace = startPlace.surrounding_places[i % startPlace.surrounding_places.length];

//         timelineHTML += `
//           <div class="mb-4">
//             <h4 class="text-lg font-semibold text-gray-700">Day ${day} - ${surroundingPlace}</h4>
//             <p class="text-gray-600">Explore nearby: ${surroundingPlace}, enjoy the local attractions, and continue your journey.</p>
//           </div>
//         `;
//       }
//     } else {
//       // Handle case where surrounding_places is missing or empty
//       timelineHTML += `<p class="text-red-500">No nearby places to visit from ${startPlace.place_name}.</p>`;
//     }

//     // Add final day to the end destination
//     timelineHTML += `
//       <div class="mb-4">
//         <h4 class="text-lg font-semibold text-gray-700">Final Destination - ${endPlace.place_name}</h4>
//         <p class="text-gray-600">Reach your final destination, ${endPlace.place_name}, and enjoy the last part of your trip.</p>
//       </div>
//     `;

//     tripTimeline.innerHTML = timelineHTML;
//   } else {
//     tripTimeline.innerHTML = `<p class="text-red-500">Please select valid start and end destinations.</p>`;
//   }
// });

async function generateTripTimeline(
  startDestination,
  endDestination,
  tripDays,
  startDate
) {
  try {
    const response = await fetch(
      "http://localhost:7000/generate-trip-timeline",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDestination: startDestination,
          endDestination: endDestination,
          tripDays: tripDays,
          startDate: startDate,
        }),
      }
    );

    // console.log(response);
    
    if (!response.ok) {
      throw new Error("Failed to fetch trip timeline from OpenAI API");
    }

    const result = await response.json();
    console.log(result);
    
    return result; // The JSON response from OpenAI API
  } catch (error) {
    console.error("Error generating trip timeline:", error);
  }
}

document
  .getElementById("travel-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect form values
    const startDestination = document.getElementById("start-destination").value;
    const endDestination = document.getElementById("end-destination").value;
    const tripDays = document.getElementById("trip-days").value;
    const startDate = document.getElementById("start-date").value;

    // Generate trip timeline using OpenAI API
    const timelineData = await generateTripTimeline(
      startDestination,
      endDestination,
      tripDays,
      startDate
    );

    // Parse and display the timeline data in the DOM
    const tripTimeline = document.getElementById("trip-timeline");
    tripTimeline.innerHTML = ""; // Clear previous timeline

    if (timelineData && timelineData.jsonString.jsonString) {
      let timelineHTML = `<h3 class="text-2xl font-bold text-gray-900 mb-4">Your AI-Generated Trip Timeline</h3>`;

      // Assuming the timeline is returned as an array of days in JSON format
      const timeline = timelineData.jsonString.jsonString.travel_itinerary // Convert to JSON if needed

      timeline.forEach((day, index) => {
        timelineHTML += `
          <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6">
    <div class="md:w-1/3 bg-blue-500 p-4 text-white flex flex-col justify-between">
      <div>
        <h3 class="text-lg font-semibold">Day ${day.day} & Date ${day.date}</h3>
        <p class="mt-1">Start Location: ${day.start_location}</p>
        <p>End Location: ${day.end_location}</p>
      </div>
    </div>
    <div class="md:w-2/3 p-4">
      <h4 class="text-xl font-semibold mb-2">Places to Visit:</h4>
      <div class="mb-4">
        <h5 class="text-lg font-medium">${day.places_to_visit[0].place}</h5>
        <ul class="list-disc pl-6">
          <li>${day.places_to_visit[0].activities[0]}</li>
          <li>${day.places_to_visit[0].activities[1]}</li>
        </ul>
      </div>
      <div class="mb-4">
        <h5 class="text-lg font-medium">${day.places_to_visit[1].place}</h5>
        <ul class="list-disc pl-6">
          <li>${day.places_to_visit[1].activities[0]}</li>
          <li>${day.places_to_visit[1].activities[1]}</li>
       
        </ul>
      </div>
      <div class="mb-4">
        <h5 class="text-lg font-medium">${day.places_to_visit[2].place}</h5>
        <ul class="list-disc pl-6">
          <li>${day.places_to_visit[2].activities[0]}</li>
          <li>${day.places_to_visit[2].activities[1]}</li>
        </ul>
      </div>
    </div>
  </div>
        `;
      });

      tripTimeline.innerHTML = timelineHTML;
    } else {
      tripTimeline.innerHTML = `<p class="text-red-500">Unable to generate a trip timeline. Please try again.</p>`;
    }
  });
