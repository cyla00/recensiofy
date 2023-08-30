<script setup lang="ts">
import jwt_decode from 'jwt-decode'

let isLogged = ref<boolean>(false)
let mobileNav = ref<boolean>(false)
let year = new Date().getFullYear()


const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value
}

const discordLink = ref<string>(useRuntimeConfig().public.DISCORD_SUPPORT_SERVER)

const logout = async () => {
    localStorage.removeItem('token')
    return navigateTo('/connection')
}

onBeforeMount(async () => {
    if(!localStorage.getItem('token')){
        isLogged.value = false
    }
    else{
        const token = jwt_decode(localStorage.getItem('token'))

        try{
            await $fetch('/api/users/jwt-check', {method: 'post', headers: {
                Authorization: `Beader ${localStorage.getItem('token')}`
            }})

            isLogged.value = true
                
        }catch(e){
            localStorage.removeItem('token')
            isLogged.value = false
        }
    }
})

const navConnection = () => {
    navigateTo('/connection')
}

const navDash = () => {
    navigateTo('/dashboard')
    mobileNav.value = !mobileNav.value
}

</script>

<template>
    <header class="font-bold py-2 px-20 max-xl:px-10 flex flex-row justify-center border-b border-b-c-blight max-md:hidden text-c-dark text-base">
        <div class="my-auto">
            <NuxtLink to="/"><img class="w-14 desktop-btn duration-300" src="~/assets/logo-dark.png" alt=""></NuxtLink>
        </div>
        <div class="m-auto"></div>
        <div class="my-auto text-sm">
            <NuxtLink class="mr-5 m-auto capitalize desktop-btn duration-300" to="/">home</NuxtLink>
            <NuxtLink class="mr-5 m-auto capitalize desktop-btn duration-300" to="/docs">Usage</NuxtLink>
            <NuxtLink class="mr-5 duration-300 desktop-btn capitalize font-bold py-2 px-10 bg-c-blue rounded-full text-c-light" to="/connection" v-if="!isLogged"> Connect</NuxtLink>
            <NuxtLink class="mr-5 duration-300 desktop-btn capitalize font-bold py-2 px-10 bg-c-blue rounded-full text-c-light" to="/dashboard" v-if="isLogged"> Dashboard</NuxtLink>
            <NuxtLink class="mr-5 duration-300 desktop-btn capitalize font-bold py-2 px-10 bg-c-red rounded-full text-c-light hover:cursor-pointer" @click="logout" v-if="isLogged"> Disconnect</NuxtLink>
            <a :href="discordLink" target="_blank" class=""><i class='bx bxl-discord-alt bx-sm border-l border-b-c-blight p-2 duration-300 desktop-btn'></i></a>
        </div>
    </header>


    <header class="bg-c-light md:hidden py-2 px-5 text-c-dark">
                <div class="flex justify-end">
                    <i class='bx bxs-grid-alt duration-200 bx-md text-c-dark' @click="toggleMobileNav" :class="{'icon-active': mobileNav}"></i>
                </div>

                <Transition name="mobile-nav">
                    <div v-show="mobileNav" class="slide w-full fixed top-0 bottom-0 left-0 bg-c-light p-5 text-c-dark">
                        <div class="m-auto">
                            <i class='bx bx-x duration-200 bx-md text-c-red' @click="toggleMobileNav"></i>
                        </div>

                        <div class="flex flex-col">
                            <div class="my-auto">
                                <a href="/"><img class="w-20 m-auto" src="~/assets/logo-dark.png" alt=""></a>
                            </div>
                            <div class="m-auto flex flex-col text-center mt-20">
                                <a class="m-auto mx-5 capitalize my-5 font-semibold" href="/">home</a>
                                <a class="m-auto mx-5 capitalize my-5 font-semibold" href="/docs">Usage</a>
                                <a class="duration-300 desktop-btn capitalize font-bold py-2 px-10 bg-c-blue rounded-full text-c-light" @click="navConnection" v-if="!isLogged"> Connect</a>
                                <a class="my-5 duration-300 desktop-btn capitalize font-bold py-2 px-10 bg-c-blue rounded-full text-c-light" @click="navDash" v-if="isLogged"> Dashboard</a>
                                <a class="duration-300 desktop-btn capitalize font-bold py-2 px-10 bg-c-red rounded-full text-c-light" @click="logout" v-if="isLogged"> Disconnect</a>
                                <a :href="discordLink" target="_blank" class="my-5"><i class='bx bxl-discord-alt mx-5 bx-lg p-2 duration-300 desktop-btn'></i></a>
                            </div>
                        </div>
                    </div>
                </Transition>
            </header>


    <slot/>


    <footer class="my-5 flex justify-center text-c-dark text-xs">
        <p>Powered by @RecensioFy {{ year }}</p>
    </footer>
</template>

<style scoped>
.mobile-nav-enter-active, .mobile-nav-leave-active {
	transition: 1s ease all;
}
.mobile-nav-enter-from, .mobile-nav-leave-to {
	transform: translateX(-100%);
}
.mobile-nav-enter-to {
	transform: translateX(0);
}
.icon-active{
	transform: rotate(180deg);
}
</style>