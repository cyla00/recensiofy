<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const loading = ref<boolean>(true)

onBeforeMount(async () => {
    await $fetch('/api/reviews/fetch-private', {method: 'post', headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        loading.value = false
        console.log(res);
        
    }).catch((e) => {
        loading.value = false
    })
})

</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark mb-10 max-xl:mx-auto max-xl:w-4/5">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <h1 class="font-semibold text-base mb-3 max-md:text-center">Latest reviews</h1>

        <div class="flex justify-center" v-if="loading">
            <i class='bx bx-loader-alt bx-spin bx-lg'></i>
        </div>
    </div>

</template>

<style scoped>
.blur-text{
    filter: blur(3px);
}
</style>