import type { Recipe, User, UserPermission } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeRecipe = Pick<Recipe, 'authorId'> | null

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockRecipes = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_RECIPES')
}

export const canEditRecipe = (user: MaybeUser, recipe: MaybeRecipe) => {
  return !!user && !!recipe && user?.id === recipe?.authorId
}