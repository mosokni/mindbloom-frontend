<template>
  <div>
    <h2>Cart</h2>

    <div v-if="cart.length === 0">
      Your cart is empty.
    </div>

    <div v-else>
      <ul>
        <li v-for="lesson in cart" :key="lesson._id">
          {{ lesson.subject }} - £{{ lesson.price }}
        </li>
      </ul>

      <h3>Checkout</h3>

      <form @submit.prevent="checkout">
        <input v-model="name" placeholder="Your Name" required />
        <input v-model="phone" placeholder="Phone Number" required />

        <button type="submit">Submit Order</button>
      </form>

      <p v-if="successMessage">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import { submitOrder } from '../services/orders'

export default {
  props: ['cart'],
  data() {
    return {
      name: '',
      phone: '',
      successMessage: ''
    }
  },
  methods: {
    async checkout() {
      const order = {
        name: this.name,
        phone: this.phone,
        lessons: this.cart,
        createdAt: new Date()
      };

      try {
        await submitOrder(order);
        this.successMessage = 'Order successfully submitted!';
      } catch (error) {
        alert('Checkout failed');
      }
    }
  }
}
</script>
