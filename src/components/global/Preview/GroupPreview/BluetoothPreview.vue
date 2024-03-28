<template>
    <div class="d-flex gap-1 align-center">
        <fi
            i="fa-brands fa-bluetooth-b"
            :color="hexToRgba(themeFunc.getChild('22')?.value, themeFunc.getChild('24')?.value/255)"
        ></fi>
        <fi
            i="fa-brands fa-bluetooth-b"
            :color="hexToRgba(themeFunc.getChild('23')?.value, themeFunc.getChild('25')?.value/255)"
        ></fi>
    </div>
</template>
 
<script setup lang="ts">
import { hexToRgba } from '@/service/shared';
import { themeFunc } from '@/service/theme'; 
</script>
