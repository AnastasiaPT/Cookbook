import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getRecipeTrpcRoute } from './getRecipe'
import { getRecipesTrpcRoute } from './getRecipes'
import { createRecipeTrpcRoute } from './createRecipe'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getRecipe: getRecipeTrpcRoute,
  getRecipes: getRecipesTrpcRoute,
  createRecipe: createRecipeTrpcRoute,
 // @endindex 
})

export type TrpcRouter = typeof trpcRouter