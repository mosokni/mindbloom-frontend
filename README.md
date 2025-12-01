# MindBloom – Frontend Application  
CST3144 – Full Stack Development Coursework  
Middlesex University – 2024/25

MindBloom is a Vue.js single-page application designed to allow users to browse and book after-school classes. This frontend works together with a Node.js/Express backend and a MongoDB Atlas database.

This README provides full documentation for installation, usage, component structure, and API integration.

---

## 1. Features

### User-Facing Features
- View a list of available lessons
- Search and sort lessons (subject, price, location, availability)
- Add lessons to the cart
- Remove lessons from the cart
- Checkout form with order submission
- Confirmation page after booking

### Technical Features
- Vue 3 with Composition API
- Vue Router for page navigation
- Reusable components (`LessonCard`, `LessonList`, `ShoppingCart`, `CheckoutForm`)
- API service layer (`api.js`, `orders.js`)
- JSON-based communication with Express backend
- Real-time lesson availability through backend requests

---

## 2. Technology Stack

**Frontend**
- Vue.js 3  
- Vite (development server & bundler)  
- JavaScript ES6  
- HTML5 & CSS3  

**Backend (separate project)**
- Node.js  
- Express.js  
- MongoDB Atlas  
- REST API architecture  

---

## 3. Project Structure

mindbloom-frontend/
│
├── public/
│ └── vite.svg
│
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── LessonCard.vue
│ │ ├── LessonList.vue
│ │ ├── ShoppingCart.vue
│ │ ├── CheckoutForm.vue
│ ├── services/
│ │ ├── api.js
│ │ ├── orders.js
│ ├── views/
│ │ ├── LessonsView.vue
│ │ ├── CartView.vue
│ │ ├── ConfirmationView.vue
│ ├── router/
│ │ └── index.js
│ ├── App.vue
│ └── main.js
│
├── package.json
├── vite.config.js
└── README.md

---

## 4. Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- NPM
- Backend running at:  
  **http://localhost:3000**

### Install dependencies

```bash
npm install
