# MindBloom – Frontend Application  
CST3144 – Full Stack Development Coursework  
Middlesex University – 2024/25

MindBloom is a Vue.js single-page web application designed to allow students and parents
to browse and purchase after-school classes. The application retrieves lesson data from
a deployed Express/Node.js backend and MongoDB Atlas database via REST API calls.

This project satisfies the Coursework 1 requirements for CST3144.

---

## 1. Deployed Application & Repositories

| Service | Link |
|--------|------|
| Live Frontend (GitHub Pages) | https://mosokni.github.io/mindbloom-frontend/ |
| Frontend GitHub Repository | https://github.com/mosokni/mindbloom-frontend |
| Backend GitHub Repository | https://github.com/mosokni/mindbloom-backend |
| Backend API Deployment (Render) | https://mindbloom-backend-szwj.onrender.com/lessons |

---

## 2. Frontend Features

### User-Facing Features
- Displays at least 10 lessons with full details
- Sorting by subject, location, price, or spaces (ascending/descending)
- Search functionality by attribute text
- Add items to cart (with space validation)
- Remove lessons from cart (spaces restored)
- Checkout form:
  - Name (letters only)
  - Phone number (digits only)
  - Form validation before enabling the submit button
- Order confirmation message once submitted

### Technical Features
- Vue.js 3 framework
- Fetch API with **promise-based** data access (no Axios/XMLHttpRequest)
- Modular component structure
- Connected to Render backend using real HTTP requests
- Dynamic UI updates after backend responses

---

## 3. Technologies Used

- Vue.js 3 (Composition API)
- JavaScript ES6
- HTML5 / CSS3
- GitHub Pages deployment
- REST communication with Express.js backend

---

## 4. Project Structure

mindbloom-frontend/
├── public/
│ └── lessons/images
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── LessonList.vue
│ │ ├── ShoppingCart.vue
│ │ ├── CheckoutForm.vue
│ ├── views/
│ ├── router/
│ │ └── index.js
│ ├── App.vue
│ └── main.js
├── package.json
├── vite.config.js
└── README.md

---

## 5. How to Run the Frontend Locally

### Prerequisites
- Node.js 18 or later
- NPM

### Steps
```bash
# Install dependencies
npm install

# Start development server
npm run dev
Vite will run on:

http://localhost:5173/

5. API Usage (Backend Integration)

The frontend uses the Fetch API for all requests:

GET → retrieve all lessons

POST → submit order to backend

PUT → update lesson spaces after checkout

Example fetch call:

fetch('https://mindbloom-backend-szwj.onrender.com/lessons')
  .then(response => response.json())
  .then(data => {
    this.lessons = data;
  });


This ensures full compliance with the coursework specification.


Author

Mohamed Sokni
BSc Computer Science – Middlesex University
