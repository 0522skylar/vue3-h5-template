<template>
  <div class="box">
    <van-pull-refresh v-model="loading" class="myVanPullRefresh" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>

    <RequestLoading></RequestLoading>

    <van-button type="primary" @click="testLoading">测试</van-button>
    <br />
    <br />
    <van-button type="primary" @click="testPop">测试Popup</van-button>
    <!-- <Popup :showPopup="showPop" :optionsList="list" @setShowPopup="setShowPopup" /> -->
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Toast } from 'vant'
import { vuexStore } from '@/store/index'
import RequestLoading from '@/components/interactions/RequestLoading.vue'
// import Popup from '@/components/dropdown/Popup.vue'

export default {
  setup() {
    const count = ref(0)
    const loading = ref(false)
    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功')
        loading.value = false
        count.value++
      }, 1000)
    }

    const showPop = ref(false)

    const list = ref([
      {
        specificEventId: 1,
        specificEventName: 'a'
      },
      {
        specificEventId: 2,
        specificEventName: 'b'
      },
      {
        specificEventId: 3,
        specificEventName: 'c'
      },
      {
        specificEventId: 4,
        specificEventName: 'd'
      }
    ])

    const testPop = () => {
      showPop.value = true
      console.log(1111, showPop.value)
    }
    const testLoading = () => {
      // vuexStore.commit('changeIsLoading', true)
      console.log(vuexStore.state.isLoading)
    }

    const setShowPopup = (data) => {
      const { showPopup, list } = data
      showPop.value = showPopup
      console.log('emit ---> ', list)
    }
    return {
      count,
      loading,
      onRefresh,
      testLoading,
      showPop,
      testPop,
      setShowPopup,
      list
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
}
.myVanPullRefresh {
  height: 5rem;
  background: pink;
}
p {
  font-size: 0.5rem;
}
</style>
