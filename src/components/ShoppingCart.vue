<template>
  <div class="page-container">

    <h2>Your Cart</h2>

    <!-- Empty Cart -->
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

        <button
          class="remove-btn"
          @click="removeItem(index)"
        >
          Remove
        </button>

      </li>
    </ul>

    <!-- Total + Checkout -->
    <div v-if="cart.length > 0" style="margin-top: 20px;">
      <p class="total-paid">
        Total: £{{ totalPrice }}
      </p>

      <router-link
        to="/checkout"
        class="btn"
        style="margin-top: 10px; display: inline-block;"
      >
        Proceed to Checkout
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: ['cart'],
  emits: ['remove-item'],

  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    }
  },

  methods: {
    removeItem(index) {
      this.$emit('remove-item', index);
    }
  }
}
</script>
