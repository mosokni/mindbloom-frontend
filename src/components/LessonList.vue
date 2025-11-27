<template>
  <div>
    <div v-if="lessons.length === 0">
      No lessons available
    </div>

    <div v-for="lesson in lessons" :key="lesson._id">
      <p>
        <strong>{{ lesson.subject }}</strong><br>
        Price: £{{ lesson.price }}<br>
        Location: {{ lesson.location }}<br>
        Spaces: {{ lesson.spaces }}
      </p>

      <button @click="$emit('add-to-cart', lesson)">
        Add to Cart
      </button>
      <hr>
    </div>
  </div>
</template>

<script>
import { getLessons } from '../services/api'

export default {
  name: 'LessonList',
  data() {
    return {
      lessons: []
    }
  },
  async mounted() {
    try {
      const data = await getLessons()
      this.lessons = data
      console.log('Lessons loaded:', data)
    } catch (error) {
      console.error('Failed to load lessons:', error)
    }
  }
}
</script>
