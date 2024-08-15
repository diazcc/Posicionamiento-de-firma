<template>
    <li
      :key="`${id}-${isCurrentDragg}`"
      :ref="drag"
      role="Box"
      data-testid="box"
      :style="{ top: `${box.top}px`, left: `${box.left}px`, position: 'absolute', cursor: 'move' }"
    >
      {{ box.title }}
    </li>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { useDrag } from 'vue3-dnd';
  import { Box } from '../../../interfaces/Box.interface';
  import { DragItem } from '../../../interfaces/DragItem.interface';
  
  const props = defineProps<{
    box: Box;
    id: string;
    isCurrentDragg: boolean;
  }>();
  
  const { box, id, isCurrentDragg } = props;
  
  // Drag configuration
  const [collect, drag] = useDrag<DragItem>(() => ({
    type: 'box',
    item: { id, left: box.left, top: box.top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  const { isDragging } :any = collect;
  </script>
  
  <style scoped>
  /* Agrega estilos aquí si es necesario */
  </style>
  