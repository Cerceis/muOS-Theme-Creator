<template>
    <div class="d-flex gap-1 align-center">
        <fi
            i="fa-solid fa-battery-quarter"
            :color="hexToRgba(themeFunc.getChild('12')?.value, themeFunc.getChild('15')?.value/255)"
        ></fi>
        <fi
            i="fa-solid fa-battery-three-quarters"
            :color="hexToRgba(themeFunc.getChild('10')?.value, themeFunc.getChild('13')?.value/255)"
        ></fi>
        <fi
            i="fa-solid fa-battery-full"
            :color="hexToRgba(themeFunc.getChild('11')?.value, themeFunc.getChild('14')?.value/255)"
        ></fi>
    </div>
</template>
 
<script setup lang="ts">
import { hexToRgba } from '@/service/shared';
import { themeFunc } from '@/service/theme'; 
</script>
