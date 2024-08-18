<template>
  <main class="main">
    <p>Posicionamiento VUE</p>
    <input type="file" @change="getFile" />
    <div class="main__content" :ref="drop">
      <ul class="main__content__signs">
        <DraggableBoxAtom v-for="(value, key) in boxes" :id="key" :key="key" :left="value.left" :top="value.top"
          :hide-source-on-drag="hideSourceOnDrag">
          {{ value.title }}
        </DraggableBoxAtom>
      </ul>
      <PdfViewerAtom :data-pdf-viewer="dataPdfViewer" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useDrop, XYCoord } from 'vue3-dnd'
import DraggableBoxAtom from '../../atom/DraggableBox/DraggableBox.atom.vue';
import { reactive, ref } from 'vue'
import PdfViewerAtom from '../../atom/pdf-viewer/PdfViewer.atom.vue';
import { ItemTypes } from '../../../interfaces/ItemTypes';
const props = defineProps<{
  hideSourceOnDrag: boolean
}>()
const dataPdfViewer: any = reactive(
  {
    urlPdf: '',
    toolbar: {
      toolbar: false
    },
    onClose: () => {
    }
  });
const boxes = reactive<{
  [key: string]: {
    top: number
    left: number
    title: string
  }
}>({
  a: { top: 20, left: 80, title: 'Drag me around' },
  b: { top: 180, left: 20, title: 'Drag me too' },
})

const moveBox = (id: string, left: number, top: number) => {
  Object.assign(boxes[id], { left, top })
}

const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,

  drop(item: any, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y)
    moveBox(item.id, left, top)
    return undefined
  },
}))

function getFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      dataPdfViewer.urlPdf = e.target?.result; 
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style scoped src="./Home.page.scss"></style>
