<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { storeToRefs } from 'pinia'
import { usePiniaState } from '@/store/testPinia'

import logo from '@/assets/logo.png'

// vuex
// const vuexStore = useStore()

// pinia
const piniaStore = usePiniaState()

// vuex
// const  userName  = computed(() => vuexStore.state.userNmae)

// 通过storeToRefs方法将存储在pinia里的数据解构出来，保持state响应性
const { userName } = storeToRefs(piniaStore)
const { getUserNmae } = piniaStore

const handleBtn = () => {
  // vuex
  // vuexStore.commit('userName','真乖，如果对您有帮助请在github上点个星星哦~')

  // pinia
  getUserNmae('真乖，如果对您有帮助请在github上点个星星哦~')
}
</script>

<template>
  <div class="about">
    <CustomHeader title="我的" />
    <div class="wrapper">
      <div class="list flex-center py-8 flex-column">
        <span class="logo">
          <van-image width="150" :src="logo" />
        </span>
        <span class="logo fs-1 py-3 opacity-75">VUE3 H5开发模板</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
