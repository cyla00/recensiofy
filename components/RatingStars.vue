<script setup lang="ts">

const rating = ref<number>(0)
const ratingText = ref<string>('')
const emit = defineEmits(['ratingValue'])

const updateRate = (index) => {
    rating.value = index
    emit('ratingValue', rating.value)

    switch(rating.value){
        case 1:
            ratingText.value = 'Poor'
            break
        case 2:
            ratingText.value = 'Below Average'
            break
        case 3:
            ratingText.value = 'Average'
            break
        case 4:
            ratingText.value = 'Good'
            break
        case 5:
            ratingText.value = 'Excellent'
            break
    }

    const stars = document.querySelectorAll('.bxs-star')
    stars.forEach((i) => {
        i.style.color = '#9A9A9A'
    })

    for (let i = 0; i <= index; i++){
        stars[i].style.color = '#02DF9C'
    }
    
}

</script>

<template>
    <div class="flex my-3 text-base">
        <div class="flex flex-row text-c-light-grey">
            <i v-for="i in 5" :key="i" class='bx bxs-star text-3xl max-md:text-4xl duration-200' @click="updateRate(i)"></i>
        </div>
        <div class="my-auto ml-5">
            <p>{{ rating }}/5 <span class="ml-5 max-md:hidden text-c-blue font-bold" id="rateText">{{ ratingText }}</span></p>
        </div>
    </div>
</template>

<script scope>

</script>