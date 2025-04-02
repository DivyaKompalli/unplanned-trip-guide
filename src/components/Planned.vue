<template>
  <div class="planned-trip">
    <div class="trip-container">
      <transition name="fade-slide">
        <div v-if="estimateGenerated" class="trip-details-section">
          <h1>Your Indian Trip Details</h1>

          <div class="budget-summary">
            <h2>
              Estimated Total Budget: ₹{{ budgetRanges.total.min }} - ₹{{
                budgetRanges.total.max
              }}
            </h2>
            <div class="budget-breakdown">
              <div class="budget-item">
                <span class="category">Flights/Trains:</span>
                <span class="price-range"
                  >₹{{ budgetRanges.flights.min }}-₹{{
                    budgetRanges.flights.max
                  }}</span
                >
              </div>
              <div class="budget-item">
                <span class="category">Accommodation:</span>
                <span class="price-range"
                  >₹{{ budgetRanges.accommodation.min }}-₹{{
                    budgetRanges.accommodation.max
                  }}</span
                >
              </div>
              <div class="budget-item">
                <span class="category">Food & Activities:</span>
                <span class="price-range"
                  >₹{{ budgetRanges.foodActivities.min }}-₹{{
                    budgetRanges.foodActivities.max
                  }}</span
                >
              </div>
            </div>
          </div>

          <div class="recommended-hotels">
            <h2>Recommended Stays</h2>
            <div class="hotel-list">
              <div
                class="hotel-card"
                v-for="hotel in recommendedHotels"
                :key="hotel.name"
              >
                <div class="hotel-info">
                  <h3>{{ hotel.name }}</h3>
                  <div class="hotel-details">
                    <span class="price">₹{{ hotel.price }}/night</span>
                    <button class="book-now">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="travel-tips">
            <h2>Travel Tips for {{ tripDetails.destination }}</h2>
            <ul class="tips-list">
              <li>Best time to visit: {{ travelTips.bestTime }}</li>
              <li>Local cuisine to try: {{ travelTips.localCuisine }}</li>
              <li>Must-see attractions: {{ travelTips.attractions }}</li>
              <li>Transport tips: {{ travelTips.transport }}</li>
            </ul>
          </div>
        </div>
      </transition>

      <div class="trip-form-section">
        <h1>🕌 Plan Your Indian Journey</h1>
        <p class="subtitle">
          Estimate your budget for exploring incredible India
        </p>

        <div class="trip-form-container">
          <form @submit.prevent="generateEstimate" class="trip-form">
            <div class="form-group floating">
              <input
                id="destination"
                v-model="tripDetails.destination"
                type="text"
                placeholder=" "
                required
                class="form-input"
              />
              <label for="destination">Destination (City/State)</label>
              <span class="icon">📍</span>
            </div>

            <div class="form-row">
              <div class="form-group floating">
                <input
                  id="duration"
                  v-model="tripDetails.duration"
                  type="number"
                  min="1"
                  placeholder=" "
                  required
                  class="form-input"
                />
                <label for="duration">Duration (days)</label>
                <span class="icon">📅</span>
              </div>

              <div class="form-group floating">
                <input
                  id="travelers"
                  v-model="tripDetails.travelers"
                  type="number"
                  min="1"
                  placeholder=" "
                  required
                  class="form-input"
                />
                <label for="travelers">Travelers</label>
                <span class="icon">👥</span>
              </div>
            </div>

            <div class="form-group">
              <label class="budget-label">Budget Level</label>
              <div class="budget-options">
                <button
                  type="button"
                  :class="{ active: tripDetails.budgetLevel === 'low' }"
                  @click="tripDetails.budgetLevel = 'low'"
                >
                  <span class="price-indicator">₹</span>
                  <span>Budget</span>
                </button>
                <button
                  type="button"
                  :class="{ active: tripDetails.budgetLevel === 'medium' }"
                  @click="tripDetails.budgetLevel = 'medium'"
                >
                  <span class="price-indicator">₹₹</span>
                  <span>Mid-range</span>
                </button>
                <button
                  type="button"
                  :class="{ active: tripDetails.budgetLevel === 'high' }"
                  @click="tripDetails.budgetLevel = 'high'"
                >
                  <span class="price-indicator">₹₹₹</span>
                  <span>Luxury</span>
                </button>
              </div>
            </div>

            <button type="submit" class="generate-button">
              <span>Generate Estimate</span>
              <span class="icon">🧮</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripDetails: {
        destination: "",
        duration: 7,
        travelers: 1,
        budgetLevel: "medium",
      },
      estimateGenerated: false,
      budgetRanges: {
        total: { min: 0, max: 0 },
        flights: { min: 0, max: 0 },
        accommodation: { min: 0, max: 0 },
        foodActivities: { min: 0, max: 0 },
      },
      recommendedHotels: [],
      travelTips: {
        bestTime: "",
        localCuisine: "",
        attractions: "",
        transport: "",
      },
    };
  },
  methods: {
    generateEstimate() {
      // Calculate based on budget level
      const budgetFactors = {
        low: { base: 0.7, range: 0.2 },
        medium: { base: 1, range: 0.3 },
        high: { base: 1.5, range: 0.4 },
      };

      const factor = budgetFactors[this.tripDetails.budgetLevel];
      const duration = this.tripDetails.duration;
      const travelers = this.tripDetails.travelers;

      // Flight calculations
      const flightBase = 8000;
      this.budgetRanges.flights = {
        min: Math.round(flightBase * factor.base),
        max: Math.round(flightBase * (factor.base + factor.range)),
      };

      // Accommodation calculations
      const accomBase = 2000 * duration;
      this.budgetRanges.accommodation = {
        min: Math.round(accomBase * factor.base),
        max: Math.round(accomBase * (factor.base + factor.range)),
      };

      // Food & Activities calculations
      const foodBase = 1500 * duration * travelers;
      this.budgetRanges.foodActivities = {
        min: Math.round(foodBase * factor.base),
        max: Math.round(foodBase * (factor.base + factor.range)),
      };

      // Total budget
      this.budgetRanges.total = {
        min:
          this.budgetRanges.flights.min +
          this.budgetRanges.accommodation.min +
          this.budgetRanges.foodActivities.min,
        max:
          this.budgetRanges.flights.max +
          this.budgetRanges.accommodation.max +
          this.budgetRanges.foodActivities.max,
      };

      // Set recommended hotels
      this.setRecommendedHotels();

      // Set travel tips based on destination
      this.setTravelTips();

      this.estimateGenerated = true;
    },
    setRecommendedHotels() {
      if (this.tripDetails.budgetLevel === "low") {
        this.recommendedHotels = [
          { name: "OYO Townhouse", price: 1200 },
          { name: "Treebo Trend", price: 1800 },
          { name: "Zostel Hostel", price: 800 },
        ];
      } else if (this.tripDetails.budgetLevel === "medium") {
        this.recommendedHotels = [
          { name: "Taj Vivanta", price: 4500 },
          { name: "Radisson Blu", price: 5500 },
          { name: "Lemon Tree Premier", price: 3800 },
        ];
      } else {
        this.recommendedHotels = [
          { name: "Taj Palace", price: 12000 },
          { name: "Oberoi Udaivilas", price: 25000 },
          { name: "Amanbagh", price: 30000 },
        ];
      }
    },
    setTravelTips() {
      // This would ideally be more dynamic based on the destination
      this.travelTips = {
        bestTime: "October to March (pleasant weather)",
        localCuisine: "Try local street food and regional specialties",
        attractions:
          "Historical sites, local markets, and cultural experiences",
        transport: "Use app-based cabs or metro where available",
      };

      if (this.tripDetails.destination.toLowerCase().includes("goa")) {
        this.travelTips = {
          bestTime: "November to February",
          localCuisine: "Fish curry rice, Bebinca, Goan sausages",
          attractions: "Beaches, Fort Aguada, Old Goa churches",
          transport: "Rent a scooter or use local taxis",
        };
      } else if (
        this.tripDetails.destination.toLowerCase().includes("rajasthan")
      ) {
        this.travelTips = {
          bestTime: "October to March",
          localCuisine: "Dal Baati Churma, Laal Maas, Ghewar",
          attractions: "Jaipur forts, Udaipur lakes, Jaisalmer desert",
          transport: "Private car with driver recommended",
        };
      } else if (
        this.tripDetails.destination.toLowerCase().includes("kerala")
      ) {
        this.travelTips = {
          bestTime: "September to March",
          localCuisine: "Appam with stew, Sadya, Karimeen pollichathu",
          attractions: "Backwaters, tea gardens, Kathakali performances",
          transport: "Houseboats for backwaters, taxis for hill stations",
        };
      }
    },
  },
};
</script>

