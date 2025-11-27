<template>
    <div>
      <div v-if="cart.length === 0">
        Cart is empty
      </div>
  
      <div v-else>
        <div v-for="(lesson, index) in cart" :key="index">
          <p>{{ lesson.subject }} - £{{ lesson.price }}</p>
          <button @click="$emit('remove-from-cart', index)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['cart']
  }
  </script>
  