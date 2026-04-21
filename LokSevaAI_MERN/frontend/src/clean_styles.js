const fs = require('fs');

const css = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: 'Open Sans', Arial, sans-serif;
  background: #f1f2f3;
  color: #333333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top Banner - India Govt Style Tricolor / Thin Header */
.top-banner {
  background: #ffffff;
  color: #333;
  text-align: right;
  font-size: 0.8rem;
  padding: 5px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.top-banner-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.top-banner-inner span {
  font-weight: 600;
}

/* App Container */
.app-container {
  display: flex;
  flex: 1;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 15px rgba(0,0,0,0.05);
  background: #ffffff;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  color: #333;
  padding: 24px 16px;
  height: calc(100vh - 30px);
}

.sidebar-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #103567;
}

.sidebar-header h1 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
  color: #103567;
}

.sidebar-header p {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #555;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-section h3 {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #103567;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 5px;
  margin-bottom: 12px;
}

.language-select, .filter-select {
  width: 100%;
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  color: #495057;
  font-size: 0.85rem;
  cursor: pointer;
  margin-bottom: 10px;
}

.language-select:focus, .filter-select:focus {
  border-color: #103567;
  outline: none;
}

.filter-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.income-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.income-tag {
  background: #FF9933;
  color: white;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.income-tag button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.profile-btn, .sync-btn, .login-btn {
  width: 100%;
  padding: 10px;
  background: #103567;
  border: 1px solid #103567;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
}

.sync-btn {
  background: #138808;
  border-color: #138808;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: #dc3545;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 30px 40px;
  overflow-y: auto;
  background: #ffffff;
}

.main-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #dee2e6;
}

.main-header h1 {
  font-size: 1.8rem;
  color: #103567;
  margin: 0;
}

.main-header p {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 5px;
}

/* Hero Section */
.hero-section {
  background: #f8f9fa;
  border-top: 4px solid #FF9933;
  border-bottom: 4px solid #138808;
  padding: 30px;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 4px;
}

.hero-section h2 {
  font-size: 1.8rem;
  color: #103567;
  margin-bottom: 10px;
}

.hero-section p {
  color: #555;
  margin-bottom: 20px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.stat-pill {
  background: #ffffff;
  border: 1px solid #e9ecef;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-pill span {
  font-size: 1.2rem;
  font-weight: 700;
  color: #103567;
  display: block;
  margin-bottom: 4px;
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
  background: #f8f9fa;
}

.tab {
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  border-right: 1px solid #dee2e6;
}

.tab:hover {
  background: #e9ecef;
}

.tab.active {
  background: #ffffff;
  color: #103567;
  border-top: 3px solid #103567;
  border-bottom: 1px solid #ffffff;
  margin-bottom: -1px;
}

/* Schemes Container */
.schemes-container h3, .tab-content h3, .fraud-header h3, .tracer-header h3 {
  font-size: 1.4rem;
  color: #103567;
  margin-bottom: 15px;
  font-weight: 600;
}

.schemes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.scheme-card {
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 15px;
  background: #103567 !important;
  color: #ffffff;
  border-bottom: 1px solid #e9ecef;
}

.card-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
  color: #FF9933;
}

.card-title {
  font-size: 1.1rem;
  margin: 0;
  color: #ffffff;
}

.card-body {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-summary {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
}

.card-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.meta-tag {
  background: #f1f3f5;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid #dee2e6;
}

.eligibility-score {
  margin-bottom: 15px;
}

.score-label {
  font-size: 0.8rem;
  margin-bottom: 5px;
  color: #6c757d;
}

.score-label strong {
  color: #138808;
}

.progress-bar {
  background: #e9ecef;
  height: 6px;
  border-radius: 3px;
}

.progress-fill {
  background: #138808;
  height: 100%;
  border-radius: 3px;
}

.btn-apply {
  background: #103567;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto;
}

.btn-apply:hover {
  background: #0d2950;
}

/* Forms & Modals */
.tab-content {
  padding: 20px 0;
}

.fraud-dashboard {
  background: #ffffff;
}

.location-tracer-container {
  margin-bottom: 30px;
}

.taaza-khabar-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  background: #ffffff;
  border-left: 4px solid #103567;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-left-width: 4px;
  border-left-color: #103567;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border-radius: 2px;
}

.news-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.news-title {
  font-weight: 600;
  color: #103567;
  font-size: 1rem;
}

.news-meta {
  font-size: 0.8rem;
  color: #6c757d;
}

.news-desc {
  font-size: 0.9rem;
  color: #495057;
}

/* Document Upload Wizard */
.pdf-wizard {
  background: #f8f9fa;
  padding: 30px;
  border: 1px dashed #ced4da;
  text-align: center;
}

.btn-upload {
  background: #103567;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
}

/* Accessibility */
.accessibility-widget {
  position: fixed;
  right: 30px;
  bottom: 30px;
}

.accessibility-btn {
  background: #103567;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
}

.accessibility-panel {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 300px;
}

.acc-section label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
}

.acc-option {
  border: 1px solid #dee2e6;
  padding: 8px;
  text-align: center;
  margin-top: 5px;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 0.85rem;
}

.acc-option.active {
  background: #103567;
  color: white;
}

/* Overlay & Modals */
.whatsapp-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.whatsapp-modal {
  background: #ffffff;
  padding: 30px;
  border-radius: 4px;
  text-align: center;
  max-width: 400px;
  border-top: 4px solid #138808;
}
`;

fs.writeFileSync('App.css', css);
console.log('App.css rewritten cleanly');
