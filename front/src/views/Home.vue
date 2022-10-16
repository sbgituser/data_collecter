<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.index"
          cols="4"
        >
          <card-item 
            :overline="item.overline"
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :itemLink="item.itemLink"
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
        itemLink: '/book-info-input'
      },
    ]
  }),
}
</script>
