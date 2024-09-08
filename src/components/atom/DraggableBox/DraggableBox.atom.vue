<!-- 
 
  prop: {
      name: 'Sofia',
      email: 'sofia@example.com',
      id: '',
      type: 'img',
      content: {
        base64: 'image_base64_5'
      },
      top: 500,
      left: 550,
      page: '5',
    }

-->

<template>
  <div v-show="isDragging" :ref="drag" />
  <div v-show="!isDragging" :ref="drag" class="box" :style="{
    left: `${propDraggBox.left}px`,
    top: `${propDraggBox.top}px`,
    visibility: isDragging ? 'hidden' : 'visible',
    position: (propDraggBox.left != 0 && propDraggBox.left != 0) ? 'absolute' : 'relative'
  }" role="Box" :data-id="email + index" data-testid="box">
      <p class="box__delete">X</p>
    <section>
      <p>{{ propDraggBox.name }}</p>
      <p>{{ propDraggBox.email }}</p>
      <!-- <nav>
        <button>...</button>
      </nav> -->
    </section>
  </div>
</template>


<script lang="ts" setup>
import { useDrag } from 'vue3-dnd'
import { reactive, ref, Ref, ToRefs, toRefs, watch } from 'vue';
const emit: any = defineEmits(['isDragging'])
const isDragging: Ref<boolean> = ref(false);
const propDraggBox: any = defineProps(['dataDraggableBox', 'index', 'top', 'left', 'email', 'name']);

const [collect, drag] = useDrag(() => ({
  type: 'box',
  item: { email: propDraggBox.email, left: propDraggBox.left, top: propDraggBox.top, index: propDraggBox.index },
  collect: monitor => {
    isDragging.value = monitor.isDragging();
    return {
      isDragging: monitor.isDragging(),
    }
  },
}))
watch(() => isDragging,
  (newValue, oldValue) => {
    emit('isDragging', {
      email: propDraggBox.email,
      left: propDraggBox.left,
      top: propDraggBox.top,
      index: propDraggBox.index,
      isDragging: newValue.value
    })
  },
  { deep: true }
);

</script>


<style scoped src="./DraggableBox.atom.scss"></style>