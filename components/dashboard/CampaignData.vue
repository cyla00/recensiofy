<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const currentPass = ref<string>('')
const newPass = ref<string>('')
const showBlur = ref<boolean>(true)
const newEmail = ref<string>('')

const apiKey = ref<string>('')
const zone = ref<string>('')
const email = ref<string>('')

const refKey = ref('')

const blur = () => {
    showBlur.value = !showBlur.value
}

const copyKey = async () => {
    await navigator.clipboard.writeText(refKey.value.value)
    Show.value = true
    SuccMsg.value = 'Copied to clipboard'
}

const updateEmail = async () => {

    const body = {
        email: newEmail.value
    }

    await $fetch('/api/users/update-email', {method: 'put', body: body, headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            return window.location.reload()
        }, 1500)
    }).catch((e) => {
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}

const updatePassword = async () => {

    const body = {
        currentPass: currentPass.value,
        newPass: newPass.value,
    }

    await $fetch('/api/users/update-password', {method: 'put', body: body, headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        Show.value = true
        SuccMsg.value = res.SuccMsg
        setTimeout(() => {
            return window.location.reload()
        }, 1500)
    }).catch((e) => {
        Show.value = true
        ErrMsg.value = e.statusMessage
    })
}

const regenApiKey = async () => {
    
    const verif = confirm('proceed to regenerate your API key')

    if(verif){
        await $fetch('/api/users/regen-api-key', {method: 'put', headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}).then((res) => {
            Show.value = true
            SuccMsg.value = res.SuccMsg
            setTimeout(() => {
                return window.location.reload()
            }, 1500)
        }).catch((e) => {
            Show.value = true
            ErrMsg.value = e.statusMessage
        })
    }
}

onBeforeMount(async () => {
    await $fetch('/api/users/fetch-data', {method: 'post', headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((res) => {
        apiKey.value = res.apiKey
        zone.value = res.timezone
        email.value = res.email
    }).catch((e) => {
        apiKey.value = 'not available'
        zone.value = 'not available'
        email.value = 'not available'
    })
})

</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark m-auto max-xl:my-10 mx-10 max-xl:m-auto max-xl:w-4/5">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>
        <div>

            <div class="text-xs mb-5 flex text-center">
                <nuxtLink 
                    to="/delete-account" 
                    class="duration-300 desktop-btn bg-c-red py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full">Delete account</nuxtLink>
            </div>

            <h1 class="font-semibold text-base mb-3">CAMPAIGNS</h1>

            <div class="flex">
                <div class="border rounded-l-md">
                    <input
                        class="py-2 px-5 w-full truncate duration-300 outline-none" type="text" v-model="apiKey" spellcheck="false" ref="refKey" readonly="true" :class="{'blur-text': showBlur}">
                </div>
                
                <button class="py-1 px-2 bg-c-green text-c-light desktop-btn duration-300" @click="blur" title="hide/show"><i class='bx bx-low-vision'></i></button>
                <button class="py-1 px-2 bg-c-green text-c-light desktop-btn duration-300" @click="copyKey" title="copy key"><i class='bx bx-copy-alt'></i></button>
                <button class="py-1 px-2 bg-c-green text-c-light desktop-btn duration-300 rounded-r-xl" @click="regenApiKey" title="regenerate key"><i class='bx bx-revision'></i></button>
            </div>
        </div>

        <div class="my-10">
            <h1 class="font-semibold text-base mb-3">Credentials</h1>

            <div class="text-xs font-semibold">
                <div class="flex flex-row">
                    <p class="my-auto w-full">Timezone: </p>
                    <p class="text-c-light-grey">{{ zone }}</p>
                </div>

                <div class="flex flex-row my-3">
                    <p class="my-auto w-full">Email: </p>
                    <p class="text-c-light-grey">{{ email }}</p>
                </div>

                <div class="flex flex-row">
                    <p class="my-auto w-full">Account status: </p>
                    <p class="py-1 px-5 border rounded-full text-c-green border-c-green">verified</p>
                </div>
            </div>
        </div>

        <div>
            <h1 class="font-semibold text-base">Modify user information</h1>
            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Modify email</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="newEmail" spellcheck="false" placeholder="new@email.com">
            </div>

            <div class="text-xs">
                <button
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
                    @click="updateEmail" title="save new email">
                    Update email
                </button>
            </div>
        </div>

        <div class="text-xs">
            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Current password *</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="password" v-model="currentPass" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">New password</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="password" v-model="newPass" spellcheck="false">
                <p class="text-c-light-grey font-semibold">Use a secure password! at least 6 characters, uppercase, lowercase and numbers</p>
            </div>

            <div class="text-xs">
                <button
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
                    @click="updatePassword" title="save new password">
                    Update password
                </button>
            </div>
        </div>

    </div>

</template>

<style scoped>
.blur-text{
    filter: blur(3px);
}
</style>