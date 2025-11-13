<template>
  <div id="app">
    <header role="banner">
      <div class="header-content">
        <h1><i class="fas fa-graduation-cap"></i> After School Classes</h1>
        <nav role="navigation" aria-label="Main navigation">
          <ul class="nav-list">
            <li>
              <button 
                @click="showLessons" 
                class="nav-btn"
                :class="{ active: currentView === 'lessons' }"
              >
                <i class="fas fa-book"></i> Classes
              </button>
            </li>
            <li>
              <button 
                @click="showCart" 
                class="nav-btn"
                :class="{ active: currentView === 'cart' }"
                :disabled="cart.length === 0"
              >
                <i class="fas fa-shopping-cart"></i> Cart ({{ totalItems }})
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main role="main">
      <!-- Search Component -->
      <div v-if="currentView === 'lessons'" class="search-section">
        <div class="search-container">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search classes by subject, location, price..."
            class="search-input"
            @input="handleSearch"
          >
        </div>
        
        <!-- Sort Controls -->
        <div class="sort-controls">
          <select v-model="sortBy" @change="sortLessons" class="sort-select">
            <option value="">Sort by...</option>
            <option value="subject">Subject</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
            <option value="spaces">Availability</option>
          </select>
          
          <button 
            @click="toggleSortOrder" 
            class="sort-order-btn"
            :disabled="!sortBy"
          >
            {{ sortAscending ? '↑ Asc' : '↓ Desc' }}
          </button>
        </div>
      </div>

      <!-- Lessons View -->
      <section v-if="currentView === 'lessons'" class="section" role="region" aria-label="Classes section">
        <h2>Available Classes</h2>
        <div class="products-grid" role="list" aria-label="Class list">
          <div 
            v-for="lesson in displayedLessons" 
            :key="lesson._id" 
            class="card"
            role="listitem"
          >
            <span class="category-tag">{{ lesson.subject }}</span>
            <div class="icon-container">
              <i :class="getSubjectIcon(lesson.subject)"></i>
            </div>
            <h3>{{ lesson.subject }}</h3>
            <p class="location"><i class="fas fa-map-marker-alt"></i> {{ lesson.location }}</p>
            <p class="price">£{{ lesson.price }}</p>
            <p class="spaces" :class="{ 'low-stock': lesson.spaces < 3 }">
              {{ lesson.spaces }} spaces left
            </p>
            <footer>
              <button 
                @click="addToCart(lesson)" 
                class="add"
                :disabled="lesson.spaces === 0"
              >
                {{ lesson.spaces > 0 ? 'Add to Cart' : 'Fully Booked' }}
              </button>
            </footer>
          </div>
        </div>
      </section>

      <!-- Shopping Cart View -->
      <section v-if="currentView === 'cart'" class="section" role="region" aria-label="Shopping cart section">
        <div class="checkout-header">
          <h2>Your Shopping Cart</h2>
          <p class="cart-summary" aria-live="polite">
            Total: <strong>£{{ cartTotal }}</strong>
          </p>
        </div>
        
        <div class="cart-items" role="list" aria-label="Cart items">
          <div 
            v-for="item in cart" 
            :key="item.lesson._id" 
            class="cart-item"
            role="listitem"
          >
            <div class="cart-item-info">
              <h4>{{ item.lesson.subject }}</h4>
              <p class="location"><i class="fas fa-map-marker-alt"></i> {{ item.lesson.location }}</p>
              <p class="price">£{{ item.lesson.price }} × {{ item.quantity }}</p>
            </div>
            <div class="cart-item-controls">
              <span class="line-total">£{{ (item.lesson.price * item.quantity).toFixed(2) }}</span>
              <div class="qty-controls">
                <button 
                  @click="decreaseQuantity(item.lesson._id)" 
                  class="btn-qty dec"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span class="qty-display" aria-label="Current quantity">{{ item.quantity }}</span>
                <button 
                  @click="increaseQuantity(item.lesson._id)" 
                  class="btn-qty inc"
                  :disabled="item.quantity >= item.lesson.spaces"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button 
                  @click="removeFromCart(item.lesson._id)" 
                  class="btn-remove"
                  aria-label="Remove class from cart"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Checkout Form -->
        <div v-if="cart.length > 0" class="checkout-form">
          <h3>Checkout</h3>
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label for="name">Full Name:</label>
              <input 
                type="text" 
                id="name" 
                v-model="checkout.name"
                required
                pattern="[A-Za-z\s]+"
                title="Name should contain only letters"
                class="form-input"
              >
              <small>Letters only</small>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number:</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="checkout.phone"
                required
                pattern="[0-9]+"
                title="Phone should contain only numbers"
                class="form-input"
              >
              <small>Numbers only</small>
            </div>
            
            <button 
              type="submit" 
              class="btn-checkout"
              :disabled="!isFormValid"
            >
              <i class="fas fa-credit-card"></i> Complete Order
            </button>
          </form>
        </div>

        <div v-else class="empty-cart">
          <p>Your cart is empty.</p>
          <p>Browse our classes to add some activities!</p>
        </div>

        <div class="checkout-actions" v-if="cart.length > 0">
          <button @click="clearCart" class="btn-clear">
            <i class="fas fa-trash"></i> Clear Cart
          </button>
        </div>
      </section>

      <!-- Order Confirmation -->
      <div v-if="showConfirmation" class="confirmation-overlay">
        <div class="confirmation-modal">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Order Confirmed!</h3>
          <p>Thank you for your order, {{ checkout.name }}!</p>
          <p>We'll contact you at {{ checkout.phone }} with further details.</p>
          <button @click="closeConfirmation" class="btn-confirm">
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentView: 'lessons',
      lessons: [],
      cart: [],
      searchQuery: '',
      sortBy: '',
      sortAscending: true,
      filteredLessons: [],
      checkout: {
        name: '',
        phone: ''
      },
      showConfirmation: false
    }
  },
  computed: {
    totalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.lesson.price * item.quantity), 0).toFixed(2)
    },
    isFormValid() {
      const nameValid = /^[A-Za-z\s]+$/.test(this.checkout.name)
      const phoneValid = /^[0-9]+$/.test(this.checkout.phone)
      return nameValid && phoneValid && this.checkout.name.length > 0 && this.checkout.phone.length > 0
    },
    displayedLessons() {
      return this.searchQuery ? this.filteredLessons : this.lessons
    }
  },
  async mounted() {
    await this.fetchLessons()
  },
  methods: {
    async fetchLessons() {
      try {
        // This will be connected to your Express.js backend
        const response = await fetch('https://your-aws-or-render-url/lessons')
        this.lessons = await response.json()
        this.filteredLessons = [...this.lessons]
      } catch (error) {
        console.error('Error fetching lessons:', error)
        // Fallback data for demonstration
        this.lessons = [
          {
            _id: '1',
            subject: 'Mathematics',
            location: 'London',
            price: 30,
            spaces: 5
          },
          {
            _id: '2',
            subject: 'Science',
            location: 'Manchester',
            price: 35,
            spaces: 3
          },
          {
            _id: '3',
            subject: 'Art',
            location: 'Birmingham',
            price: 25,
            spaces: 8
          },
          {
            _id: '4',
            subject: 'Music',
            location: 'Leeds',
            price: 40,
            spaces: 2
          },
          {
            _id: '5',
            subject: 'Drama',
            location: 'Liverpool',
            price: 28,
            spaces: 6
          },
          {
            _id: '6',
            subject: 'Programming',
            location: 'London',
            price: 45,
            spaces: 4
          },
          {
            _id: '7',
            subject: 'Sports',
            location: 'Manchester',
            price: 20,
            spaces: 10
          },
          {
            _id: '8',
            subject: 'Languages',
            location: 'Bristol',
            price: 32,
            spaces: 3
          },
          {
            _id: '9',
            subject: 'Robotics',
            location: 'London',
            price: 50,
            spaces: 2
          },
          {
            _id: '10',
            subject: 'Cooking',
            location: 'Glasgow',
            price: 38,
            spaces: 5
          }
        ]
        this.filteredLessons = [...this.lessons]
      }
    },
    handleSearch() {
      if (this.searchQuery.trim() === '') {
        this.filteredLessons = [...this.lessons]
        return
      }
      
      const query = this.searchQuery.toLowerCase()
      this.filteredLessons = this.lessons.filter(lesson => 
        lesson.subject.toLowerCase().includes(query) ||
        lesson.location.toLowerCase().includes(query) ||
        lesson.price.toString().includes(query) ||
        lesson.spaces.toString().includes(query)
      )
    },
    sortLessons() {
      if (!this.sortBy) return
      
      this.filteredLessons.sort((a, b) => {
        let aVal = a[this.sortBy]
        let bVal = b[this.sortBy]
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }
        
        if (this.sortAscending) {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
    },
    toggleSortOrder() {
      this.sortAscending = !this.sortAscending
      this.sortLessons()
    },
    getSubjectIcon(subject) {
      const icons = {
        'Mathematics': 'fas fa-calculator',
        'Science': 'fas fa-flask',
        'Art': 'fas fa-palette',
        'Music': 'fas fa-music',
        'Drama': 'fas fa-theater-masks',
        'Programming': 'fas fa-code',
        'Sports': 'fas fa-running',
        'Languages': 'fas fa-language',
        'Robotics': 'fas fa-robot',
        'Cooking': 'fas fa-utensils'
      }
      return icons[subject] || 'fas fa-book'
    },
    addToCart(lesson) {
      if (lesson.spaces === 0) return
      
      const existingItem = this.cart.find(item => item.lesson._id === lesson._id)
      if (existingItem) {
        if (existingItem.quantity < lesson.spaces) {
          existingItem.quantity++
          lesson.spaces--
        }
      } else {
        this.cart.push({
          lesson: { ...lesson },
          quantity: 1
        })
        lesson.spaces--
      }
    },
    increaseQuantity(lessonId) {
      const cartItem = this.cart.find(item => item.lesson._id === lessonId)
      const lesson = this.lessons.find(l => l._id === lessonId)
      
      if (cartItem && lesson && cartItem.quantity < lesson.spaces) {
        cartItem.quantity++
        lesson.spaces--
      }
    },
    decreaseQuantity(lessonId) {
      const cartItem = this.cart.find(item => item.lesson._id === lessonId)
      const lesson = this.lessons.find(l => l._id === lessonId)
      
      if (cartItem) {
        cartItem.quantity--
        lesson.spaces++
        
        if (cartItem.quantity === 0) {
          this.removeFromCart(lessonId)
        }
      }
    },
    removeFromCart(lessonId) {
      const cartItem = this.cart.find(item => item.lesson._id === lessonId)
      const lesson = this.lessons.find(l => l._id === lessonId)
      
      if (cartItem && lesson) {
        lesson.spaces += cartItem.quantity
        this.cart = this.cart.filter(item => item.lesson._id !== lessonId)
      }
    },
    clearCart() {
      this.cart.forEach(item => {
        const lesson = this.lessons.find(l => l._id === item.lesson._id)
        if (lesson) {
          lesson.spaces += item.quantity
        }
      })
      this.cart = []
    },
    async submitOrder() {
      if (!this.isFormValid) return
      
      try {
        // Prepare order data
        const order = {
          name: this.checkout.name,
          phone: this.checkout.phone,
          lessons: this.cart.map(item => ({
            lessonId: item.lesson._id,
            quantity: item.quantity
          })),
          total: this.cartTotal,
          timestamp: new Date().toISOString()
        }
        
        // Send order to backend
        const response = await fetch('https://your-aws-or-render-url/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        })
        
        if (response.ok) {
          // Update lesson spaces in backend
          for (const item of this.cart) {
            await fetch(`https://your-aws-or-render-url/lessons/${item.lesson._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ spaces: item.lesson.spaces })
            })
          }
          
          this.showConfirmation = true
        }
      } catch (error) {
        console.error('Error submitting order:', error)
        // Fallback: show confirmation anyway for demo purposes
        this.showConfirmation = true
      }
    },
    closeConfirmation() {
      this.showConfirmation = false
      this.clearCart()
      this.checkout.name = ''
      this.checkout.phone = ''
      this.showLessons()
    },
    showLessons() {
      this.currentView = 'lessons'
    },
    showCart() {
      this.currentView = 'cart'
    }
  }
}
</script>