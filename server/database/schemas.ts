import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    id: String,
    apiKey: String,
    timezone: String,
    ip: String,
    email: String,
    password: String,
    hash: String,
    stripeUserId: String,
    role: String,
    createdAt: String,
    modifiedAt: String,
    accountVerified: Boolean,
})

export const CampaignSchema = new Schema({
    id: String,
    userId: String,
    location: String,
    organization: String,
    description: String,
    category: String,
    campaignLogo: String,
    averageRating: Number,
    websiteUrl: String,
    facebookUrl: String,
    instagramUrl: String,
    tiktokUrl: String,
    linkedInUrl: String,
    twitterUrl: String,
    verifiedCampaign: Boolean,
    createdAt: String,
    modifiedAt: String,
    visible: Boolean,
})

export const ReviewSchema = new Schema({
    id: String,
    campaignId: String,
    reviewerIP: String,
    reviewerName: String,
    title: String,
    description: String,
    videoPath: String,
    thumbnailPath: String,
    audioPath: String,
    rating: Number,
    ratingImg: String,
    createdAt: String,
})