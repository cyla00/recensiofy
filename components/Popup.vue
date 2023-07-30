<script setup lang="ts">
interface Props {
    Show: Boolean,
    ErrMsg: String,
    SuccMsg: String,
}
const props = defineProps<Props>()
const emit = defineEmits([
    'update:Show',
    'update:ErrMsg',
    'update:SuccMsg',
])
watch(() => props, () => {
    if(props.Show) {
        setTimeout(() => {
            emit("update:Show", false)
            emit("update:ErrMsg", '')
            emit("update:SuccMsg", '')
        }, 2000)
    }
}, { deep: true })
</script>


<template>
<Teleport to="body">
<Transition name="slide-fade">
    <div class="wrapper fixed left-1/2 -translate-x-1/2 bottom-5 z-50 text-base font-semibold px-10 py-5 text-c-dark rounded-md min-w-96 max-md:text-sm max-md:min-w-full" 
    v-if="Show" :class="{'error-wrapper': ErrMsg, 'success-wrapper': SuccMsg}">
        <p v-if="ErrMsg"><i class='bx bxs-error-alt align-middle text-xl max-md:text-sm'></i> {{ErrMsg}}</p>
        <p v-if="SuccMsg"><i class='bx bxs-check-circle align-middle text-xl max-md:text-sm'></i> {{SuccMsg}}</p>
    </div>
</Transition>
<slot/>
</Teleport>
</template>

<style>
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.wrapper{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 99;
}
.error-wrapper{
    background: rgba(255, 96, 92, 0.6);
    backdrop-filter: blur(20px);
}
.success-wrapper{
    background: rgba(55, 214, 151, 0.6);
    backdrop-filter: blur(20px);
}
</style>