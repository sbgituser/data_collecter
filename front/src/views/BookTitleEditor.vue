<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          id="books-table"
          :headers="headers"
          :items="books"
          sort-by="title"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Bookinfo</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.title"
                            label="タイトル"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.magazine"
                            label="掲載誌"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.label"
                            label="レーベル"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.publisher"
                            label="出版社"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.author"
                            label="作者"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-textarea
                            v-model="editedItem.overview"
                            label="概要"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.url1"
                            label="URL1"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.url2"
                            label="URL2"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="bule darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6"
                    >このデータを削除しますか?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue barken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue barken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click.stop="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small class="mr-2" @click="copyItem(item)"> mdi-content-copy </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="auto">
      <v-dialog v-model="dialogCommit" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on="on"
          >
            確定
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h6">このデータを確定しますか?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue barken-1" text @click="closeCommit"
              >Cancel</v-btn
            >
            <v-btn color="blue barken-1" text @click="commit"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogCommit: false,
    headers: [
      {
        text: "Title",
        align: "start",
        value: "title",
      },
      { text: "Author", value: "author" },
      { text: "magazine", value: "magazine" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    books: [],
    editedIndex: -1,
    editedItem: {
      book_id: "",
      title: "",
      label: "",
      author: "",
      magazine: "",
      publisher: "",
      overview: "",
      url1: "",
      url2: "",
    },
    defaultItem: {
      book_id: "",
      title: "",
      label: "",
      author: "",
      magazine: "",
      publisher: "",
      overview: "",
      url1: "",
      url2: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    this.axios.get("/comic-info").then((res) => {
      console.log(res.data);
      this.books = res.data;
      console.log(this.books)
    });
  },
  methods: {
    initialize() {},
    newItem() {
      // new itemボタンを押したときのメソッド
      this.dialog = true;
      console.log(this.dialog);
    },
    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.books.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    copyItem(item) {
      item.book_id = ""
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem);
      } else {
        this.books.push(this.editedItem);
      }
      this.close();
    },
    closeCommit() {
      this.dialogCommit = false
    },
    commit() {
      console.log(this.books)
      this.axios
        .post(
          "/comic-info",
          JSON.stringify(this.books),
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
      this.closeCommit()
    },
  },
};
</script>

<style>
/* tr td:nth-of-type(3){
  background-color:skyblue;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
</style>