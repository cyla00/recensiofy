<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark mb-10 max-xl:mx-auto max-xl:w-4/5">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>
        <div>
            last 5 review
        </div>

    </div>

</template>

<style scoped>
.blur-text{
    filter: blur(3px);
}
</style>