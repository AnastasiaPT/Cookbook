import { trpc } from '../../lib/trpc'

export const getRecipesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  
    return { recipes }
  })
