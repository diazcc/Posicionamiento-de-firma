<template>
  <main class="main" :ref="drop">
    <p>Posicionamiento VUE</p>
    <input type="file" @change="getFile" />
    <div class="main__content">
      <ul class="main__content__signs">
        <DraggableBoxAtom v-for="(value, key) in boxes" :id="key" :key="key" :left="value.left" :top="value.top"
          @isDragging="getStateDragggin">
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
import { Reactive, reactive, Ref, ref, watch } from 'vue'
import PdfViewerAtom from '../../atom/pdf-viewer/PdfViewer.atom.vue';
import { ItemTypes } from '../../../interfaces/ItemTypes';
const currentBox: any = reactive({});
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
    title: string,
    isDragging: boolean
  }
}>({
  a: { top: 20, left: 80, title: 'Drag me around', isDragging: false },
  b: { top: 180, left: 20, title: 'Drag me too', isDragging: false },
})

const moveBox = (id: string, left: number, top: number) => {
  Object.assign(boxes[id], { left, top })
}
const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,

  drop(item: any, monitor: any) {
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
    const newLeft = Math.round(item.left + delta.x);
    const newTop = Math.round(item.top + delta.y);
    console.log('hijo', {
      top: newTop,
      left: newLeft
    });
    // Save initial position before moving
    const initialLeft = item.left;
    const initialTop = item.top;

    const clientOffset = monitor.getClientOffset();
    if (clientOffset) {
      const element = document.elementFromPoint(clientOffset.x, clientOffset.y);
      const elFather = element?.closest('.page');
      ``
      if (elFather) {
        const rectFather = elFather.getBoundingClientRect();
        console.log('elFather', {
          top: rectFather.top + 9,
          left: rectFather.left + 9
        });
        // Define the dimensions of the DraggableBoxAtom
        const boxWidth = 100; // Reemplaza con el ancho real de tu DraggableBoxAtom
        const boxHeight = 100; // Reemplaza con la altura real de tu DraggableBoxAtom


        const excessTop = newTop - (rectFather.top + 9);
        const excessLeft = newLeft - (rectFather.left + 9);


        // Check if the DraggableBoxAtom is inside the dimensions of elFather
        setSignOnPdf(elFather, {
          id: item.id,
          top: excessTop,
          left: excessLeft
        }) && moveBox(item.id, newLeft, newTop) 


        /* const isInside = (
          newLeft >= rectFather.left &&
          newLeft + boxWidth <= rectFather.right &&
          newTop >= rectFather.top &&
          newTop + boxHeight <= rectFather.bottom
        );
        if (isInside) {

         
        } else {
          moveBox(item.id, initialLeft, initialTop);
        } */

      } else {
        console.log('No parent element found with class "page"');
      }
    }

    return undefined;
  },
}));
function setSignOnPdf(elPdf: Element, position: { id: string, top: any, left: any }):boolean {
  console.log(elPdf);
  const elSig: any = document.querySelector(`[data-id="${position.id}"]`)
  console.log(elSig);
  if (!elPdf.contains(elSig)) {
    console.log('siiiiiiiiiiiii');
    elPdf.appendChild(elSig);
    moveBox(position.id, position.left, position.top)
    return false;
  }else{
    return true;
  }
}


function getStateDragggin(box: any): void {
  /* console.log(box); */
  if (box && box.id) {
    currentBox.value = box;
    /* console.log(currentBox.value);
    console.log(currentBox.value.id); */
    getPositionDraggableBox(currentBox.value.id)
  } else {
    console.error('Received invalid box:', box);
  }
}


async function getPositionDraggableBox(key: any) {
  console.log(key);
  const draggableBox: HTMLElement | null = document.querySelector(`[data-id="${key}"]`);

  if (draggableBox) {
    const rect = draggableBox.getBoundingClientRect();
    console.log('Position and dimensions of draggableBox:', {
      top: rect.top + window.scrollY, // Ajuste para la posición en pantalla
      left: rect.left + window.scrollX, // Ajuste para la posición en pantalla
      bottom: rect.bottom + window.scrollY, // Ajuste para la posición en pantalla
      right: rect.right + window.scrollX, // Ajuste para la posición en pantalla
      width: rect.width,
      height: rect.height
    });
  } else {
    console.log(`Element with data-id="${key}" not found.`);
  }
}


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
