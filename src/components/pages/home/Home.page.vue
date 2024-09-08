<template>
  <main class="main" :ref="drop">
    <div class="main__content">
      <ul class="main__content__signs">
        <template v-for="(sign, index) in dataDraggableBox.signs">
          <DraggableBoxAtom :email="sign.email" :name="sign.name" :top="sign.position.top" :left="sign.position.left"
            :index="index" />
        </template>
      </ul>
      <PdfViewerAtom :data-pdf-viewer="dataPdfViewer" />
    </div>
    <nav class="main__nav">
      <button>Atras</button>
      <PdfModifierAtom :data-pdf-modifier="dataPdfModifier" />
    </nav>
  </main>
</template>

<script lang="ts" setup>
import { useDrop, XYCoord } from 'vue3-dnd'
import DraggableBoxAtom from '../../atom/DraggableBox/DraggableBox.atom.vue';
import { onMounted, Reactive, reactive, Ref, ref, watch } from 'vue'
import PdfViewerAtom from '../../atom/pdf-viewer/PdfViewer.atom.vue';
import { ItemTypes } from '../../../interfaces/ItemTypes';
import PdfModifierAtom from '../../atom/pdf-modifier/PdfModifier.atom.vue';
const dataDraggableBox: any = reactive({
  signs: [
    {
      name: 'Sofia',
      email: 'sofia@example.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_5'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '5',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'aaa',
      email: 'aaaa@sss.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_5'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '5',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Carlos',
      email: 'carlos@example.com',
      type: 'text',
      content__text: {
        text: 'Carlos Signature'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '3',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Maria',
      email: 'maria@example.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_12'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '2',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'John',
      email: 'john.doe@example.com',
      type: 'canvas',
      content__canvas: {
        width: 400,
        height: 200,
        drawing: 'canvas_drawing_data'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '4',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Elena',
      email: 'elena@example.com',
      type: 'text',
      content__text: {
        text: 'Elena Graphical Signature'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '6',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Lucas',
      email: 'lucas@example.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_25'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '1',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Ana',
      email: 'ana.smith@example.com',
      type: 'canvas',
      content__canvas: {
        width: 300,
        height: 150,
        drawing: 'canvas_drawing_data_ana'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '7',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Paul',
      email: 'paul@example.com',
      type: 'text',
      content__text: {
        text: 'Paul Handwritten'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '3',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Samantha',
      email: 'samantha@example.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_30'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '8',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Paul',
      email: 'paul@example.com',
      type: 'text',
      content__text: {
        text: 'Paul Handwritten'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '3',
      width: 197.59,
      height: 60.8
    },
    {
      name: 'Samantha',
      email: 'samantha@example.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_30'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '8',
      width: 197.59,
      height: 60.8
    }
  ]
  ,
  userSign: ''
});
const dataPdfModifier: any = reactive({
  urlPdf: '',
  pages: [
    {
      texts: [
        {

          value: '',
          posX: '',
          posY: '',
        }
      ],
    }
  ]
});
const dataPdfViewer: any = reactive(
  {
    urlPdf: '',
    toolbar: {
      toolbar: false
    },
    onClose: () => {
    }
  });


onMounted(() => {
  loadLocalPdf();
})

const moveBox = (left: number, top: number, index: any) => {
  dataDraggableBox.signs[index].left = left;
  dataDraggableBox.signs[index].top = top;
}



const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop(item: any, monitor: any) {
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
    console.log('FirmaD (delta):', delta);
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y + 12)
    const x = Math.round(delta.x + 9);
    const y = Math.round(delta.y);
    const newLeft = Math.round(item.left + delta.x);
    const newTop = Math.round(item.top + delta.y);
    const initialLeft = item.left;
    const initialTop = item.top;
    const clientOffset = monitor.getClientOffset();
    if (clientOffset) {
      const element = document.elementFromPoint(clientOffset.x, clientOffset.y);
      const elFather = element?.closest('.page');
      if (elFather) {
        const rectFather = elFather.getBoundingClientRect()
        const totalWidth = rectFather.width+rectFather.top;  // Ancho total del padre
        const totalHeight = rectFather.height+rectFather.left; // Alto total del padre
        const excessTop = newTop - 9;
        const excessLeft = newLeft - (rectFather.left + 9);
        dataDraggableBox.signs[item.index].position = {
          top: excessTop,
          left: excessLeft,
          index: item.index
        }
        console.log(dataDraggableBox.signs[item.index].position.left);
        
        
        if (setSignOnPdf(elFather, dataDraggableBox.signs[item.index])) {
          const signLeft = dataDraggableBox.signs[item.index].position.left;
          const signTop = dataDraggableBox.signs[item.index].position.top;
          const signRight = signLeft + dataDraggableBox.signs[item.index].width;
          const signBottom = signTop + dataDraggableBox.signs[item.index].height;
          const isOverflowingX = signRight > totalWidth;
          const isOverflowingY = signBottom > totalHeight;
          if (isOverflowingX || isOverflowingY) {
            console.log("La firma sobresale del padre.");
            return false;
          } else {
            console.log("La firma está dentro de los límites.");
          }

          dataDraggableBox.signs[item.index].position = {
            top: top,
            left: left,
            index: item.index
          }

        }
      } else {
        console.log('No parent element found with class "page"');
      }

    }

    return undefined;
  },
}));
function setSignOnPdf(elPdf: Element, sign: any): boolean {

  /* {
      name: 'Sofia',
      email: 'sofia@example.com',
      type: 'img',
      content__img: {
        base64: 'image_base64_5'
      },
      position: {
        top: 0,
        left: 0,
      },
      page: '5',
      width: 197.59,
      height: 60.8
      width: 197.59,
      height: 60.8
    } */
  const rectFather = elPdf.getBoundingClientRect();
  /* const totalWidth = rectFather.width;  // Ancho total del padre
  const totalHeight = rectFather.height; // Alto total del padre */
  const totalLeft = rectFather.left + 16; // Alto total del padre
  const totalTop = rectFather.top + 16; // Alto total del padre

  const elSig: any = document.querySelector(`[data-id="${sign.email + sign.position.index}"]`);
  console.log('FirmaD (hijo):', elSig);


  if (!elPdf.contains(elSig)) {
    elPdf.appendChild(elSig);
    moveBox(sign.position.left, sign.position.top, sign.position.index);

    // Calcula las posiciones absolutas de la firma
    const signLeft = sign.position.left;
    const signTop = sign.position.top;
    const signRight = signLeft + sign.width;
    const signBottom = signTop + sign.height;
    console.log('Firma (sign.position.left):', sign.position.left);
    console.log('Firma (signRight):', signRight);
    console.log('Firma (signTop):', signTop);
    // Comprueba si se sale de los límites del padre
    /* const isOverflowingX = signRight > totalWidth;
    const isOverflowingY = signBottom > totalHeight;
 */

    // Ajustar la posición del texto en el PDF
    dataPdfModifier.pages[0].texts[0] = {
      value: 'Firmado',
      posX: sign.position.left,
      posY: ((rectFather.height - 20) - sign.position.top) - 140,
    };

    return true;
  } else {
    console.log('La firma ya está dentro del contenedor.');
    return true;
  }
}




function loadLocalPdf() {
  const localPdfUrl = new URL('../../../assets/files/pdf.pdf', import.meta.url).href; // Carga el PDF desde la ubicación local
  dataPdfViewer.urlPdf = localPdfUrl;
  dataPdfModifier.urlPdf = localPdfUrl;
}
</script>

<style scoped src="./Home.page.scss"></style>
