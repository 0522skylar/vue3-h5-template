<template>
  <router-view />
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早起浏览器*/
  -moz-user-select: none; /*火狐浏览器*/
  -ms-user-select: none; /*IE浏览器*/
  user-select: none; /*用户是否能够选中文本*/
}
input,
textarea {
  -webkit-user-select: auto;
}
</style>
