import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createRecipeTrpcRoute } from './recipes/createRecipe'
import { getMeTrpcRoute } from './auth/getMe'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { getRecipeTrpcRoute } from './recipes/getRecipe'
import { getRecipesTrpcRoute } from './recipes/getRecipes'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { blockRecipeTrpcRoute } from './recipes/blockRecipe'
import { updatePasswordTrpcRoute } from './auth/updatePassword'
import { updateRecipeTrpcRoute } from './recipes/updateRecipe'
import { setRecipeLikeTrpcRoute } from './recipes/setRecipeLike'

// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createRecipe: createRecipeTrpcRoute,
  getMe: getMeTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  getRecipes: getRecipesTrpcRoute,
  blockRecipe: blockRecipeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateRecipe: updateRecipeTrpcRoute, 
  setRecipeLike: setRecipeLikeTrpcRoute,
  // @endindex 
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>