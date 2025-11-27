<template>
    <div>
      <h2>Available Lessons</h2>
      <LessonList @add-to-cart="$emit('add-to-cart', $event)" />
    </div>
  </template>
  
  <script>
  import LessonList from '../components/LessonList.vue'
  
  export default {
    components: { LessonList }
  }
  </script>
  