import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type ViewRecipeRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewRecipePage = () => {
  const { recipeNick } = useParams() as ViewRecipeRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getRecipe.useQuery({
    recipeNick,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data.recipe) {
    return <span>Recipe not found</span>
  }
  return (
    <Segment title={data.recipe.name} description={data.recipe.description}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.recipe.text }} />
    </Segment>
  )
}
