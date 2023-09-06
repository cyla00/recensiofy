<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const loading = ref<boolean>(true)
const subscribed = ref<boolean>()
const paymentsHistory = ref<Array<object>>()

onBeforeMount(async () => {
    
    await $fetch('/api/users/fetch-payments', {method: 'post', headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        subscribed.value = res.subscribed
        paymentsHistory.value = res.pay
        loading.value = false
    }).catch((e) => {
        loading.value = false
    })
    
})

const toDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString("fr-FR")
}

const subscribe = async () => {
    await $fetch('/api/users/init-payment', {method: 'put', headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            return window.location.href = `${res.url}`
        }, 1500)
    }).catch((e) => {
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}

</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark max-xl:m-auto max-xl:w-4/5 h-full overflow-y-scroll">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>
        <div>
            
            <div class="flex justify-center mb-5 text-xs text-center">
                <nuxtLink v-if="subscribed" to="/end-subscription" class="cursor-pointer duration-300 desktop-btn bg-c-red py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full">End subscription</nuxtLink>
                <nuxtLink v-if="!subscribed" @click="subscribe" class="cursor-pointer duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full">Subscribe</nuxtLink>
            </div>

            <h1 class="font-semibold text-base mb-3 max-md:text-center">Payments history</h1>

            <div v-if="!loading" v-for="i in paymentsHistory.slice().reverse()" class="text-xs flex my-2 m-auto border-b py-2 font-semibold max-md:flex-col max-md:text-center">
                <p class="px-5 text-c-light rounded-full my-auto max-md:mx-auto"><i class='bx bxs-check-circle text-c-green bx-xs'></i></p>
                <p class="my-auto bg-clip-text text-transparent bg-gradient-to-bl from-c-blue to-c-green">
                    <span v-if="i.card_type === 'visa'"><i class='bx bxl-visa bx-sm'></i></span> 
                    <span v-if="i.card_type === 'mastercard'"><i class='bx bxl-mastercard bx-sm'></i></span>

                    <span v-if="i.card_type === 'amex'"><i class='bx bxs-credit-card bx-sm'></i></span>
                    <span v-if="i.card_type === 'discover'"><i class='bx bxs-credit-card bx-sm'></i></span>
                    <span v-if="i.card_type === 'diners'"><i class='bx bxs-credit-card bx-sm'></i></span>
                    <span v-if="i.card_type === 'jcb'"><i class='bx bxs-credit-card bx-sm'></i></span>
                    <span v-if="i.card_type === 'unionpay'"><i class='bx bxs-credit-card bx-sm'></i></span>
                    <span v-if="i.card_type === 'cartes_bancaires'"><i class='bx bxs-credit-card bx-sm'></i></span>
                    ****{{ i.last4 }}
                </p>
                <p class="ml-3 my-auto max-md:m-auto">{{ toDate(i.created) }}</p>
                <p class="ml-3 my-auto max-md:m-auto text-base">{{ i.amount / 100 }}.00 $</p>
            </div>

            <div class="flex justify-center" v-if="loading">
                <i class='bx bx-loader-alt bx-spin bx-lg'></i>
            </div>

        </div>
    </div>

</template>

<style scoped>
.blur-text{
    filter: blur(3px);
}
</style>