<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')

const currentPass = ref<string>('')
const newPass = ref<string>('')
const showBlur = ref<boolean>(true)
const newEmail = ref<string>('')

const apiKey = ref<string>('apikeyaaaaaaaaaaaaaaaaaaasssss')
const zone = ref<string>('Europe/paris')
const email = ref<string>('someemmail@mail.com')

const refKey = ref()

const blur = () => {
    showBlur.value = !showBlur.value
}

const copyKey = async () => {
    await navigator.clipboard.writeText(refKey.value.value)
    Show.value = true
    SuccMsg.value = 'Copied to clipboard'
}

const updateEmail = async () => {

}

const updatePassword = async () => {

}

onBeforeMount(async () => {
    //fetch user data from api
})

</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>
        <div>
            <h1 class="font-semibold text-base mb-3">API key</h1>
            <div class="flex">
                <input
                    class="py-2 px-5 border w-full truncate duration-300 rounded-l-md" type="text" v-model="apiKey" spellcheck="false" ref="refKey" readonly="true" :class="{'blur-text': showBlur}">
                <button class="py-1 px-2 bg-c-green text-c-light desktop-btn duration-300" @click="blur"><i class='bx bx-low-vision'></i></button>
                <button class="py-1 px-2 bg-c-green text-c-light desktop-btn duration-300 rounded-r-xl" @click="copyKey"><i class='bx bx-copy-alt'></i></button>
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
                    <label class="text-xs capitalize my-2 font-semibold" for="password">Modify email</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="newEmail" spellcheck="false" placeholder="your.new@email.com">
            </div>

            <div class="text-xs">
                <button
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
                    @click="updateEmail">
                    Update email
                </button>
            </div>
        </div>

        <div class="text-xs">
            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold" for="password">Current password</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="password" v-model="currentPass" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold" for="password">New password</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="password" v-model="newPass" spellcheck="false">
                <p class="text-c-light-grey font-semibold">Use a secure password! at least 6 characters, uppercase, lowercase and numbers</p>
            </div>

            <div class="text-xs">
                <button
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
                    @click="updatePassword">
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