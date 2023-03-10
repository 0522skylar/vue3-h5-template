# 适用于建立移动端h5的Vue模板

### Node 版本要求

`Vite` 需要 Node.js 12.0.0 或更高版本 (推荐 14.0.0+)。你可以使用 [nvm]("https://github.com/nvm-sh/nvm") 或 [nvm-windows]("https://github.com/coreybutler/nvm-windows") 在同一台电脑中管理多个 Node 版本。

本示例 Node.js 14.17.0

### 启动项目

```
npm i

npm run dev

```

## rem适配方案

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

-   [postcss-pxtorem]("https://github.com/cuth/postcss-pxtorem") 是一款 `postcss` 插件，用于将单位转化为 `rem`
-   [lib-flexible]("https://github.com/amfe/lib-flexible") 用于设置 `rem` 基准值


更多详细信息： [vant](https://link.juejin.cn?target=https%3A%2F%2Fyouzan.github.io%2Fvant%2F%23%2Fzh-CN%2Fquickstart%23jin-jie-yong-fa "https://youzan.github.io/vant/#/zh-CN/quickstart#jin-jie-yong-fa")

已加入浏览器适配postcss-pxtorem方案，使用px单位，会自动转为rem单位

## VantUI组件按需加载

src/plugins/vant.ts


## eslint

vue一些eslint配置说明文档：
https://eslint.vuejs.org/rules/

自定义你的规则 中文手册:
https://cloud.tencent.com/developer/chapter/12617

```
npm run eslint or yarn eslint
```

## prettier

官网：
https://www.prettier.cn/docs/install.html

```
npm run prettier or yarn prettier
```

## 引入全局样式变量

```ts
// 全局引入theme-styles

// vite.config.ts
css: {
  preprocessorOptions: {
    // 全局样式引入
    scss: {
      additionalData: '@import "theme-styles/styles/theme-light/color.scss";',
      javascriptEnabled: true
    }
  }
}
```


## Vuex 状态管理

目录结构

```
├── store
│   ├── index.ts
复制代码
```

`main.ts` 引入


## Pinia 状态管理
### 1.安装
`node版本需>=14.0.0`
```js
yarn add pinia 
# or with npm 
npm install pinia
```
### 2. 创建Pinia的Store
在`src/store/index.ts` 文件中，导出 piniaStore
```js
// src/store/index.ts

import { createPinia } from 'pinia'

export const piniaStore = createPinia()
```
### 3.在main.ts文件中引用

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { vuexStore, piniaStore } from './store';

createApp(App).use(vuexStore).use(piniaStore).use(router).use(vantPlugins).use(components).mount('#app');

```
### 3. 定义State
在`src/store`目录下新建有个`pinia.ts`文件

#### i. 传统的`options API`方式
```js
import { defineStore } from "pinia"
export const usePiniaState = defineStore({
    id: 'textPinia',
    state: () => {
        return {
            userName: ''
        }
    },
    getters: {

    },
    actions: {
        getUserName(data) {
            this.userName = data
        }
    }
})
```

#### ii.Vue3 `setup`的编程模式
```js
import { ref } from 'vue'
import { defineStore } from "pinia"
export const usePiniaState = defineStore('pinia', ()=>{
    const userName = ref('')
    // 修改userName的方法
    const getUserName = (data) => {
        userName.value = data
    }
    return { userName, getUserName}
})
```

### 4.获取/修改 state

```html
<script setup lang="ts">
	import { storeToRefs  } from 'pinia'
	import { usePiniaState } from '@/store/pinia'
        
	// pinia
	const piniaStore = usePiniaState()
        
	// 通过storeToRefs方法将存储在pinia里的数据解构出来，保持state响应性
	const { userName } = storeToRefs(piniaStore)
	const { getUserName } = piniaStore
	

  const handleBtn = () =>{
      // pinia
      getUserName('your name')
  }

</script>
```
## Vue-router

本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`

#### 自动化导入路由
```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 通过Vite的import.meta.glob()方法实现自动化导入路由
const mainRouterModules = import.meta.glob('../layout/*.vue')
const viewRouterModules = import.meta.glob('../views/**/*.vue')

// 子路由
const childRoutes = Object.keys(viewRouterModules).map((path)=>{	
	const childName = path.match(/\.\.\/views\/(.*)\.vue$/)[1].split('/')[1];
	return {
		path: `/${childName.toLowerCase()}`,
		name: childName,
		component: viewRouterModules[path]
	} 
})

console.log(childRoutes,'childRouter');

// 根路由
const rootRoutes = Object.keys(mainRouterModules).map((path) => {
    const name = path.match(/\.\.\/layout\/(.*)\.vue$/)[1].toLowerCase();
    const routePath = `/${name}`;
    if (routePath === '/index') {
      return {
        path: '/',
        name,
        redirect: '/home',
        component: mainRouterModules[path],
        children: childRoutes
      };
    }
})

const routes: Array<RouteRecordRaw> = rootRoutes

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router
```

#### 普通设置
```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import ('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive:false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/About.vue')
      },
    ]
  },    
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
```

更多:[Vue Router](https://link.juejin.cn?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2F "https://router.vuejs.org/zh/")

## Axios 封装及接口管理

`utils/request.js` 封装 axios ,开发者需要根据后台接口做修改。

#### 接口管理

在`src/api` 文件夹下统一管理接口


通过引入axios库的ts版本即可配置
```js
import axiosInstance, { AxiosResponseProps } from '@/uitls/request'

export const getList = (params: any) => {
	return axiosInstance.get("/common/code/logisticsInfo/getOrderByPhone", { params: params || {} });
}
```

#### 如何调用

```
// 请求接口
import { getUserInfo } from '@/api/home'

const params = {user: 'talktao'}
getUserInfo(params)
  .then(() => {})
  .catch(() => {})
复制代码
```


## Eslint+Pettier 统一开发规范

VScode安装 `eslint` `prettier` `vetur` 插件 `.vue` 文件使用 vetur 进行格式化，其他使用`prettier`

## 批量全局注册公共组件
文件地址在 `src/plugins/components`
```js
const modules = import.meta.globEager('../components/*.vue')

export default {
  install(app) {
    Object.keys(modules).forEach(componentPath => {

    let splitPart1 = componentPath.split("/")
    let componentName = splitPart1[splitPart1.length - 1].split(".vue")[0]

    // 获取所有组件的实例对象，它是个数组
    let modulesData = Object.values(modules).map((v) => v.default)

    // 过滤出当前组件的实例对象与注册组件匹配一致
    let curComponent = modulesData.filter(
        item=>item.__file.split("/")[item.__file.split("/").length-1].split(".vue")[0] === componentName
    )[0]          

    app.component(componentName, curComponent);
    })
  }
}
```
上面的批量全局注册公共组件在本地启动中正常，但是上生产打包后，会有问题，具体是__file该组件路径找不到，可以修改成如下代码：
``` js
  
const modules = import.meta.globEager('../components/*.vue')

export default {
  install(app) {
      Object.keys(modules).forEach(componentPath => {

          // 获取遍历的当前组件实例对象
          let curComponent = modules[componentPath]?.default 

          app.component(curComponent.name, curComponent);
      })
  }
 
}

```
### 注意：
由于sfc语法糖没有携带组件的name属性，上面的curComponent.name会报curComponent下没有name属性，此时需要在注册的公共组件中加上如下代码，比如在src/components/CustomHeader.vue中加上如下代码，这样组件的实例对象中就会有name属性

```js
<script lang="ts">
export default {
  name: "CustomHeader",
};
</script>
```

### 禁止双手缩放页面
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,viewport-fit=cover,user-scalable=no" />

```

### 禁止选中文本

```css
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
```