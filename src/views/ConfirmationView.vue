<template>
    <div class="confirmation-wrapper">
      <div class="confirmation-box">
        <h2>✅ Order Confirmed</h2>
  
        <p><strong>Name:</strong> {{ order.name }}</p>
        <p><strong>Phone:</strong> {{ order.phone }}</p>
  
        <h3>Lessons Booked</h3>
        <ul>
          <li v-for="lesson in order.lessons" :key="lesson._id">
            {{ lesson.subject }} - £{{ lesson.price }}
          </li>
        </ul>
  
        <p class="total-paid">
          <strong>Total Paid:</strong> £{{ totalPrice }}
        </p>
  
        <router-link class="back-btn" to="/lessons">
          Back to Lessons
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmationView',
    data() {
      return {
        order: JSON.parse(sessionStorage.getItem('last-order')) || {
          name: '',
          phone: '',
          lessons: []
        }
      }
    },
    computed: {
      totalPrice() {
        return this.order.lessons.reduce((sum, lesson) => sum + lesson.price, 0)
      }
    }
  }
  </script>
  