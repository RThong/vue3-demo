<script setup lang="ts" generic="T">
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

type Option = { text: string, value: string }

const { fetch, mapper } = defineProps<{
  fetch: () => Promise<T[]>
  mapper: (val: T) => Option
}>()

const emit = defineEmits<{
  (e: 'onSelect', value: string, option: Option): void
}>()

const { isFetching, data, refetch } = useQuery({
  queryKey: ['user'],
  queryFn: fetch,
  gcTime: 0,
  select: (val) => val.map(mapper)
});

defineExpose<{
  refresh: UseQueryReturnType<Option[], Error>['refetch']
}>({
  refresh: refetch
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('onSelect', target.value, (data.value ?? []).find(item => item.value === target.value)!)
}

</script>

<template>
  <div>
    <select name="" id="" @change="handleChange">
      <option :key="item.value" v-for="item in data" :value="item.value">{{ item.text }}</option>
    </select>
    <p style="color: blue">{{ isFetching }}</p>
  </div>
</template>