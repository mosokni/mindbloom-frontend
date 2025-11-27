<template>
  <div>
    <nav>
      <router-link to="/lessons">Lessons</router-link> |
      <router-link to="/cart">Cart ({{ cart.length }})</router-link>
    </nav>

    <router-view
      :cart="cart"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(lesson) {
      this.cart.push(lesson)
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    }
  }
}
</script>
