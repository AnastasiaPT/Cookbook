import _ from 'lodash'
import { trpc } from '../../../lib/trpc'
import { zGetRecipesTrpcInput } from './input'

export const getRecipesTrpcRoute = trpc.procedure.input(zGetRecipesTrpcInput).query(async ({ ctx, input }) => {
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined
  const rawRecipes = await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        serialNumber: true,
        _count: {
          select: {
            recipesLikes: true,
          },
        },
      },
      where: {
        blockedAt: null,
        ...(!normalizedSearch
          ? {}
          : {
              OR: [
                {
                  name: {
                    search: normalizedSearch,
                  },
                },
                {
                  description: {
                    search: normalizedSearch,
                  },
                },
                {
                  text: {
                    search: normalizedSearch,
                  },
                },
              ],
            }),
      },
        orderBy:[
        {
          createdAt: 'desc',
        },
        {
          serialNumber: 'desc',
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    })
    
    const nextRecipe = rawRecipes.at(input.limit)
    const nextCursor = nextRecipe?.serialNumber
    const rawRecipesExceptNext = rawRecipes.slice(0, input.limit)
    const recipesExceptNext = rawRecipesExceptNext.map((item) => ({
      ..._.omit(item, ['_count']),
      likesCount: item._count.recipesLikes,
    }))

    return { recipes: recipesExceptNext, nextCursor }

    
  })