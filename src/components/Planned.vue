<template>
  <div class="planned-trip">
    <!-- Background with overlay -->
    <div class="background-image"></div>
    <div class="overlay"></div>

    <!-- Main content -->
    <div class="content">
      <h1 class="title">✈️ Plan Your Trip</h1>
      <p class="subtitle">
        Craft your perfect journey with our budget estimator
      </p>

      <div class="trip-form-container glassmorphism">
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
            <label for="destination">Destination</label>
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
                <span class="price-indicator">$</span>
                <span>Budget</span>
              </button>
              <button
                type="button"
                :class="{ active: tripDetails.budgetLevel === 'medium' }"
                @click="tripDetails.budgetLevel = 'medium'"
              >
                <span class="price-indicator">$$</span>
                <span>Mid-range</span>
              </button>
              <button
                type="button"
                :class="{ active: tripDetails.budgetLevel === 'high' }"
                @click="tripDetails.budgetLevel = 'high'"
              >
                <span class="price-indicator">$$$</span>
                <span>Luxury</span>
              </button>
            </div>
          </div>

          <button type="submit" class="generate-button pulse-on-hover">
            <span>Generate Estimate</span>
            <span class="icon">🧮</span>
          </button>
        </form>

        <transition name="fade-slide">
          <div v-if="estimateGenerated" class="estimate-results glassmorphism">
            <h3 class="results-title">Your Estimated Budget</h3>
            <div class="budget-grid">
              <div class="budget-category">
                <div class="category-icon">🏨</div>
                <div class="category-details">
                  <span class="category-name">Accommodation</span>
                  <span class="category-price"
                    >${{ budgetBreakdown.accommodation }}</span
                  >
                </div>
              </div>

              <div class="budget-category">
                <div class="category-icon">✈️</div>
                <div class="category-details">
                  <span class="category-name">Transportation</span>
                  <span class="category-price"
                    >${{ budgetBreakdown.transportation }}</span
                  >
                </div>
              </div>

              <div class="budget-category">
                <div class="category-icon">🍽️</div>
                <div class="category-details">
                  <span class="category-name">Food & Dining</span>
                  <span class="category-price"
                    >${{ budgetBreakdown.food }}</span
                  >
                </div>
              </div>

              <div class="budget-category">
                <div class="category-icon">🎭</div>
                <div class="category-details">
                  <span class="category-name">Activities</span>
                  <span class="category-price"
                    >${{ budgetBreakdown.activities }}</span
                  >
                </div>
              </div>
            </div>

            <div class="budget-total">
              <div class="total-label">Total Estimated Cost</div>
              <div class="total-amount">${{ totalEstimate }}</div>
            </div>

            <button class="save-button">
              Save This Plan
              <span class="icon">💾</span>
            </button>
          </div>
        </transition>
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
      budgetBreakdown: {
        accommodation: 0,
        transportation: 0,
        food: 0,
        activities: 0,
      },
    };
  },
  computed: {
    totalEstimate() {
      return Object.values(this.budgetBreakdown).reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    generateEstimate() {
      const budgetMultipliers = {
        low: 0.7,
        medium: 1,
        high: 1.8,
      };
      const multiplier = budgetMultipliers[this.tripDetails.budgetLevel];

      this.budgetBreakdown = {
        accommodation: Math.round(100 * this.tripDetails.duration * multiplier),
        transportation: Math.round(300 * multiplier),
        food: Math.round(
          40 *
            this.tripDetails.duration *
            this.tripDetails.travelers *
            multiplier
        ),
        activities: Math.round(
          50 *
            this.tripDetails.duration *
            this.tripDetails.travelers *
            multiplier
        ),
      };

      this.estimateGenerated = true;
    },
  },
};
</script>

<style scoped>
/* Base Styles */
.planned-trip {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://source.unsplash.com/random/1920x1080/?travel,beach,city");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 0;
  animation: backgroundPan 30s linear infinite;
}

@keyframes backgroundPan {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
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
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  background: linear-gradient(90deg, #ffffff, #e0f7fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fadeIn 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 300;
  animation: fadeIn 1.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glassmorphism Effect */
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}

.trip-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  transition: all 0.3s ease;
}

.trip-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

/* Form Group Styles */
.form-group {
  position: relative;
  text-align: left;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

/* Floating Label Effect */
.floating label {
  position: absolute;
  top: 18px;
  left: 15px;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.floating .form-input:focus ~ label,
.floating .form-input:not(:placeholder-shown) ~ label {
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  background: rgba(99, 102, 241, 0.8);
  padding: 0 8px;
  border-radius: 10px;
  color: white;
}

.form-input {
  width: 100%;
  padding: 1.2rem 1rem 0.8rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.8);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

/* Budget Level Selector */
.budget-label {
  display: block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.budget-options {
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
}

.budget-options button {
  flex: 1;
  padding: 1rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.budget-options button.active {
  background: rgba(99, 102, 241, 0.5);
  border-color: rgba(99, 102, 241, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.budget-options button:hover:not(.active) {
  background: rgba(255, 255, 255, 0.1);
}

.price-indicator {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

/* Generate Button */
.generate-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
}

.generate-button .icon {
  position: static;
  transform: none;
  transition: all 0.3s ease;
}

.generate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.generate-button:hover .icon {
  transform: scale(1.2);
}

.pulse-on-hover:hover {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: translateY(-2px) scale(1);
  }
  50% {
    transform: translateY(-2px) scale(1.05);
  }
  100% {
    transform: translateY(-2px) scale(1);
  }
}

/* Results Section */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.estimate-results {
  margin-top: 2.5rem;
  padding: 2rem;
  text-align: left;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
  position: relative;
  padding-bottom: 0.5rem;
}

.results-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 3px;
}

.budget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.budget-category {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.budget-category:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.category-icon {
  font-size: 1.8rem;
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 50%;
}

.category-details {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.category-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.budget-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin-top: 1.5rem;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  border-left: 4px solid #6366f1;
}

.total-label {
  font-size: 1.1rem;
  font-weight: 500;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.save-button {
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.save-button:hover {
  background: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .content {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .trip-form-container {
    padding: 1.5rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .budget-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }

  .budget-options {
    flex-direction: column;
  }

  .budget-options button {
    width: 100%;
  }
}
</style>
