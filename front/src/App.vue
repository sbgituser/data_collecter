<template>
  <v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
      color='lime lighten-5'
    >
      <v-menu
        open-on-hover
        top
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>
              <v-btn
                text
                :to=item.value
              >
                {{ item.title }}
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-title>Application</v-toolbar-title>

    </v-app-bar>

    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items: [
      {title: 'HOME', value: '/'}
    ]
  }),
};
</script>
