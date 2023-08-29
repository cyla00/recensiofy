<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const loading = ref<boolean>(true)

const reviewsList = ref<Array<object>>()

onBeforeMount(async () => {
    await $fetch('/api/reviews/fetch-private', {method: 'post', headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        loading.value = false
        reviewsList.value = res.reviewsList
    }).catch((e) => {
        loading.value = false
    })
})

</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark mb-10 max-xl:mx-auto max-xl:w-4/5 overflow-y-scroll">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>

        <h1 class="font-semibold text-base mb-3 max-md:text-center">5 latest reviews</h1>

        <div class="flex justify-center" v-if="loading">
            <i class='bx bx-loader-alt bx-spin bx-lg'></i>
        </div>

        <div class="grid grid-rows-5">
            <div v-for="i in reviewsList" class="border-b m-auto flex flex-col text-xs font-semibold w-full py-2">

                <div class="flex my-auto">
                    <i class='bx bxs-user-circle my-auto bx-md'></i>
                    <p class="ml-2 text-sm">{{ i.title }}</p>
                </div>

                <div class="my-2">
                    <p class="ml-2 text-c-light-grey">{{ i.createdAt.split(',')[0] }}</p>
                </div>

                <div class="flex my-auto ml-2">
                    <img :src="i.ratingImg" class="w-32">
                    <p class="ml-2 text-c-green my-auto">{{ i.rating }}/5</p>
                </div>

            </div>
        </div>
        
    </div>

</template>

<style scoped>
.blur-text{
    filter: blur(3px);
}
</style>