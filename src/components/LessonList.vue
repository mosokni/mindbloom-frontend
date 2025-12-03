<template>
  <div class="page-container">

    <!-- Search + Sort Controls -->
    <div class="controls">
      <input
        v-model="search"
        class="search-box"
        placeholder="Search by subject or location..."
      />

      <select v-model="sortBy" class="sort-select">
        <option value="subject">Sort by Subject</option>
        <option value="price">Sort by Price</option>
        <option value="spaces">Sort by Spaces</option>
      </select>
    </div>

    <div v-if="sortedLessons.length === 0">
      No lessons match your search
    </div>

    <!-- Lesson Grid -->
    <div class="lesson-grid">
      <div
        v-for="lesson in sortedLessons"
        :key="lesson._id"
        class="lesson-card"
      >

        <!-- IMAGE -->
        <img
          :src="getLessonImage(lesson)"
          alt="Lesson image"
          class="lesson-image"
        />

        <!-- TITLE -->
        <h3>{{ lesson.subject }}</h3>

        <!-- DETAILS -->
        <p class="lesson-info">
          <strong>Price:</strong> £{{ lesson.price }}<br />
          <strong>Location:</strong> {{ lesson.location }}<br />
          <strong>Spaces:</strong> {{ lesson.spaces }}
        </p>

        <!-- BUTTON -->
        <button
          :disabled="lesson.spaces <= 0"
          class="btn"
          @click="$emit('add-to-cart', lesson)"
        >
          {{ lesson.spaces <= 0 ? 'Fully Booked' : 'Add to Cart' }}
        </button>

      </div>
    </div>

  </div>
</template>

<script>
import { getLessons } from '../services/api'

export default {
  name: 'LessonList',
  data() {
    return {
      lessons: [],
      search: '',
      sortBy: 'subject'
    }
  },

  async mounted() {
    await this.loadLessons()
  },

  computed: {
    filteredLessons() {
      if (!this.search) return this.lessons;

      return this.lessons.filter(lesson =>
        lesson.subject.toLowerCase().includes(this.search.toLowerCase()) ||
        lesson.location.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    sortedLessons() {
      return [...this.filteredLessons].sort((a, b) => {
        if (this.sortBy === 'subject') return a.subject.localeCompare(b.subject);
        if (this.sortBy === 'price') return a.price - b.price;
        if (this.sortBy === 'spaces') return a.spaces - b.spaces;
      });
    }
  },

  methods: {
    async loadLessons() {
      try {
        this.lessons = await getLessons();
      } catch (error) {
        console.error('Failed to load lessons:', error);
      }
    },

    getLessonImage(lesson) {
      const map = {
        'Mathematics': '/lessons/Mathematics.jpg',
        'History': '/lessons/History.jpg',
        'Science': '/lessons/Science.jpg',
        'English': '/lessons/English.jpg',
        'Geography': '/lessons/Geography.jpg',
        'Physics': '/lessons/Physics.jpg',
        'Chemistry': '/lessons/Chemistry.jpg',
        'Computer Science': '/lessons/Computer Science.jpg',
        'Art': '/lessons/Art.jpg',
        'Music': '/lessons/Music.jpg',
        'French': '/lessons/French.jpg',
        'Economics': '/lessons/Economics.jpg'
      };
      return map[lesson.subject] || '/lessons/default.jpg';
    }
  }
}
</script>
