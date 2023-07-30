import Stripe from 'stripe'
const env = useRuntimeConfig()

export const stripe = Stripe(env.STRIPE_KEY)