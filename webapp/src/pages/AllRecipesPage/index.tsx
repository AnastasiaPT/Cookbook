import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { getViewRecipeRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllRecipesPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getRecipes.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Segment title="All recipes">
      <div className={css.recipes}>
      {data.recipes.map((item) => (
        <div className={css.recipe} key={item.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.recipeName} to={getViewRecipeRoute({ recipeNick: item.nick})}>
                  {item.name}
                </Link>
              }
              description={item.description}
            />
        </div>
      ))}
      </div>
    </Segment>
  )
}
