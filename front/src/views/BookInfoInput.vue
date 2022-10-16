<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-select
        v-model="data.title"
        :items="titleList"
        label="Title"
        required
      ></v-select>

      <v-text-field
        v-model="data.episode"
        label="Episode"
        required
      ></v-text-field>

      <v-select
        v-model="data.review"
        :items="values"
        label="Review"
        required
      ></v-select>

      <v-select
        v-model="data.m_ki"
        :items="values"
        label="喜(5)-哀(1)"
        required
      ></v-select>

      <v-select
        v-model="data.m_do"
        :items="values"
        label="怒(5)-怖(1)"
        required
      ></v-select>

      <v-select
        v-model="data.m_ko"
        :items="values"
        label="恋(5)-憎(1)"
        required
      ></v-select>

      <v-select
        v-model="data.m_an"
        :items="values"
        label="安(5)-驚(1)"
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
  </div>  
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    data: [
      {
        title: 'aaa',
        episode: '1',
        review: 0,
        m_ki: 1,
        m_do: 2,
        m_ko: 3,
        m_an: 4
      },
    ],
    titleList: [
      'aaa',
      'bbb',
      'ccc'
    ],
    values: [
      1,2,3,4,5
    ],
    valid: false
  }),
  methods: {
    upload () {
      console.log(this.data)
      this.axios
        .post(
          "/sample_s3_uploader",
          // this.data,
          {
            title: 'aaa',
            episode: '1',
            review: 0,
            m_ki: 1,
            m_do: 2,
            m_ko: 3,
            m_an: 4
          },
          {headers: {'Content-Type': 'text/plain'}}
        )
        .then((res) => {
          console.log(res);
          // this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
      // this.axios
      //   .get(
      //     "/get-comics"
      //   )
      //   .then((response) => (console.log(response.data)))
    }
  }
}
</script>

Access to XMLHttpRequest at 'https://8a4woptaxl.execute-api.ap-northeast-1.amazonaws.com/sample_s3_uploader' from origin 'http://localhost:8082' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
