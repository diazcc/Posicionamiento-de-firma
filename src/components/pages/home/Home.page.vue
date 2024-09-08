<!--
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
  width: 197.59,
  height: 60.8
}
  
-->
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
    const newLeft = Math.round(item.left + delta.x);
    const newTop = Math.round(item.top + delta.y);
    const clientOffset = monitor.getClientOffset();
    if (clientOffset) {
      const element = document.elementFromPoint(clientOffset.x, clientOffset.y);
      const elSig: any = document.querySelector(`[data-id="${item.email + item.index}"]`);
      const elFather = element?.closest('.page');
      if (elFather) { // exist page?
        const rectFather = elFather.getBoundingClientRect()
        const totalWidth = rectFather.width + rectFather.top;  // Ancho total del padre
        const totalHeight = rectFather.height + rectFather.left; // Alto total del padre

        if (isOutOfBounds(elSig as HTMLElement, elFather as HTMLElement)) {
          console.log('SI');
          dataDraggableBox.signs[item.index].position = {
            top: newTop,
            left: newLeft,
            index: item.index
          }

        }
        if (valdiateSignOnPagePdf(elFather, elSig) == false) {
          setSignOnPdf(elFather, elSig)
        }
      } else {
        console.log('No parent element found with class "page"');
      }

    }

    return undefined;
  },
}));
function isOutOfBounds(elSig: HTMLElement, elFather: HTMLElement): boolean {
  // Obtener las dimensiones y posiciones de ambos elementos
  const sigRect = elSig.getBoundingClientRect();
  const fatherRect = elFather.getBoundingClientRect();
  // Verificar si elSig está fuera de los límites de elFather
  const isOutOfTop = sigRect.top < fatherRect.top;
  const isOutOfBottom = sigRect.bottom > fatherRect.bottom;
  const isOutOfLeft = sigRect.left < fatherRect.left;
  const isOutOfRight = sigRect.right > fatherRect.right;

  // Devolver true si está adentro
  return isOutOfTop || isOutOfBottom || isOutOfLeft || isOutOfRight;
}

const valdiateSignOnPagePdf = (page: Element, sign: Element): boolean => page.contains(sign);
const setSignOnPdf = (elPdf: Element, sign: Element) => elPdf.appendChild(sign);

function goBackSignToContainer(sign: any, index: any) {
  const elSign: any = document.querySelector(`[data-id="${sign.email + index}"]`);

  const element: any = document.querySelector('.main__content__signs');
  element.appendChild(elSign);

  dataDraggableBox.signs[index] = {
    name: sign.name,
    email: sign.email,
    type: 'img',
    content: sign.content,
    position: {
      top: 0,
      left: 0,
    },
    page: 0,
    width: sign.width,
    height: sign.height
  }
  console.log(dataDraggableBox.signs[index]);
}

function loadLocalPdf() {
  const localPdfUrl = new URL('../../../assets/files/pdf.pdf', import.meta.url).href; // Carga el PDF desde la ubicación local
  dataPdfViewer.urlPdf = localPdfUrl;
  dataPdfModifier.urlPdf = localPdfUrl;
}
</script>

<style scoped src="./Home.page.scss"></style>
