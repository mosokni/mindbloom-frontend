<template>
  <div>
    <div style="margin-bottom: 10px">
      <input
        v-model="search"
        placeholder="Search by subject or location..."
        style="padding: 5px; margin-right: 10px;"
      />

      <select v-model="sortBy">
        <option value="subject">Sort by Subject</option>
        <option value="price">Sort by Price</option>
        <option value="spaces">Sort by Spaces</option>
      </select>
    </div>

    <div v-if="sortedLessons.length === 0">
      No lessons match your search
    </div>

    <div v-for="lesson in sortedLessons" :key="lesson._id">
      <p>
        <strong>{{ lesson.subject }}</strong><br />
        Price: £{{ lesson.price }}<br />
        Location: {{ lesson.location }}<br />
        Spaces: {{ lesson.spaces }}
      </p>

      <button
        :disabled="lesson.spaces <= 0"
        @click="$emit('add-to-cart', lesson)"
      >
        {{ lesson.spaces <= 0 ? 'Fully Booked' : 'Add to Cart' }}
      </button>

      <hr />
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
    if (this.sortBy === 'subject') {
      return a.subject.localeCompare(b.subject);
    }

    if (this.sortBy === 'price') {
      return Number(a.price) - Number(b.price);
    }

    if (this.sortBy === 'spaces') {
      return Number(a.spaces) - Number(b.spaces);
    }
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
    }
  }
}
</script>
