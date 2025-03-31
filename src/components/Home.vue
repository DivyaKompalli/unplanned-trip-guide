<template>
  <div class="home-container">
    <!-- Background with overlay -->
    <div class="background-image"></div>
    <div class="overlay"></div>

    <!-- Main content -->
    <div class="content">
      <h1 class="title">✈️ TravelPlanner</h1>
      <p class="subtitle">Where will your next adventure take you?</p>

      <div class="choice-container">
        <h2>Plan your perfect trip</h2>
        <div class="choice-buttons">
          <button @click="selectTripType('planned')" class="choice-btn planned">
            <font-awesome-icon icon="calendar-check" />
            <span>Planned Trip</span>
            <p>I know exactly what I want</p>
          </button>

          <button
            @click="selectTripType('unplanned')"
            class="choice-btn unplanned"
          >
            <font-awesome-icon icon="compass" />
            <span>Unplanned Trip</span>
            <p>Surprise me with ideas</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Planned Trip Modal -->
    <div v-if="showPlannedModal" class="modal-overlay" @click.self="closeModal">
      <div class="planned-modal">
        <button @click="closeModal" class="close-btn">&times;</button>
        <h3>Your Planned Trip Details</h3>

        <div class="budget-section">
          <h4>
            Estimated Total Budget:
            <span class="budget-amount">$1,200 - $1,800</span>
          </h4>
          <div class="budget-breakdown">
            <div class="budget-item">
              <font-awesome-icon icon="plane" />
              <span>Flights: $400-$600</span>
            </div>
            <div class="budget-item">
              <font-awesome-icon icon="hotel" />
              <span>Accommodation: $500-$800</span>
            </div>
            <div class="budget-item">
              <font-awesome-icon icon="utensils" />
              <span>Food & Activities: $300-$400</span>
            </div>
          </div>
        </div>

        <div class="hotels-section">
          <h4>Recommended Hotels</h4>
          <div
            class="hotel-card"
            v-for="(hotel, index) in recommendedHotels"
            :key="index"
          >
            <img :src="hotel.image" :alt="hotel.name" class="hotel-image" />
            <div class="hotel-info">
              <h5>{{ hotel.name }}</h5>
              <div class="hotel-rating">
                <font-awesome-icon
                  icon="star"
                  v-for="n in 5"
                  :key="n"
                  :class="{ filled: n <= hotel.rating }"
                />
              </div>
              <p class="hotel-price">${{ hotel.price }}/night</p>
              <button class="book-btn">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      showPlannedModal: false,
      recommendedHotels: [
        {
          name: "Grand Plaza Hotel",
          rating: 4,
          price: 180,
          image: "https://source.unsplash.com/random/300x200/?hotel,1",
        },
        {
          name: "Seaside Resort",
          rating: 5,
          price: 250,
          image: "https://source.unsplash.com/random/300x200/?resort,1",
        },
        {
          name: "Urban Loft Apartments",
          rating: 3,
          price: 120,
          image: "https://source.unsplash.com/random/300x200/?apartment,1",
        },
      ],
    };
  },
  methods: {
    selectTripType(type) {
      if (type === "planned") {
        this.showPlannedModal = true;
      } else {
        this.$emit("select-unplanned");
      }
    },
    closeModal() {
      this.showPlannedModal = false;
    },
  },
};
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://source.unsplash.com/random/1920x1080/?travel,destination");
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.title {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.choice-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.choice-container h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.choice-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.choice-btn {
  flex: 1;
  min-width: 250px;
  padding: 2rem;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.choice-btn svg {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.choice-btn p {
  font-weight: normal;
  font-size: 1rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.choice-btn.planned {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
}

.choice-btn.unplanned {
  background: linear-gradient(135deg, #ec4899, #f59e0b);
}

.choice-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.planned-modal {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  color: #333;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.budget-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.budget-amount {
  color: #3b82f6;
  font-weight: bold;
}

.budget-breakdown {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.budget-item {
  flex: 1;
  min-width: 200px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hotels-section {
  margin-top: 2rem;
}

.hotel-card {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 10px;
  background: #f8fafc;
  align-items: center;
}

.hotel-image {
  width: 120px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
}

.hotel-info {
  flex: 1;
  text-align: left;
}

.hotel-rating {
  color: #f59e0b;
  margin: 0.3rem 0;
}

.hotel-rating .filled {
  color: #f59e0b;
}

.hotel-rating svg:not(.filled) {
  color: #ddd;
}

.hotel-price {
  font-weight: bold;
  color: #3b82f6;
  margin: 0.3rem 0;
}

.book-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .choice-buttons {
    flex-direction: column;
  }

  .hotel-card {
    flex-direction: column;
    text-align: center;
  }

  .hotel-info {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 2rem 1rem;
  }

  .choice-btn {
    min-width: 100%;
  }

  .budget-item {
    min-width: 100%;
  }
}
</style>
