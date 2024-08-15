<template>
  <main class="main">
    <p>HOLA --- {{ isCurrentDragg }}</p>
    <input type="file" @change="getFile" />
    <div class="main__content" :ref="drop">
      <ul class="main__content__signs">
        <li
          v-for="(box, id) in boxes"
          v-if="!isCurrentDragg"
          :key="id"
          :ref="drag"
          role="Box"
          data-testid="box"
          :style="{ top: `${box.top}px`, left: `${box.left}px`, position: 'absolute', cursor: 'move' }"
          @dblclick="handleDoubleClick($event, id)"
        >
          {{ box.title }}.-
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, toRefs, Ref, ref } from 'vue';
import { useDrag, useDrop, XYCoord } from 'vue3-dnd';
import PdfViewerAtom from '../../atom/pdf-viewer/PdfViewer.atom.vue';
import { Box } from '../../../interfaces/Box.interface';
import { DragItem } from '../../../interfaces/DragItem.interface';

const boxes = reactive<Record<string, Box>>({
  a: { top: 20, left: 80, title: 'Drag me around' },
});
const isCurrentDragg: Ref<boolean> = ref(false);

// Drop configuration
const [, drop] = useDrop(() => ({
  accept: 'box',
  drop(item: DragItem, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord | null;
    if (delta) {
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveBox(item.id, { left, top });
    }
  },
}));

const moveBox = (id: string, newPosition: { left: number; top: number }) => {
  const { left, top } = newPosition;
  if (boxes[id]) {
    boxes[id] = { ...boxes[id], left, top };
  } else {
    console.error(`Box with id ${id} does not exist.`);
  }
};

// Drag configuration
const [collect, drag] = useDrag<DragItem>(() => ({
  type: 'box',
  item: (monitor: any) => {
    const box = boxes.a;
    return { id: 'a', left: box.left, top: box.top };
  },
  collect: (monitor) => {
    isCurrentDragg.value = monitor.isDragging();
    return { isDragging: monitor.isDragging(), }
  }
  ,
  previewOptions: {
    captureDraggingState: true,
  },
}));

const { isDragging }: any = toRefs(collect);

function handleDoubleClick(event: MouseEvent, id: string) {
  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const left = rect.left + window.scrollX;
  
  console.log(`Element ID: ${id}`);
  console.log(`Top: ${top}, Left: ${left}`);
}

function getFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style scoped src="./Home.page.scss">
.main__content__signs li {
  width: 100px;
  height: 50px;
  background-color: lightgray;
  text-align: center;
  line-height: 50px;
}
</style>
