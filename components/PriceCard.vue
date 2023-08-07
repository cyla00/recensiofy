<script setup lang="ts">
const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const loading = ref<boolean>(false)

const email = ref<string>('')
const password = ref<string>('')
const repeat_password = ref<string>('')

const checkout = async () => {
    loading.value = true

    let ip = ''
    await $fetch('https://api.ipify.org?format=json', { method: 'get' }).then((res) => {
        ip = res?.ip
    }).catch((e) => {
        loading.value = false
        Show.value = true
        ErrMsg.value = 'It was not possible to register, retry later'
        return
    })

    const body = {
        email: email.value,
        password: password.value,
        repeatPass: repeat_password.value,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ip: ip,
    }

    await $fetch('/api/users/subscribe', {
        method: 'post', body: body, headers: {
            Authorization: `Beader ${localStorage.getItem('token')}`
        }
    }).then((res) => {
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            loading.value = false
            return window.location = res.url
        }, 1500)
    }).catch((e) => {
        loading.value = false
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}
</script>

<template>
    <div class="w-96 m-auto max-md:text-center max-md:text-base max-md:w-4/5 max-md:flex max-md:justify-center max-md:flex-col">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg" />
        <div class="text-start mt-10">
            <h3 class="capitalize text-xl font-bold m-auto px-2">a way to
                <span class="bg-clip-text text-transparent bg-gradient-to-bl from-c-green to-c-blue">integrate</span>,
                <span class="bg-clip-text text-transparent bg-gradient-to-bl from-c-green to-c-blue">customize</span> <br> &
                <span class="bg-clip-text text-transparent bg-gradient-to-bl from-c-green to-c-blue">show</span> your
                reviews
            </h3>
            <h4 class="text-base font-semibold px-2">Use RecensioFy in any of your websites and
                software projects.</h4>
        </div>

        <div class="text-center ">
            <div class="grid grid-flow-col justify-center max-xl:grid-flow-row mt-5">
                <div class="back-shadow rounded-xl p-7 w-96 mx-5 font-semibold max-xl:mb-5 max-md:w-80 max-md:mx-auto">
                    <h4
                        class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-bl from-c-green to-c-blue my-5 text-start">
                        Recensio Plan</h4>
                    <p class="font-semibold text-xs mt-5"><span
                            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-bl from-c-green to-c-blue">$10</span>/month
                    </p>
                    <p class="font-semibold text-c-light-grey text-xs">stop the subscription at any time.</p>
                    <div class="text-start my-5 text-xs">
                        <h5 class="uppercase text-c-blue font-semibold my-2">features</h5>
                        <div class="">
                            <p class="mb-1"><i class='bx bx-check-circle text-c-green bx-xs mr-2'></i>Unlimited API requests</p>
                            <p class="mb-1"><i class='bx bx-check-circle text-c-green bx-xs mr-2'></i>Unlimited reviews</p>
                            <p class="mb-1"><i class='bx bx-check-circle text-c-green bx-xs mr-2'></i>1 Campaign</p>
                            <p class="mb-1"><i class='bx bx-check-circle text-c-green bx-xs mr-2'></i>Reviews submission form</p>
                        </div>

                        <div class="flex flex-col my-5 text-xs">

                            <div class="flex flex-row">
                                <label class="capitalize my-2 font-semibold">email *</label>
                            </div>

                            <input
                                class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                                type="text" v-model="email" spellcheck="false">
                        </div>

                        <div class="flex flex-col my-5 text-xs">

                            <div class="flex flex-row">
                                <label class="text-xs capitalize my-2 font-semibold" for="password">password *</label>
                            </div>
 
                            <input
                                class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                                type="password" v-model="password" spellcheck="false">
                            <p class="text-c-light-grey font-semibold">Use a secure password! at least 6 characters, uppercase, lowercase and numbers</p>
                        </div>

                        <div class="flex flex-col my-5 text-xs">
                            <div class="flex flex-row">
                                <label class="text-xs capitalize my-2 font-semibold" for="password">repeat password *</label>
                            </div>

                            <input
                                class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                                type="password" v-model="repeat_password" spellcheck="false">
                        </div>
                    </div>
                    <div class="text-xs">
                        <button
                            class="duration-300 desktop-btn bg-c-green py-2 px-10 my-3 rounded-tl-xl rounded-br-xl text-c-light font-bold max-md:w-full capitalize"
                            @click="checkout" title="proceed to checkout">
                            Continue!
                        </button>
                        <p class="text-xs text-c-light-grey font-semibold my-2">By proceeding, I accept the terms & condition and the privacy policy of RecensioFy</p>
                        <div v-if="loading">
                            <i class='bx bx-loader-circle bx-spin bx-rotate-270 bx-sm'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>