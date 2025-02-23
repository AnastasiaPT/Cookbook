import { z } from 'zod'
import { trpc } from '../../../lib/trpc'
import { zCreateRecipeTrpcInput } from './input'

export const createRecipeTrpcRoute = trpc.procedure.input(zCreateRecipeTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }
  
  const exRecipe = await ctx.prisma.recipe.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exRecipe) {
    throw Error('Recipe with this nick already exists')
  }
  await ctx.prisma.recipe.create({
    data: { ...input, authorId: ctx.me.id },
  })
  return true
})