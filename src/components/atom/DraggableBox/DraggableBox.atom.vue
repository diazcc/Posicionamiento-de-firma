<script lang="ts" setup>
import { useDrag } from 'vue3-dnd'
import { reactive, ref, Ref, ToRefs, toRefs } from 'vue';

const isDragging: Ref<boolean> = ref(false);
const props = defineProps<{
  id: any
  left: number
  top: number
  hideSourceOnDrag?: boolean
}>()

const [collect, drag] = useDrag(() => ({
  type: 'box',
  item: { id: props.id, left: props.left, top: props.top },
  collect: monitor => {
    console.log(monitor.isDragging())
    isDragging.value = monitor.isDragging();
    return {
      isDragging: monitor.isDragging(),
    }
  },
}))
</script>

<template>
  <div v-if="isDragging" :ref="drag" />
  <div v-else :ref="drag" class="box" :style="{ left: `${left}px`, top: `${top}px` }" role="Box" data-testid="box">
    <slot></slot>
  </div>
</template>

<style scoped src="./DraggableBox.atom.scss"></style>