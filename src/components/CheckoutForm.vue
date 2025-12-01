<template>
    <div>
      <h3>Checkout</h3>
  
      <form @submit.prevent="submit">
        <div>
          <input
            v-model="name"
            type="text"
            placeholder="Your Name"
            :class="{ invalid: nameError }"
          />
          <small v-if="nameError" class="error">{{ nameError }}</small>
        </div>
  
        <div>
          <input
            v-model="phone"
            type="text"
            placeholder="Phone Number"
            :class="{ invalid: phoneError }"
          />
          <small v-if="phoneError" class="error">{{ phoneError }}</small>
        </div>
  
        <button type="submit">Place Order</button>
      </form>
  
      <p v-if="message" class="success">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { submitOrder } from '../services/orders'
  
  export default {
    name: 'CheckoutForm',
    props: ['cart'],
    data() {
      return {
        name: '',
        phone: '',
        message: '',
        nameError: '',
        phoneError: ''
      }
    },
    methods: {
      validate() {
        this.nameError = '';
        this.phoneError = '';
  
        if (this.name.length < 3) {
          this.nameError = 'Name must be at least 3 characters long';
        }
  
        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(this.phone)) {
          this.phoneError = 'Phone number must be 10–11 digits';
        }
  
        return !this.nameError && !this.phoneError;
      },
  
      async submit() {
  if (!this.validate()) return;

  const order = {
    name: this.name,
    phone: this.phone,
    lessons: this.cart,
    createdAt: new Date()
  };

  try {
    await submitOrder(order);

    // ✅ Save order for confirmation page
    sessionStorage.setItem('last-order', JSON.stringify(order));

    // ✅ Redirect to confirmation page
    this.$emit('order-complete');
    this.$router.push('/confirmation');
  } catch (error) {
    this.message = '❌ Order failed. Please try again.';
  }
}

    }
  }
  </script>
  
  <style scoped>
  .invalid {
    border: 1px solid red;
  }
  
  .error {
    color: red;
    font-size: 12px;
  }
  
  .success {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  