<template>
  <div>
    <v-card
      class="mx-auto"
      height="200"
      :color=color
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ overline }}
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>
  
        <!-- <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar> -->
        
        <v-icon x-large>
          {{ icon }}
        </v-icon>

      </v-list-item>
  
      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
          :to=itemLink
        >
          Open
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['overline', 'title', 'subtitle', 'icon', 'itemLink', 'color'],
  data: () => ({
  }),
  mounted () {
  }
}
</script>
