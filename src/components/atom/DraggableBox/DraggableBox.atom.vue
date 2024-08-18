<template>
  <div v-show="isDragging" :ref="drag" />
  <div
    v-show="!isDragging"
    :ref="drag"
    class="box"
    :style="{ 
      left: `${left}px`, 
      top: `${top}px`, 
      visibility: isDragging ? 'hidden' : 'visible' 
    }"
    role="Box"
    :data-id="props.id"
    data-testid="box"
  >
    <slot></slot>
  </div>
</template>



<script lang="ts" setup>
import { useDrag } from 'vue3-dnd'
import { reactive, ref, Ref, ToRefs, toRefs, watch } from 'vue';
const emit: any = defineEmits(['isDragging'])
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
    isDragging.value = monitor.isDragging();
    return {
      isDragging: monitor.isDragging(),
    }
  },
}))
watch(() => isDragging,
  (newValue, oldValue) => {
    console.log(newValue.value);
    emit('isDragging', {
      id: props.id,
      left: props.left,
      top: props.top,
      isDragging: newValue.value
    })
  },
  { deep: true }
);




</script>


<style scoped src="./DraggableBox.atom.scss"></style>