<template>
    <div class="special">
        123
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        special: {
            type: Object,
            default: {}
        }
    })
</script>

<style scoped>
    .special {
        color: red;
    }
</style>