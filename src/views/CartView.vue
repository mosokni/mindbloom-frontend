<template>
  <div class="page-container">

    <h2>Your Cart</h2>

    <!-- Empty Cart Message -->
    <div v-if="cart.length === 0" class="message warning">
      Your cart is empty.
    </div>

    <!-- Cart Items -->
    <ul v-if="cart.length > 0" class="cart-list">
      <li v-for="(item, index) in cart" :key="index">

        <div>
          <strong>{{ item.subject }}</strong><br />
          £{{ item.price }}
        </div>

        <button class="remove-btn" @click="removeItem(index)">
          Remove
        </button>

      </li>
    </ul>

    <!-- Total -->
    <p v-if="cart.length > 0" class="total-paid">
      Total: £{{ totalPrice }}
    </p>

    <!-- CHECKOUT SECTION -->
    <div v-if="cart.length > 0" class="checkout-box">
      <h3>Checkout</h3>

      <form @submit.prevent="submitOrder">

        <div class="input-group">
          <label>Name</label>
          <input v-model="name" type="text" required placeholder="Your Name" />
        </div>

        <div class="input-group">
          <label>Phone</label>
          <input v-model="phone" type="text" required placeholder="Phone Number" />
        </div>

        <button class="btn" type="submit" style="margin-top: 10px;">
          Place Order
        </button>

      </form>

    </div>

  </div>
</template>

<script>
import { submitOrder } from '../services/api'

export default {
  name: 'CartView',
  data() {
    return {
      name: '',
      phone: ''
    }
  },
  computed: {
    cart() {
      return this.$root.cart
    },
    totalPrice() {
      return this.cart.reduce((t, item) => t + item.price, 0)
    }
  },
  methods: {
    removeItem(index) {
      this.$root.cart.splice(index, 1)
    },

    async submitOrder() {
      const order = {
        name: this.name,
        phone: this.phone,
        lessons: this.cart
      }

      const result = await submitOrder(order)

      sessionStorage.setItem('last-order', JSON.stringify(order))
      this.$root.cart = []

      this.$router.push('/confirmation')
    }
  }
}
</script>
