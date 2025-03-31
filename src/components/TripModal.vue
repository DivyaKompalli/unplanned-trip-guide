<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">×</button>

      <div class="modal-header">
        <h2>{{ trip.name }}, {{ trip.country }}</h2>
        <div class="trip-meta">
          <span class="trip-type">{{ formatType(trip.type) }}</span>
          <span class="trip-climate">{{ formatClimate(trip.climate) }}</span>
          <span class="trip-budget">{{ formatBudget(trip.budget) }}</span>
        </div>
        <div class="estimated-budget">
          Estimated Total Budget: {{ trip.estimatedBudget }}
        </div>
      </div>

      <img :src="trip.image" :alt="trip.name" class="modal-image" />

      <div class="modal-body">
        <h3>About This Destination</h3>
        <p>{{ trip.specialty }}</p>

        <div class="details-section">
          <h3>Historical Significance</h3>
          <p>{{ trip.historicalSignificance }}</p>
        </div>

        <div class="details-section">
          <h3>Famous For</h3>
          <p>{{ trip.famousFor }}</p>
        </div>

        <div class="details-section">
          <h3>Must Try</h3>
          <p>{{ trip.mustTry }}</p>
        </div>

        <div class="details-section">
          <h3>Nearby Places to Visit</h3>
          <ul class="tips-list">
            <li v-for="(place, index) in trip.nearbyPlaces" :key="index">
              {{ place }}
            </li>
          </ul>
        </div>

        <div class="details-section">
          <h3>Recommended Hostels</h3>
          <ul class="tips-list">
            <li v-for="(hostel, index) in trip.hostels" :key="'hostel' + index">
              {{ hostel }}
            </li>
          </ul>
        </div>

        <div class="details-section">
          <h3>Top Restaurants</h3>
          <ul class="tips-list">
            <li
              v-for="(restaurant, index) in trip.restaurants"
              :key="'restaurant' + index"
            >
              {{ restaurant }}
            </li>
          </ul>
        </div>

        <div class="action-buttons">
          <button class="save-button" @click="saveTrip">Save This Trip</button>
          <button class="close-modal-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trip: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveTrip() {
      this.$emit("save", this.trip);
      this.closeModal();
    },
    formatType(type) {
      const types = {
        beach: "🏖️ Beach",
        mountain: "⛰️ Mountain",
        city: "🏙️ City",
        countryside: "🌄 Countryside",
        historical: "🏛️ Historical",
      };
      return types[type] || type;
    },
    formatClimate(climate) {
      const climates = {
        warm: "☀️ Warm Climate",
        temperate: "🌤️ Temperate Climate",
        cold: "❄️ Cold Climate",
      };
      return climates[climate] || climate;
    },
    formatBudget(budget) {
      const budgets = {
        low: "💰 Budget Friendly",
        medium: "💵 Mid-range",
        high: "💎 Luxury",
      };
      return budgets[budget] || budget;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  z-index: 10;
}

.modal-header {
  padding: 2rem 2rem 1rem;
}

.modal-header h2 {
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.trip-meta {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.trip-meta span {
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background-color: #f0f0f0;
}

.estimated-budget {
  margin: 0.5rem 0;
  font-weight: 500;
  color: var(--primary);
}

.modal-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.modal-body {
  padding: 1rem 2rem 2rem;
}

.modal-body h3 {
  color: var(--text-main);
  margin: 1.5rem 0 1rem;
}

.details-section {
  margin: 1.5rem 0;
}

.tips-list {
  list-style-type: none;
  padding-left: 0;
}

.tips-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 1.5rem;
}

.tips-list li:before {
  content: "•";
  color: var(--primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.save-button:hover {
  background-color: #d91a63;
}

.close-modal-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.close-modal-button:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 768px) {
  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
