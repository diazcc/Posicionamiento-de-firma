import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";


export const accessStore = defineStore("global", () => {
  const uploadedFiles: any = ref<File[] | string[]>([]); // Get files pdfs or structure {name:'name', url:'url'}



  // Agregar archivo al array de archivos cargados
  function addUploadedFile(file: any) {
    // console.log(file);
    uploadedFiles.value.push(file);
    // console.log(uploadedFiles);
  }

  // Eliminar archivo del array de archivos cargados
  function removeUploadedFile(index: any) {
    uploadedFiles.value.splice(index, 1);
  }

  function clearUploadedFiles() {
    uploadedFiles.value = [];
  };

  function getValidationForm(className: string): boolean { //Function globaly for validate forms about structure -->
    /**
     * todo               STRUCTURE INFORMATION NECESSARY
     *  
     *     todo  ---->  ul.className>li>input{required},select{required}
     */
    if (className[0] == '.') {
      throw new Error('The property cannot start with " . ", just write the name without " . " ---  store.getValidationForm(property)');
    }
    let state: boolean = true;
    const fieldsContainers = document.querySelectorAll("." + className);
    if (!fieldsContainers.length) {
      return false;
    }
    fieldsContainers.forEach((fieldsContainer: Element): void => {
      const inputsAndSelects = fieldsContainer.querySelectorAll(
        "input[required], select[required]"
      );
      console.log(inputsAndSelects);

      inputsAndSelects.forEach((field: any) => {
        field.classList.remove("empty");
        if (!field.value.trim()) {
          console.log(field);
          state = false;
          field.classList.add("empty");
        }
      });
    });
    return state;
  }

  function removeDisabledFromForm(className: string): boolean {
    if (className[0] == '.') {
      throw new Error('The property cannot start with " . ", just write the name without " . " --- store.removeDisabledFromForm(property)');
    }

    const fieldsContainers = document.querySelectorAll("." + className);
    if (!fieldsContainers.length) {
      return false;
    }

    fieldsContainers.forEach((fieldsContainer: Element): void => {
      const inputsAndSelects = fieldsContainer.querySelectorAll("input[disabled], select[disabled]");
      inputsAndSelects.forEach((field: any) => {
        field.disabled = false;
        field.classList.add("appear-light-blue");

        setTimeout(() => {
          field.classList.remove("appear-light-blue");
        }, 400);
      });
    });

    return true;
  }

  // Enviar archivos al servidor
  async function uploadFiles() {
    const formData = new FormData();
    uploadedFiles.value.forEach((file: any) => {
      formData.append("files", file);
    });

    // Envía formData a través de Axios
    try {
      const response = await axios.post("/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar archivos:", error);
    }
  }
  function disableAllFields(className: string): boolean {
    if (className[0] == '.') {
      throw new Error('The property cannot start with " . ", just write the name without " . " --- store.disableAllFields(property)');
    }

    const fieldsContainers = document.querySelectorAll("." + className);
    if (!fieldsContainers.length) {
      return false;
    }

    fieldsContainers.forEach((fieldsContainer: Element): void => {
      const inputsAndSelects = fieldsContainer.querySelectorAll("input, select");
      inputsAndSelects.forEach((field: any) => {
        field.disabled = true;
      });
    });

    return true;
  }

  return {
    uploadedFiles,
    addUploadedFile,
    removeUploadedFile,
    clearUploadedFiles,
    uploadFiles,
    getValidationForm,
    removeDisabledFromForm,
    disableAllFields,
  };
});
