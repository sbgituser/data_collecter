module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy:'https://8a4woptaxl.execute-api.ap-northeast-1.amazonaws.com'
  }
}
