<script setup lang="ts">

const Show = ref<boolean>(false)
const ErrMsg = ref<string>('')
const SuccMsg = ref<string>('')


const location = ref<string>('')
const organization = ref<string>('')
const description = ref<string>('')
const category = ref<string>('')
const campaignLogo = ref<string>('https://i.ibb.co/ZY5mmjg/default-campaing-logo.png')
const averageRating = ref<number>(0)
const websiteUrl = ref<string>('')
const facebookUrl = ref<string>('')
const instagramUrl = ref<string>('')
const tiktokUrl = ref<string>('')
const linkedInUrl = ref<string>('')
const twitterUrl = ref<string>('')
const verifiedCampaign = ref<boolean>(false)

const updateCampaign = () => {

}
</script>

<template>

    <div class="w-96 bg-c-light back-shadow rounded-xl p-7 text-c-dark m-auto max-xl:my-10 mx-10 max-xl:m-auto max-xl:w-4/5 h-[820px] overflow-y-scroll">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg"/>
        <div>

            <div class="text-xs mb-5 flex text-center">
                <nuxtLink 
                    to="/delete-account" 
                    class="duration-300 desktop-btn bg-c-red py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full">Delete campaign</nuxtLink>
            </div>

            <div class="text-xs">
                <p class="py-1 px-5 rounded-full border text-center">verified campaign</p>
            </div>

            <div class="my-5">
                <img :src="campaignLogo" alt="campaigns logo" class="w-32 m-auto">
            </div>

            <div class="font-semibold flex text-c-dark">
                <div class="flex flex-row m-auto">
                    <i class='bx bxs-star bx-sm text-c-green my-auto'></i><p class="text-xl">{{ averageRating }}/5</p>
                </div>
            </div>

        </div>

        <div class="text-xs my-10"> 
 
            <h1 class="font-semibold text-base mb-3">Campaign information</h1>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Organization</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="organization" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <label class="capitalize my-2 font-semibold">Sector</label>
                <select 
                    class="form-control duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md" 
                    id="country" v-model="category">
                    <option disabled value="">Sector</option>
                    <option value="Animals & Pets">Animals & Pets</option>
                    <option value="Beauty & Well-being">Beauty & Well-being</option>
                    <option value="Business Services">Business Services</option>
                    <option value="Construction & Manufacturing">Construction & Manufacturing</option>
                    <option value="Education & Training">Education & Training</option>
                    <option value="Electronics & Technology">Electronics & Technology</option>
                    <option value="Events & Entertainment">Events & Entertainment</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Health & Medical">Health & Medical</option>
                    <option value="Hobbies & Crafts">Hobbies & Crafts</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Legal Services & Government">Legal Services & Government</option>
                    <option value="Media & Publishing">Media & Publishing</option>
                    <option value="Bank & Insurance">Bank & Insurance</option>
                    <option value="Public & Local Services">Public & Local Services</option>
                    <option value="Restaurants & Bars">Restaurants & Bars</option>
                    <option value="Shopping & Fashion">Shopping & Fashion</option>
                    <option value="Sports">Sports</option>
                    <option value="Travel & Vacation">Travel & Vacation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Vehicles & Transportation">Vehicles & Transportation</option>
                </select>
            </div>

            <div class="flex flex-col my-5">

                <label class="capitalize my-2 font-semibold" for="email">country</label>

                <select 
                    class="form-control duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-md rounded-md " 
                    id="country" v-model="location">
                    <option disabled value="">Country</option>
                    <option data-power-region="AUS" value="American Samoa">American Samoa</option>
                    <option data-power-region="AUS" value="Argentina">Argentina</option>
                    <option data-power-region="AUS" value="Australia">Australia</option>
                    <option data-power-region="Europe" value="Austria">Austria</option>
                    <option data-power-region="USA" value="Bangladesh">Bangladesh</option>
                    <option data-power-region="Europe" value="Belgium">Belgium</option>
                    <option data-power-region="USA" value="Brazil">Brazil</option>
                    <option data-power-region="USA" value="British Virgin Islands">British Virgin Islands</option>
                    <option data-power-region="USA" value="Cambodia">Cambodia</option>
                    <option data-power-region="USA" value="Canada">Canada</option>
                    <option data-power-region="AUS" value="China">China</option>
                    <option data-power-region="AUS" value="Christmas Island">Christmas Island</option>
                    <option data-power-region="Europe" value="Denmark">Denmark</option>
                    <option data-power-region="Europe" value="Egypt">Egypt</option>
                    <option data-power-region="AUS" value="Fiji">Fiji</option>
                    <option data-power-region="Europe" value="Finland">Finland</option>
                    <option data-power-region="Europe" value="France">France</option>
                    <option data-power-region="Europe" value="French Polynesia">French Polynesia</option>
                    <option data-power-region="Europe" value="Germany">Germany</option>
                    <option data-power-region="Europe" value="Greece">Greece</option>
                    <option data-power-region="UK" value="Guernsey">Guernsey</option>
                    <option data-power-region="UK" value="Hong Kong">Hong Kong</option>
                    <option data-power-region="Europe" value="Hungary">Hungary</option>
                    <option data-power-region="Europe" value="Iceland">Iceland</option>
                    <option data-power-region="Europe" value="India">India</option>
                    <option data-power-region="Europe" value="Indonesia">Indonesia</option>
                    <option data-power-region="UK" value="Ireland">Ireland</option>
                    <option data-power-region="UK" value="Isle of Man">Isle of Man</option>
                    <option data-power-region="Europe" value="Israel">Israel</option>
                    <option data-power-region="Europe" value="Italy">Italy</option>
                    <option data-power-region="USA" value="Japan">Japan</option>
                    <option data-power-region="UK" value="Jersey">Jersey</option>
                    <option data-power-region="Europe" value="Liechtenstein">Liechtenstein</option>
                    <option data-power-region="Europe" value="Luxembourg">Luxembourg</option>
                    <option data-power-region="UK" value="Macau">Macau</option>
                    <option data-power-region="UK" value="Malaysia">Malaysia</option>
                    <option data-power-region="UK" value="Malta">Malta</option>
                    <option data-power-region="USA" value="Mexico">Mexico</option>
                    <option data-power-region="USA" value="Micronesia">Micronesia</option>
                    <option data-power-region="Europe" value="Monaco">Monaco</option>
                    <option data-power-region="Europe" value="Mongolia">Mongolia</option>
                    <option data-power-region="AUS" value="Nauru">Nauru</option>
                    <option data-power-region="Europe" value="Nepal">Nepal</option>
                    <option data-power-region="Europe" value="Netherlands">Netherlands</option>
                    <option data-power-region="Europe" value="Netherlands Antilles">Netherlands Antilles</option>
                    <option data-power-region="Europe" value="New Caledonia">New Caledonia</option>
                    <option data-power-region="AUS" value="New Zealand">New Zealand</option>
                    <option data-power-region="AUS" value="Norfolk Island">Norfolk Island</option>
                    <option data-power-region="Europe" value="Norway">Norway</option>
                    <option data-power-region="Europe" value="Pakistan">Pakistan</option>
                    <option data-power-region="AUS" value="Papua New Guinea">Papua New Guinea</option>
                    <option data-power-region="USA" value="Philippines">Philippines</option>
                    <option data-power-region="Europe" value="Poland">Poland</option>
                    <option data-power-region="Europe" value="Portugal">Portugal</option>
                    <option data-power-region="UK" value="Qatar">Qatar</option>
                    <option data-power-region="UK" value="Singapore">Singapore</option>
                    <option data-power-region="AUS" value="Solomon Islands">Solomon Islands</option>
                    <option data-power-region="Europe" value="South Africa">South Africa</option>
                    <option data-power-region="Europe" value="South Korea">South Korea</option>
                    <option data-power-region="Europe" value="Spain">Spain</option>
                    <option data-power-region="Europe" value="Sweden">Sweden</option>
                    <option data-power-region="Europe" value="Switzerland">Switzerland</option>
                    <option data-power-region="USA" value="Taiwan">Taiwan</option>
                    <option data-power-region="USA" value="Thailand">Thailand</option>
                    <option data-power-region="Europe" value="Turkey">Turkey</option>
                    <option data-power-region="UK" value="United Kingdom">United Kingdom</option>
                    <option data-power-region="USA" value="United States">United States</option>
                    <option data-power-region="AUS" value="Vanuatu">Vanuatu</option>
                    <option data-power-region="Europe" value="Vatican City">Vatican City</option>
                    <option data-power-region="Europe" value="Vietnam">Vietnam</option>
                </select>
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Description</label>
                </div>

                <textarea name="" id="" rows="5" class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md" v-model="description" spellcheck="false"></textarea>
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Website</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="websiteUrl" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Instagram</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="instagramUrl" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Facebook</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="facebookUrl" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Twitter</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="twitterUrl" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">Linkedin</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="linkedInUrl" spellcheck="false">
            </div>

            <div class="flex flex-col my-5">
                <div class="flex flex-row">
                    <label class="text-xs capitalize my-2 font-semibold">TikTok</label>
                </div>

                <input
                    class="duration-300 border outline-none border-c-b-light focus:border-c-green py-2 px-5 text-sm rounded-md"
                    type="text" v-model="tiktokUrl" spellcheck="false">
            </div>
            

            <div class="text-xs">
                <button
                    class="duration-300 desktop-btn bg-c-green py-2 px-10 rounded-tl-xl rounded-br-xl text-c-light font-bold w-full"
                    @click="updateCampaign" title="save new password">
                    Update campaign
                </button>
            </div>
        </div>

    </div>

</template>

<style scoped>
.blur-text{
    filter: blur(3px);
}

textarea {
  resize: none;
}
</style>