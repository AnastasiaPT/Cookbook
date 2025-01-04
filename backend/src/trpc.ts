import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'


const recipes = _.times(100, (i) => ({
  nick: `recipe-${i}`,
  name: `Рецепт ${i}`,
  description: `Description of recipe ${i}...`,
  text: _.times(10, (j) => `<p>Text paragrph ${j} of recipe ${i}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getRecipes: trpc.procedure.query(() => {
    return { recipes: recipes.map((item) => _.pick(item, ['nick', 'name', 'description'])) }
  }),
  getRecipe: trpc.procedure
  .input(
    z.object({
      recipeNick: z.string(),
    })
  )
  .query(({ input }) => {
    const recipe = recipes.find((item) => item.nick === input.recipeNick)
    return { recipe: recipe || null }
  }),
})


export type TrpcRouter = typeof trpcRouter