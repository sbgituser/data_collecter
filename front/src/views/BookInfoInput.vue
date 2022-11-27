<template>
  <div>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-select
          v-model="data.title"
          :items="titleList"
          label="Title"
          :rules="[v => !!v || 'Title is required']"
          required
        ></v-select>

        <v-text-field
          v-model="data.episode"
          label="Episode"
          :rules="[v => !!v || 'Episode is required']"
          required
        ></v-text-field>

        <v-select
          v-model="data.review"
          :items="values"
          label="Review"
          :rules="[v => !!v || 'Value is required']"
          required
        ></v-select>

        <v-select
          v-model="data.m_ki"
          :items="values"
          label="喜(5)-哀(1)"
          :rules="[v => !!v || 'Value is required']"
          required
        ></v-select>

        <v-select
          v-model="data.m_do"
          :items="values"
          label="怒(5)-怖(1)"
          :rules="[v => !!v || 'Value is required']"
          required
        ></v-select>

        <v-select
          v-model="data.m_ko"
          :items="values"
          label="恋(5)-憎(1)"
          :rules="[v => !!v || 'Value is required']"
          required
        ></v-select>

        <v-select
          v-model="data.m_an"
          :items="values"
          label="安(5)-驚(1)"
          :rules="[v => !!v || 'Value is required']"
          required
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="upload"
        >
          Upload
        </v-btn>

      </v-form>
    </v-container>
  </div>  
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    data: {},
    required: value => !!value || "必ず入力してください",
    titleList: [],
    title: {},
    values: [
      1,2,3,4,5
    ],
    valid: false
  }),
  mounted () {
      this.axios
        .get(
          "/get-title"
        )
        .then((res) => {
          console.log(res.data)
          this.title = res.data
          for (let key in res.data) {
            this.titleList.push(res.data[key])
          }
        })
  },
  methods: {
    upload () {
      this.$refs.form.validate()
      console.log(JSON.stringify(this.data))
      this.axios
        .post(
          "/review-uploader",
          JSON.stringify(this.data),
          {headers: {'Content-Type': 'text/plain'}}
        )
        .then((res) => {
          console.log('------res')
          console.log(res);
          // this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log('------err')
          console.log(err);
        });
    }
  }
}
</script>

Access to XMLHttpRequest at 'https://8a4woptaxl.execute-api.ap-northeast-1.amazonaws.com/sample_s3_uploader' from origin 'http://localhost:8082' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
