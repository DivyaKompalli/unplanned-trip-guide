<template>
  <footer class="travelplanner-footer">
    <div class="footer-container">
      <!-- Header Section -->
      <div class="footer-header">
        <h2 class="footer-title">
          <span class="logo-icon">✈️</span> TravelPlanner
        </h2>
        <p class="footer-subtitle">Plan your perfect trip with ease</p>
      </div>

      <!-- Divider -->
      <div class="footer-divider"></div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h3 class="section-title">Quick Links</h3>
        <ul class="links-list">
          <li><span class="link-icon">🏠</span> Home</li>
          <li><span class="link-icon">ℹ️</span> About</li>
          <li><span class="link-icon">✉️</span> Contact</li>
        </ul>
      </div>

      <!-- Divider -->
      <div class="footer-divider"></div>

      <!-- Connect Section -->
      <div class="footer-section">
        <h3 class="section-title">Connect</h3>
        <div class="social-icons">
          <span class="social-icon">👍</span>
          <span class="social-icon">👍</span>
          <span class="social-icon">💤</span>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-copyright">
        © 2023 TravelPlanner. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.travelplanner-footer {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  padding: 2.5rem 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
}

.social-icon:hover {
  transform: scale(1.2);
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
