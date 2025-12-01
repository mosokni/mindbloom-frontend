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
      @clear-cart="clearCart"
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

  created() {
    // ✅ Load cart from localStorage when app starts
    const savedCart = localStorage.getItem('mindbloom-cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  },

  watch: {
    // ✅ Auto-save cart whenever it changes
    cart: {
      handler(newCart) {
        localStorage.setItem('mindbloom-cart', JSON.stringify(newCart));
      },
      deep: true
    }
  },

  methods: {
    addToCart(lesson) {
      const exists = this.cart.find(item => item._id === lesson._id);

      if (exists) {
        alert('This lesson is already in your cart.');
        return;
      }

      if (lesson.spaces <= 0) {
        alert('This lesson is fully booked.');
        return;
      }

      this.cart.push(lesson);
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },

    clearCart() {
      this.cart = [];
      localStorage.removeItem('mindbloom-cart'); // ✅ clear storage after checkout
    }
  }
}
</script>