<style scoped>
.planned-trip {
  font-family: "Poppins", sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
}

.trip-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
}

.trip-details-section {
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.trip-details-section h1 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
  border-bottom: 2px solid var(--primary);
  padding-bottom: 10px;
}

.budget-summary h2 {
  font-size: 18px;
  color: var(--secondary);
  margin-bottom: 15px;
  font-weight: 500;
}

.budget-breakdown {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 25px;
  border-left: 4px solid var(--primary);
}

.budget-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
}

.budget-item:last-child {
  border-bottom: none;
}

.category {
  color: #555;
  font-weight: 500;
}

.price-range {
  color: var(--primary);
  font-weight: 600;
}

.recommended-hotels h2 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 500;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 5px;
}

.hotel-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hotel-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border-left: 3px solid var(--secondary);
}

.hotel-info h3 {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.hotel-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 600;
  color: var(--primary);
}

.book-now {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.book-now:hover {
  background-color: var(--primary-hover);
}

.travel-tips {
  margin-top: 30px;
  background-color: #fff9e6;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid var(--secondary);
}

.travel-tips h2 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 500;
}

.tips-list {
  list-style-type: none;
  padding-left: 0;
}

.tips-list li {
  padding: 8px 0;
  border-bottom: 1px dashed #ddd;
  position: relative;
  padding-left: 25px;
}

.tips-list li:before {
  content: "→";
  color: var(--primary);
  position: absolute;
  left: 0;
}

.trip-form-section {
  flex: 1;
}

.trip-form-section h1 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 25px;
}

.trip-form-container {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.trip-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.floating label {
  position: absolute;
  top: 18px;
  left: 40px;
  color: #7f8c8d;
  pointer-events: none;
  transition: all 0.3s ease;
}

.floating .form-input:focus ~ label,
.floating .form-input:not(:placeholder-shown) ~ label {
  top: -10px;
  left: 30px;
  font-size: 12px;
  background: white;
  padding: 0 5px;
  color: var(--primary);
}

.form-input {
  width: 100%;
  padding: 15px 15px 15px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(255, 153, 51, 0.2);
}

.icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
}

.budget-label {
  display: block;
  margin-bottom: 10px;
  color: #7f8c8d;
}

.budget-options {
  display: flex;
  gap: 10px;
}

.budget-options button {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.budget-options button.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.price-indicator {
  font-size: 16px;
  font-weight: bold;
}

.generate-button {
  background-color: var(--primary);
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.generate-button:hover {
  background-color: var(--primary-hover);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .trip-container {
    flex-direction: column;
  }
}
</style>
