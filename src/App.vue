<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router'
import { getUser } from './apis/user';
import AsyncSelect from './components/AsyncSelect';

import type { ComponentExposed } from 'vue-component-type-helpers';

const isShow = ref(false)
const value = ref('')
const success = ref({
  text: 'valid',
  color: 'green'
})
const fail = ref({
  text: 'invalid',
  color: 'red'
})
const isValid = computed(() => value.value.length === 8 && /[a-zA-Z0-9]/.test(value.value))

function handleClick() {
  isShow.value = !isShow.value
  value.value = '1222'
}

function handleSelect(value: string, option: {
  text: string;
  value: string;
}) {
  console.log(value, option)
}

// 使用ref拿到子组件实例，并间接调用子组件方法
const AsyncSelectRef = ref<ComponentExposed<typeof AsyncSelect>>();

function handleRefresh() {
  console.log(AsyncSelectRef)
  AsyncSelectRef.value?.refresh()
}

</script>

<template>
  <div>
    <input type="text" :value="value" @input="(e) => value = (e.target as HTMLInputElement).value" />
    <p v-if="isValid" :style="{ color: success.color }">{{ success.text }}</p>
    <p v-else :style="{ color: fail.color }">{{ fail.text }}</p>
    <button @click="handleClick">click</button>

    <button @click="handleRefresh">refresh</button>
  </div>

  <AsyncSelect ref="AsyncSelectRef" v-if="isShow" :fetch="getUser"
    :mapper="(record) => ({ text: record.name, value: record.id })" @onSelect="handleSelect" />
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
