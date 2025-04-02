<template>
  <div class="trip-generator indian-pattern">
    <div class="hero-section">
      <h1>Where in India will you explore next?</h1>
      <p>Discover the incredible diversity of Indian destinations</p>
    </div>

    <div class="preference-form">
      <h2>Your Travel Preferences</h2>

      <div class="filter-grid">
        <div class="filter-group">
          <label for="region">Preferred Region</label>
          <select id="region" v-model="userPreferences.region">
            <option value="">Any Region</option>
            <option
              v-for="region in regions"
              :value="region.value"
              :key="region.value"
            >
              {{ region.name }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="budget">Budget</label>
          <select id="budget" v-model="userPreferences.budget">
            <option value="">Any Budget</option>
            <option value="low">Budget (₹)</option>
            <option value="medium">Mid-range (₹₹)</option>
            <option value="high">Luxury (₹₹₹)</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="type">Destination Type</label>
          <select id="type" v-model="userPreferences.type">
            <option value="">Any Type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city">City</option>
            <option value="countryside">Countryside</option>
            <option value="historical">Historical</option>
            <option value="spiritual">Spiritual</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="climate">Preferred Climate</label>
          <select id="climate" v-model="userPreferences.climate">
            <option value="">Any Climate</option>
            <option value="warm">Warm</option>
            <option value="temperate">Temperate</option>
            <option value="cold">Cold</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="duration">Trip Duration</label>
          <select id="duration" v-model="userPreferences.duration">
            <option value="">Any Duration</option>
            <option value="short">Weekend (2-3 days)</option>
            <option value="medium">Week (5-7 days)</option>
            <option value="long">Extended (10+ days)</option>
          </select>
        </div>
      </div>

      <button @click="generateTrip" class="generate-button">
        Discover Destinations
      </button>
    </div>

    <div v-if="trips.length > 0" class="trip-results">
      <h2>Recommended Indian Destinations</h2>
      <div class="trip-grid">
        <div v-for="(trip, index) in trips" :key="index" class="trip-card">
          <div class="trip-image-container">
            <img :src="trip.image" :alt="trip.name" class="trip-image" />
            <div class="trip-badge">{{ formatBudget(trip.budget) }}</div>
            <div class="region-badge">{{ trip.region }}</div>
          </div>
          <div class="trip-content">
            <h3>{{ trip.name }}</h3>
            <p class="trip-description">{{ trip.specialty }}</p>
            <div class="trip-meta">
              <span class="trip-type">{{ formatType(trip.type) }}</span>
              <span class="trip-climate">{{
                formatClimate(trip.climate)
              }}</span>
            </div>
            <div class="estimated-budget">
              Estimated Budget: {{ trip.estimatedBudget }}
            </div>
            <button @click="viewDetails(trip)" class="details-button">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <TripModal
      v-if="selectedTrip"
      :trip="selectedTrip"
      @close="selectedTrip = null"
      @save="saveTrip"
    />
  </div>
</template>

<script>
import TripModal from "./TripModal.vue";

export default {
  components: { TripModal },
  data() {
    return {
      userPreferences: {
        region: "",
        budget: "",
        type: "",
        climate: "",
        duration: "",
      },
      regions: [
        { name: "North India", value: "north" },
        { name: "South India", value: "south" },
        { name: "East India", value: "east" },
        { name: "West India", value: "west" },
        { name: "Central India", value: "central" },
        { name: "Northeast India", value: "northeast" },
      ],
      trips: [],
      selectedTrip: null,
      destinations: [
        {
          name: "Jaipur, Rajasthan",
          specialty: "The Pink City with magnificent forts and palaces",
          type: "historical",
          climate: "warm",
          budget: "medium",
          duration: "medium",
          region: "North",
          image: "https://source.unsplash.com/random/800x600/?jaipur",
          estimatedBudget: "₹15,000-₹25,000",
          historicalSignificance:
            "Founded in 1727 by Maharaja Sawai Jai Singh II",
          famousFor: "Hawa Mahal, Amber Fort, City Palace, Jantar Mantar",
          mustTry: "Dal Baati Churma, Ghewar, Pyaaz Kachori",
          nearbyPlaces: ["Ajmer", "Pushkar", "Ranthambore"],
          hostels: [
            "Zostel Jaipur",
            "Moustache Hostel",
            "The Hosteller Jaipur",
          ],
          restaurants: ["Laxmi Misthan Bhandar", "Suvarna Mahal", "1135 AD"],
        },
        {
          name: "Goa",
          specialty: "Tropical beaches and Portuguese heritage",
          type: "beach",
          climate: "warm",
          budget: "medium",
          duration: "short",
          region: "West",
          image: "https://source.unsplash.com/random/800x600/?goa",
          estimatedBudget: "₹20,000-₹35,000",
          historicalSignificance: "Former Portuguese colony for over 450 years",
          famousFor: "Beaches, nightlife, seafood, churches",
          mustTry: "Fish curry rice, Bebinca, Feni",
          nearbyPlaces: ["Gokarna", "Hampi", "Dudhsagar Falls"],
          hostels: [
            "The Hosteller Goa",
            "Roadhouse Hostels",
            "Goa Backpackers",
          ],
          restaurants: [
            "Pousada by the Beach",
            "Fisherman's Wharf",
            "Viva Panjim",
          ],
        },
        {
          name: "Kerala Backwaters",
          specialty: "Serene network of lagoons and lakes",
          type: "countryside",
          climate: "temperate",
          budget: "medium",
          duration: "medium",
          region: "South",
          image: "https://source.unsplash.com/random/800x600/?kerala",
          estimatedBudget: "₹18,000-₹30,000",
          historicalSignificance: "Ancient trading routes and unique ecosystem",
          famousFor: "Houseboats, coconut lagoons, Ayurveda",
          mustTry: "Karimeen pollichathu, Appam with stew, Toddy",
          nearbyPlaces: ["Kochi", "Munnar", "Varkala"],
          hostels: ["Zostel Alleppey", "Nomad's Hostel", "Greenpalms Homestay"],
          restaurants: [
            "Thaff Delicacy",
            "Cassia Restaurant",
            "Grand Hotel Restaurant",
          ],
        },
        {
          name: "Leh-Ladakh",
          specialty: "High-altitude desert with breathtaking landscapes",
          type: "mountain",
          climate: "cold",
          budget: "high",
          duration: "long",
          region: "North",
          image: "https://source.unsplash.com/random/800x600/?ladakh",
          estimatedBudget: "₹30,000-₹50,000",
          historicalSignificance: "Ancient Buddhist kingdom on the Silk Route",
          famousFor: "Pangong Lake, Nubra Valley, monasteries",
          mustTry: "Thukpa, Momos, Butter tea",
          nearbyPlaces: ["Nubra Valley", "Pangong Tso", "Kargil"],
          hostels: ["The Hosteller Leh", "Zostel Leh", "Pangong Inn"],
          restaurants: [
            "Gesmo Restaurant",
            "Bon Appetit",
            "Lamayuru Restaurant",
          ],
        },
        {
          name: "Varanasi, Uttar Pradesh",
          specialty: "Spiritual capital of India on the Ganges",
          type: "spiritual",
          climate: "warm",
          budget: "low",
          duration: "short",
          region: "North",
          image: "https://source.unsplash.com/random/800x600/?varanasi",
          estimatedBudget: "₹8,000-₹15,000",
          historicalSignificance:
            "One of the world's oldest continually inhabited cities",
          famousFor: "Ghats, Ganga Aarti, silk sarees",
          mustTry: "Kachori sabzi, Lassi, Banarasi paan",
          nearbyPlaces: ["Sarnath", "Allahabad", "Ayodhya"],
          hostels: [
            "Stops Hostel Varanasi",
            "Zostel Varanasi",
            "Bunked Up Hostel",
          ],
          restaurants: [
            "Brown Bread Bakery",
            "Deena Chaat Bhandar",
            "Pizzeria Vaatika Cafe",
          ],
        },
        {
          name: "Mumbai, Maharashtra",
          specialty: "Bustling metropolis with colonial heritage",
          type: "city",
          climate: "warm",
          budget: "medium",
          duration: "short",
          region: "West",
          image: "https://source.unsplash.com/random/800x600/?mumbai",
          estimatedBudget: "₹15,000-₹25,000",
          historicalSignificance: "Gateway of India with colonial architecture",
          famousFor: "Marine Drive, Bollywood, street food",
          mustTry: "Vada pav, Pav bhaji, Bhelpuri",
          nearbyPlaces: ["Lonavala", "Alibaug", "Matheran"],
          hostels: [
            "The Backpacker Panda",
            "Zostel Mumbai",
            "Airport Hostel Mumbai",
          ],
          restaurants: ["Bademiya", "Britannia & Co.", "The Bombay Canteen"],
        },
      ],
      savedTrips: [],
    };
  },
  methods: {
    generateTrip() {
      this.trips = this.destinations.filter((destination) => {
        return (
          (!this.userPreferences.region ||
            destination.region.toLowerCase() ===
              this.userPreferences.region.toLowerCase()) &&
          (!this.userPreferences.budget ||
            destination.budget === this.userPreferences.budget) &&
          (!this.userPreferences.type ||
            destination.type === this.userPreferences.type) &&
          (!this.userPreferences.climate ||
            destination.climate === this.userPreferences.climate) &&
          (!this.userPreferences.duration ||
            destination.duration === this.userPreferences.duration)
        );
      });

      if (this.trips.length === 0) {
        this.trips = [...this.destinations];
      }
    },
    formatBudget(budget) {
      const budgets = {
        low: "₹ Budget",
        medium: "₹₹ Mid-range",
        high: "₹₹₹ Luxury",
      };
      return budgets[budget] || budget;
    },
    formatClimate(climate) {
      const climates = {
        warm: "☀️ Warm",
        temperate: "🌤 Temperate",
        cold: "❄️ Cold",
      };
      return climates[climate] || climate;
    },
    formatType(type) {
      const types = {
        beach: "🏖️ Beach",
        mountain: "⛰️ Mountain",
        city: "🏙️ City",
        countryside: "🌄 Countryside",
        historical: "🏛️ Historical",
        spiritual: "🕉️ Spiritual",
      };
      return types[type] || type;
    },
    viewDetails(trip) {
      this.selectedTrip = trip;
    },
    saveTrip(trip) {
      this.savedTrips.push(trip);
      alert(`${trip.name} has been saved to your trips!`);
    },
  },
};
</script>

<style scoped>
.trip-generator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #a1e294;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.preference-form {
  background-color: #f6faf5;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--primary), var(--teal));
  color: white;
  border-radius: 16px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.preference-form h2 {
  margin-bottom: 1.5rem;
  color: var(--text-main);
  text-align: center;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-main);
}

.filter-group select {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1rem;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.generate-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.generate-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.trip-results {
  margin-top: 2rem;
}

.trip-results h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-main);
}

.trip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.trip-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.trip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.trip-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.trip-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.trip-card:hover .trip-image {
  transform: scale(1.05);
}

.trip-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
}

.region-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.trip-content {
  padding: 1.5rem;
}

.trip-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.trip-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.trip-meta {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.trip-type,
.trip-climate {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background-color: #f0f0f0;
}

.estimated-budget {
  margin: 0.5rem 0;
  font-weight: 500;
  color: var(--primary);
}

.details-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.details-button:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 768px) {
  .trip-generator {
    padding: 1rem;
  }

  .hero-section {
    padding: 3rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }

  .trip-grid {
    grid-template-columns: 1fr;
  }

  .generate-button {
    padding: 0.8rem;
  }
}
</style>
