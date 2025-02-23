import { z } from 'zod'

export const zSetRecipeLikeRecipeTrpcInput = z.object({
  recipeId: z.string().min(1),
  isLikedByMe: z.boolean(),
})