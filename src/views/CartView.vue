<template>
  <div>
    <h2>Your Cart</h2>

    <div v-if="cart.length === 0">
      Your cart is empty.
    </div>

    <div v-else>
      <ul>
        <li v-for="(lesson, index) in cart" :key="lesson._id">
          {{ lesson.subject }} - £{{ lesson.price }}
          <button @click="remove(index)" style="margin-left:10px;">
            Remove
          </button>
        </li>
      </ul>

      <p style="font-weight: bold; margin-top: 10px;">
        Total: £{{ totalPrice }}
      </p>

      <CheckoutForm
        :cart="cart"
        @order-complete="finishOrder"
      />
    </div>
  </div>
</template>

<script>
import CheckoutForm from '../components/CheckoutForm.vue'

export default {
  name: 'CartView',
  props: ['cart'],
  components: { CheckoutForm },
  methods: {
    remove(index) {
      this.$emit('remove-from-cart', index);
    },
    finishOrder() {
      this.$emit('clear-cart');
      this.$router.push('/lessons');
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, lesson) => sum + lesson.price, 0);
    }
  }
}
</script>
