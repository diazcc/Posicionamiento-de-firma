<!--
    todo COMPONENT PDF VIEWER
    
    ?this component cannot be modify, please read the comments and user the struture defined.

    todo For see more funcinalities : https://www.npmjs.com/package/vue3-pdf-app

    ! for unisntall : 'npm uninstall vue3-pdf-app-' Before uninstall delete all calls of this component.   
    
    todo this component need this structure to be call as prop.
        const dataPdfViewer : any = reactive(
        {
            urlPdf: urlPdf.value,
            toolbar: {
                ?toolbar: false || toolbarViewerLeft: false || toolbarViewerRight: false
            },
            onClose :()=>{
                ?to use this function is for get event when close the modal or component where is called.
                todo like this : dataModalPdfViewer.dataPdfViewer.onClose();
            }
        });
    -->
<template>
    <div ref="pdfViewerContainer" :class="'pdf-viewer-container ' + (pdfRendered <= 0 ? 'loading-component' : '')">
        <vue-pdf-app style="width:100%; min-height:max-content" :pdf="dataPdfViewer?.urlPdf"
            :config="dataPdfViewer?.toolbar" :page-scale="'page-width'" @pages-rendered="pagesRendered" ref="refPdf">
        </vue-pdf-app>
    </div>
</template>
<script setup lang="ts">
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import { onMounted, ref, watch } from 'vue';

const pdfRendered: any = ref(0); // Define pdfRendered to validate show loading or not.
const props = defineProps(['dataPdfViewer']); // Define const props to call function onClose and can use it.
const emits = defineEmits(['pdfRendered']); // Emit the event when all pages are rendered.
const refPdf = ref(null);
const pdfViewerContainer = ref<HTMLElement | null>(null);

function pagesRendered(data: any) { // Function for get data 
    emits('pdfRendered', data.pagesCount); // Emit data pages
    pdfRendered.value = data.pagesCount; // Set validator for conditioner loading
}

props.dataPdfViewer.onClose = () => { // Call the function onClose from props for use the event from component father.
    pdfRendered.value = 0; // Reset the validator for show again the loading.
};

onMounted(() => {
    getPosicionPdfViewer(); // Call this function when component is mounted
});

watch(() => pdfRendered.value, (newValue, oldValue) => {
    getPosicionPdfViewer();
});

function getPosicionPdfViewer() {
    if (pdfRendered.value > 1) {
        if (pdfViewerContainer.value) {
            const rect = pdfViewerContainer.value.getBoundingClientRect();
   /*          console.log('Position:', {
                top: rect.top,
                left: rect.left,
                bottom: rect.bottom,
                right: rect.right,
                width: rect.width,
                height: rect.height,
            }); */
        }
    }
}
</script>

<style scoped src="./PdfViewer.atom.scss"></style>
<!--
    todo To modify this component socialice with parners and explain ideas. 
-->