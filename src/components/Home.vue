<template>
  <div class="home-container">
    <div class="background-image"></div>
    <div class="overlay"></div>

    <div class="content">
      <h1 class="title">🕌 Bharat Yatra</h1>
      <p class="subtitle">Discover the land of diversity and spirituality</p>

      <div class="choice-container">
        <h2>Plan your perfect Indian journey</h2>
        <div class="choice-buttons">
          <router-link to="/planned" class="choice-btn planned">
            <font-awesome-icon icon="calendar-check" />
            <span>Planned Trip</span>
            <p>I know where I want to go</p>
          </router-link>

          <router-link to="/trip-generator" class="choice-btn unplanned">
            <font-awesome-icon icon="compass" />
            <span>Discover India</span>
            <p>Suggest me destinations</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
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
  background-image: url("https://source.unsplash.com/random/1920x1080/?india,tajmahal");
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
  font-family: "Poppins", sans-serif;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-style: italic;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
  text-decoration: none;
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
  background: linear-gradient(135deg, #ff9933, #ff8c00);
}

.choice-btn.unplanned {
  background: linear-gradient(135deg, #138808, #006400);
}

.choice-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
}

@media (max-width: 480px) {
  .content {
    padding: 2rem 1rem;
  }

  .choice-btn {
    min-width: 100%;
  }
}
</style>
