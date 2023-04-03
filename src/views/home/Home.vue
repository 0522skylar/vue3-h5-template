<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { getTest } from '@/api/home'
import logo from '@/assets/logo.png'

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

// 请求真实数据
const getTestData = async () => {
  let params = {
    modules: 'statisGradeCityDetail',
  }
  const result = await getTest(params)
  console.log(result)
}

onMounted(() => {
  getTestData()
})
</script>

<template>
  <div>
    <CustomHeader title="首页" />
    <div class="py-3 px-3">
      <div class="title py-2 flex-start align-items-center">
        <van-image width="36" :src="logo" />
        <span class="fs-4 px-5">Vue3+TS H5开发模板</span>
      </div>
      <div class="subTitle px-3 fs-3 opacity-50">
        A Vue3 h5 template with Vant UI
      </div>
    </div>
    <div class="py-5">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
