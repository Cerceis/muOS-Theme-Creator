<template>
    <div class="d-flex gap-1 align-center">
        <fi
            i="fa-solid fa-wifi"
            :color="hexToRgba(themeFunc.getChild('17')?.value, themeFunc.getChild('19')?.value/255)"
        ></fi>
        <fi
            i="fa-solid fa-wifi"
            :color="hexToRgba(themeFunc.getChild('18')?.value, themeFunc.getChild('20')?.value/255)"
        ></fi>
    </div>
</template>
 
<script setup lang="ts">
import { hexToRgba } from '@/service/shared';
import { themeFunc } from '@/service/theme'; 
</script>
