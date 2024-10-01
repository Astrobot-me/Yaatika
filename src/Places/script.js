fetch("../../assets/data/places.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    const cardsContainer = document.getElementById("cards");

    // Loop through the data array (places) and create a card for each place
    data?.tourist_places?.forEach((place) => {
      const card = document.createElement("div");
      card.classList.add(
        "w-[100%]",
        "rounded-lg",
        "shadow-lg",
        "bg-white",
        "overflow-hidden",
        "hover:scale-105",
        "transition",
        "duration-500"
      );

      card.innerHTML = `
        <div class="w-[100%] flex rounded-lg shadow-lg bg-white overflow-hidden">
    <!-- Image (Thumbnail) -->
    <div class="w-1/3">
        <img class="w-full h-full object-cover" src="https://example.com/panchachuli.jpg" alt="${place.place_name}">
    </div>

    <!-- Card Content -->
    <div class="w-2/3 p-6">
        <!-- Place Name -->
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${place.place_name}</h2>

        <!-- Surrounding Place and Hype Index -->
        <p class="text-sm text-gray-600 mb-4">Located near: <strong>${place.surrounding_place}</strong> | Hype Index: <span class="text-yellow-500">${place.hype_index}/10</span></p>

        <!-- Description -->
        <p class="text-gray-700 mb-4">${place.description}</p>

        <!-- Best Time to Visit -->
        <p class="text-gray-900 mb-2"><strong>Best Time to Visit:</strong> ${place.best_time_to_visit}}</p>

        <!-- Activities -->
        <p class="text-gray-900 mb-2"><strong>Activities:</strong> ${place.activities.join(', ')}</p>

        <!-- Entry Fee -->
        <p class="text-gray-900 mb-2"><strong>Entry Fee:</strong> ${place.entry_fee}</p>

        <!-- Unique Products -->
        <p class="text-gray-900"><strong>Unique Products:</strong> ${place.unique_products.join(', ')}</p>

        <!-- Action Button -->
        <div class="mt-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Explore More</button>
        </div>
    </div>
</div>


      `;

      // Append the card to the container
      cardsContainer.appendChild(card);
    });
  })
  .catch((e) => {
    console.error("Error:", e.message);
  });
