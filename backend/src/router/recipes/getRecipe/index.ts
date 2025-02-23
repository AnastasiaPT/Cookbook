import _ from 'lodash'
import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getRecipeTrpcRoute = trpc.procedure
  .input(
    z.object({
      recipeNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawRecipe = await ctx.prisma.recipe.findUnique({
      where: {
        nick: input.recipeNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        recipesLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            recipesLikes: true,
          },
        },
      },
    })
    if (rawRecipe?.blockedAt) {
      throw new Error('Recipe is blocked by administrator')
    }
    const isLikedByMe = !!rawRecipe?.recipesLikes.length
    const likesCount = rawRecipe?._count.recipesLikes || 0
    const recipe = rawRecipe && { ..._.omit(rawRecipe, ['recipesLikes', '_count']), isLikedByMe, likesCount }

    return { recipe }
  })