<script setup lang="ts">


const email = ref<string>('')
const currentPass = ref<string>('')
const newPass = ref<string>('')

const updateEmail = async () => {

}
const updatePassword = async () => {

}
</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark">

        <h1 class="font-semibold text-base">Modify user information</h1>

        <div>
            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold" for="password">Modify email</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="email" spellcheck="false" placeholder="your.new@email.com">
            </div>

            <div class="text-xs">
                <button
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 my-3 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
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
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 my-3 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
                    @click="updatePassword">
                    Update password
                </button>
            </div>
        </div>

    </div>

</template>

<style scoped>

</style>