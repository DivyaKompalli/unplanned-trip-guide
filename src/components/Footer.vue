<template>
  <footer class="travelplanner-footer">
    <div class="footer-container">
      <div class="footer-header">
        <h2 class="footer-title">
          <span class="logo-icon">🕌</span> Bharat Yatra
        </h2>
        <p class="footer-subtitle">
          Discover the incredible diversity of India
        </p>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-section">
        <h3 class="section-title">Quick Links</h3>
        <ul class="links-list">
          <li>
            <router-link to="/home"
              ><span class="link-icon">🏠</span> Home</router-link
            >
          </li>
          <li>
            <a href="#"><span class="link-icon">ℹ️</span> About India</a>
          </li>
          <li>
            <a href="#"><span class="link-icon">✉️</span> Contact Us</a>
          </li>
        </ul>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-section">
        <h3 class="section-title">Travel Tips</h3>
        <ul class="links-list">
          <li>
            <a href="#"><span class="link-icon">🛂</span> Visa Information</a>
          </li>
          <li>
            <a href="#"><span class="link-icon">🏨</span> Best Seasons</a>
          </li>
          <li>
            <a href="#"><span class="link-icon">🍛</span> Local Cuisine</a>
          </li>
        </ul>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-section">
        <h3 class="section-title">Connect With Us</h3>
        <div class="social-icons">
          <a href="#" class="social-icon"
            ><font-awesome-icon :icon="['fab', 'facebook']"
          /></a>
          <a href="#" class="social-icon"
            ><font-awesome-icon :icon="['fab', 'twitter']"
          /></a>
          <a href="#" class="social-icon"
            ><font-awesome-icon :icon="['fab', 'instagram']"
          /></a>
        </div>
      </div>

      <div class="footer-copyright">
        © {{ new Date().getFullYear() }} Bharat Yatra. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.travelplanner-footer {
  background: var(--footer-bg);
  color: white;
  padding: 2.5rem 1rem;
  font-family: "Poppins", sans-serif;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-header {
  margin-bottom: 1.5rem;
}

.footer-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.footer-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 1.5rem auto;
  width: 80%;
}

.footer-section {
  margin: 1.5rem 0;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin: 0.8rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.links-list a {
  color: white;
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.links-list a:hover {
  color: #ffd700;
  transform: translateX(5px);
}

.link-icon {
  font-size: 1.2rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.social-icon {
  font-size: 1.8rem;
  transition: transform 0.3s;
  color: white;
}

.social-icon:hover {
  transform: scale(1.2);
  color: #ffd700;
}

.footer-copyright {
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-title {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .links-list li {
    font-size: 1rem;
  }
}
</style>
