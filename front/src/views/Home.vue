<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.index"
          md="4"
          sm="12"
        >
          <card-item 
            :overline="item.overline"
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :itemLink="item.itemLink"
            :color="item.color"
          ></card-item>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardItem from '../components/Item.vue'
export default {
  name: 'Home',
  components: {
    CardItem
  },
  data: () => ({
    items: [
      {
        overline: 'Book Info',
        title: 'Data Input',
        subtitle: 'Enter emotional data for each episode',
        icon: 'mdi-chart-box-plus-outline',
        itemLink: '/book-info-input',
        color: 'blue lighten-4'
      },
      {
        overline: 'Book Info',
        title: 'Title Editor',
        subtitle: 'Manage book titles',
        icon: 'mdi-chart-box-plus-outline',
        itemLink: '/book-title-editor',
        color: 'blue lighten-4'
      },
    ]
  }),
}
</script>
