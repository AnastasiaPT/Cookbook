const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllRecipesRoute = () => '/'

export const viewRecipeRouteParams = getRouteParams({ recipeNick: true })
export type ViewRecipeRouteParams = typeof viewRecipeRouteParams
export const getViewRecipeRoute = ({ recipeNick }: ViewRecipeRouteParams) => `/recipes/${recipeNick}`
export const getNewRecipeRoute = () => '/recipes/new'

