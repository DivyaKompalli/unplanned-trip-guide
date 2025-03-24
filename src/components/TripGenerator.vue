<template>
  <section id="trip-generator" class="trip-generator">
    <h2>Plan Your Unplanned Trip!</h2>
    <div class="preference-form">
      <!-- Budget Filter -->
      <div class="filter-group">
        <label for="budget">Budget:</label>
        <select id="budget" v-model="userPreferences.budget">
          <option value="">Any</option>
          <option value="low">Low ($)</option>
          <option value="medium">Medium ($$)</option>
          <option value="high">High ($$$)</option>
        </select>
      </div>

      <!-- Destination Type Filter -->
      <div class="filter-group">
        <label for="type">Destination Type:</label>
        <select id="type" v-model="userPreferences.type">
          <option value="">Any</option>
          <option value="city">City</option>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="spiritual">Spiritual</option>
          <option value="nature">Nature</option>
        </select>
      </div>

      <!-- Climate Filter -->
      <div class="filter-group">
        <label for="climate">Climate:</label>
        <select id="climate" v-model="userPreferences.climate">
          <option value="">Any</option>
          <option value="tropical">Tropical</option>
          <option value="temperate">Temperate</option>
          <option value="cold">Cold</option>
          <option value="arid">Arid</option>
        </select>
      </div>

      <!-- Duration Filter -->
      <div class="filter-group">
        <label for="duration">Travel Duration:</label>
        <select id="duration" v-model="userPreferences.duration">
          <option value="">Any</option>
          <option value="short">Short (1-3 days)</option>
          <option value="medium">Medium (4-7 days)</option>
          <option value="long">Long (8+ days)</option>
        </select>
      </div>

      <!-- Family Friendly Filter -->
      <div class="filter-group">
        <label for="familyFriendly">Family Friendly:</label>
        <select id="familyFriendly" v-model="userPreferences.familyFriendly">
          <option value="">Any</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <!-- Adventure Level Filter -->
      <div class="filter-group">
        <label for="adventureLevel">Adventure Level:</label>
        <select id="adventureLevel" v-model="userPreferences.adventureLevel">
          <option value="">Any</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <!-- Cuisine Preference Filter -->
      <div class="filter-group">
        <label for="cuisinePreference">Cuisine Preference:</label>
        <select
          id="cuisinePreference"
          v-model="userPreferences.cuisinePreference"
        >
          <option value="">Any</option>
          <option value="indian">Indian</option>
          <option value="continental">Continental</option>
          <option value="chinese">Chinese</option>
          <option value="italian">Italian</option>
        </select>
      </div>

      <!-- Travel Mode Filter -->
      <div class="filter-group">
        <label for="travelMode">Travel Mode:</label>
        <select id="travelMode" v-model="userPreferences.travelMode">
          <option value="">Any</option>
          <option value="flight">Flight</option>
          <option value="train">Train</option>
          <option value="road">Road Trip</option>
        </select>
      </div>

      <!-- Accommodation Type Filter -->
      <div class="filter-group">
        <label for="accommodationType">Accommodation Type:</label>
        <select
          id="accommodationType"
          v-model="userPreferences.accommodationType"
        >
          <option value="">Any</option>
          <option value="hotel">Hotel</option>
          <option value="resort">Resort</option>
          <option value="homestay">Homestay</option>
        </select>
      </div>

      <!-- Generate Trip Button -->
      <button @click="generateTrip">Generate Trip</button>
    </div>

    <!-- Trip Results -->
    <div v-if="showResults" class="trip-results">
      <h3>Your Trip Suggestions:</h3>
      <div class="trip-grid">
        <div v-for="(trip, index) in trips" :key="index" class="trip-box">
          <h4>{{ trip.name }}</h4>
          <img
            :src="trip.image"
            alt="Destination Image"
            class="destination-image"
          />
          <p><strong>Description:</strong> {{ trip.specialty }}</p>
          <button @click="viewDetails(trip)">View Details</button>
        </div>
      </div>
    </div>

    <!-- Modal for Full Details -->
    <div v-if="selectedTrip" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h4>{{ selectedTrip.name }}</h4>
        <img
          :src="selectedTrip.image"
          alt="Destination Image"
          class="destination-image"
        />
        <p><strong>History:</strong> {{ selectedTrip.history }}</p>
        <p><strong>Specialty:</strong> {{ selectedTrip.specialty }}</p>
        <p>
          <strong>Must-Try Food Items:</strong>
          {{ selectedTrip.mustTryFood.join(", ") }}
        </p>
        <p>
          <strong>Must-Visit Spots:</strong>
          {{ selectedTrip.mustVisitSpots.join(", ") }}
        </p>
        <p>
          <strong>Things to do:</strong>
          {{ selectedTrip.activities.join(", ") }}
        </p>
        <p><strong>Budget:</strong> {{ selectedTrip.budget }}</p>
        <p><strong>Type:</strong> {{ selectedTrip.type }}</p>
        <p><strong>Climate:</strong> {{ selectedTrip.climate }}</p>
        <p><strong>Duration:</strong> {{ selectedTrip.duration }}</p>
        <p><strong>Weather:</strong> {{ selectedTrip.weather }}</p>
        <p><strong>Currency:</strong> {{ selectedTrip.currency }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      destinations: [
        {
          name: "Jaipur",
          activities: [
            "Visit the Hawa Mahal",
            "Explore Amber Fort",
            "Shop at Johari Bazaar",
          ],
          budget: "medium",
          type: "city",
          climate: "arid",
          duration: "medium",
          familyFriendly: "yes",
          adventureLevel: "low",
          history:
            "Jaipur, also known as the Pink City, was founded in 1727 by Maharaja Sawai Jai Singh II. It is renowned for its stunning forts, palaces, and vibrant culture.",
          specialty:
            "Jaipur is famous for its Rajasthani cuisine, traditional handicrafts, and the annual Jaipur Literature Festival.",
          mustTryFood: ["Dal Baati Churma", "Ghewar", "Laal Maas"],
          mustVisitSpots: ["Hawa Mahal", "Amber Fort", "City Palace"],
        },
        {
          name: "Goa",
          activities: [
            "Relax on the beaches",
            "Explore Old Goa churches",
            "Enjoy nightlife at clubs",
          ],
          budget: "low",
          type: "beach",
          climate: "tropical",
          duration: "short",
          familyFriendly: "yes",
          adventureLevel: "medium",
          history:
            "Goa was a Portuguese colony for over 450 years until it was liberated in 1961. It is known for its unique blend of Indian and Portuguese cultures.",
          specialty:
            "Goa is famous for its pristine beaches, seafood, and vibrant festivals like Carnival and Sunburn.",
          mustTryFood: ["Fish Curry Rice", "Bebinca", "Pork Vindaloo"],
          mustVisitSpots: [
            "Calangute Beach",
            "Basilica of Bom Jesus",
            "Dudhsagar Falls",
          ],
        },
        {
          name: "Varanasi",
          activities: [
            "Take a boat ride on the Ganges",
            "Visit Kashi Vishwanath Temple",
            "Attend the Ganga Aarti",
          ],
          budget: "low",
          type: "spiritual",
          climate: "temperate",
          duration: "short",
          familyFriendly: "yes",
          adventureLevel: "low",
          history:
            "Varanasi, one of the oldest living cities in the world, is a major pilgrimage site for Hindus. It is believed to be the abode of Lord Shiva.",
          specialty:
            "Varanasi is renowned for its spiritual significance, silk sarees, and the mesmerizing Ganga Aarti.",
          mustTryFood: ["Kachori Sabzi", "Malaiyo", "Baati Chokha"],
          mustVisitSpots: [
            "Kashi Vishwanath Temple",
            "Dashashwamedh Ghat",
            "Sarnath",
          ],
        },
        {
          name: "Leh-Ladakh",
          activities: [
            "Visit Pangong Lake",
            "Explore monasteries",
            "Go on a bike ride",
          ],
          budget: "high",
          type: "mountain",
          climate: "cold",
          duration: "long",
          familyFriendly: "no",
          adventureLevel: "high",
          history:
            "Leh-Ladakh has been a crossroads of trade routes for centuries. It is known for its Buddhist culture and stunning landscapes.",
          specialty:
            "Ladakh is famous for its breathtaking landscapes, adventure sports, and Tibetan cuisine.",
          mustTryFood: ["Thukpa", "Momos", "Butter Tea"],
          mustVisitSpots: ["Pangong Lake", "Nubra Valley", "Hemis Monastery"],
        },
        {
          name: "Kerala",
          activities: [
            "Stay in a houseboat",
            "Explore backwaters",
            "Visit tea plantations",
          ],
          budget: "medium",
          type: "nature",
          climate: "tropical",
          duration: "medium",
          familyFriendly: "yes",
          adventureLevel: "low",
          history:
            "Kerala, known as 'God's Own Country,' has a rich history of trade and cultural exchange. It is famous for its Ayurveda and traditional art forms.",
          specialty:
            "Kerala is renowned for its backwaters, coconut-based cuisine, and classical dance forms like Kathakali.",
          mustTryFood: [
            "Appam with Stew",
            "Puttu and Kadala Curry",
            "Karimeen Pollichathu",
          ],
          mustVisitSpots: [
            "Alleppey Backwaters",
            "Munnar Tea Gardens",
            "Kovalam Beach",
          ],
        },
      ],
      userPreferences: {
        budget: "",
        type: "",
        climate: "",
        duration: "",
        activities: "",
        familyFriendly: "",
        adventureLevel: "",
        cuisinePreference: "",
        travelMode: "",
        accommodationType: "",
      },
      trips: [], // Array to store multiple trip suggestions
      selectedTrip: null, // Store the selected trip for the modal
      showResults: false, // Control visibility of trip results
    };
  },
  methods: {
    async generateTrip() {
      console.log("Generate Trip button clicked!"); // Debugging

      let filteredDestinations = this.destinations;

      // Apply all filters
      Object.keys(this.userPreferences).forEach((key) => {
        if (this.userPreferences[key]) {
          filteredDestinations = filteredDestinations.filter(
            (dest) => dest[key] === this.userPreferences[key]
          );
        }
      });

      console.log("Filtered Destinations:", filteredDestinations); // Debugging

      // If no destinations match the filters, use all destinations
      if (filteredDestinations.length === 0) {
        filteredDestinations = this.destinations;
        console.log("No matching destinations. Using all destinations."); // Debugging
      }

      // If no destinations are available, show a message
      if (filteredDestinations.length === 0) {
        alert("No destinations available. Please adjust your preferences.");
        return;
      }

      // Generate 3 random trips from the filtered list
      const randomTrips = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(
          Math.random() * filteredDestinations.length
        );
        const randomDestination = filteredDestinations[randomIndex];

        console.log("Selected Destination:", randomDestination); // Debugging

        // Fetch additional data (weather, currency, image)
        try {
          randomDestination.weather = await this.fetchWeather(
            randomDestination.name
          );
          randomDestination.currency = await this.fetchCurrency(
            randomDestination.name
          );
          randomDestination.image = await this.fetchImage(
            randomDestination.name
          );
        } catch (error) {
          console.error("Error fetching data for destination:", error);
        }

        randomTrips.push(randomDestination);

        // Remove the selected destination to avoid duplicates
        filteredDestinations.splice(randomIndex, 1);
      }

      console.log("Generated Trips:", randomTrips); // Debugging

      this.trips = [...randomTrips]; // Force reactivity
      this.showResults = true; // Show the results section
    },

    async fetchWeather(city) {
      const apiKey = "fe2c6491ebea4b83b0b160354251303"; // Replace with your WeatherAPI key
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Weather API request failed");
        }
        const data = await response.json();
        return `${data.current.condition.text}, ${data.current.temp_c}°C`;
      } catch (error) {
        console.error("Error fetching weather:", error);
        return "Weather data unavailable";
      }
    },

    async fetchCurrency(city) {
      const apiKey = "b449c440830f4e319569925bbdf1d3df"; // Replace with your CurrencyFreaks key
      const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Currency API request failed");
        }
        const data = await response.json();
        return `Exchange rates: ${JSON.stringify(data.rates)}`;
      } catch (error) {
        console.error("Error fetching currency:", error);
        return "Currency data unavailable";
      }
    },

    async fetchImage(city) {
      const apiKey = "49455215-4b89bedb7bee40d52a40fd1c0"; // Replace with your Pixabay API key
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${city}&image_type=photo&per_page=1`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Pixabay API request failed");
        }
        const data = await response.json();
        if (data.hits.length > 0) {
          return data.hits[0].webformatURL; // Use the first image result
        } else {
          return "https://source.unsplash.com/400x300/?travel," + city; // Fallback image
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        return "https://source.unsplash.com/400x300/?travel," + city; // Fallback image
      }
    },

    saveTrip(trip) {
      const savedTrips = JSON.parse(localStorage.getItem("savedTrips") || "[]");
      savedTrips.push(trip);
      localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
      alert("Trip saved!");
    },
    viewDetails(trip) {
      this.selectedTrip = trip; // Set the selected trip for the modal
    },

    closeModal() {
      this.selectedTrip = null; // Close the modal by resetting the selected trip
    },
  },
};
</script>

<style scoped>
.trip-generator {
  padding: 60px 20px;
  text-align: center;
  background-color: #f9f9f9;
}

.preference-form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.filter-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.preference-form label {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.preference-form select,
.preference-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  font-size: 1rem;
}

button {
  padding: 12px 24px;
  background-color: #2575fc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6a11cb;
}

.trip-results {
  margin-top: 30px;
}

.trip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.trip-box {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.trip-box h4 {
  margin-bottom: 10px;
}

.destination-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  text-align: left;
}

.modal-content h4 {
  margin-bottom: 20px;
}

.modal-content img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.modal-content button {
  margin-top: 20px;
}
</style>
