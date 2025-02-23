import type { TrpcRouterOutput } from '@cookingbook/backend/src/router'
import { useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button, LinkButton } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { Icon } from '../../../components/Icon'
import { canBlockRecipes, canEditRecipe } from '@cookingbook/backend/src/utils/can'
import { getEditRecipeRoute, type ViewRecipeRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'
import { format } from 'date-fns/format'
import { withPageWrapper } from '../../../lib/pageWrapper'

const BlockRecipe = ({ recipe }: { recipe: NonNullable<TrpcRouterOutput['getRecipe']['recipe']> }) => {
  const blockRecipe = trpc.blockRecipe.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockRecipe.mutateAsync({ recipeId: recipe.id })
      await trpcUtils.getRecipe.refetch({ recipeNick: recipe.nick })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Recipe
        </Button>
      </FormItems>
    </form>
  )
}

const LikeButton = ({ recipe }: { recipe: NonNullable<TrpcRouterOutput['getRecipe']['recipe']> }) => {
  const trpcUtils = trpc.useUtils()
  const setRecipeLike = trpc.setRecipeLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetRecipeData = trpcUtils.getRecipe.getData({ recipeNick: recipe.nick })
      if (oldGetRecipeData?.recipe) {
        const newGetRecipeData = {
          ...oldGetRecipeData,
          recipe: {
            ...oldGetRecipeData.recipe,
            isLikedByMe,
            likesCount: oldGetRecipeData.recipe.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getRecipe.setData({ recipeNick: recipe.nick }, newGetRecipeData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getRecipe.invalidate({ recipeNick: recipe.nick })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setRecipeLike.mutateAsync({ recipeId: recipe.id, isLikedByMe: !recipe.isLikedByMe })
      }}
    >
      <Icon size={32} className={css.likeIcon} name={recipe.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}

export const ViewRecipePage = withPageWrapper({
  useQuery: () => {
    const { recipeNick } = useParams() as ViewRecipeRouteParams
    return trpc.getRecipe.useQuery({
      recipeNick,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    recipe: checkExists(queryResult.data.recipe, 'Recipe not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
  title: ({ recipe }) => recipe.name,
})(({ recipe, me }) => (
  <Segment title={recipe.name} description={recipe.description}>
      <div className={css.createdAt}>Created At: {format(recipe.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>
        Author: {recipe.author.nick}
        {recipe.author.name ? ` (${recipe.author.name})` : ''}
      </div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: recipe.text }} />
      <div className={css.likes}>
      Likes: {recipe.likesCount}
      {me && (
        <>
          <br />
          <LikeButton recipe={recipe} />
        </>
      )}
    </div>
    {canEditRecipe(me, recipe) && (
        <div className={css.editButton}>
          <LinkButton to={getEditRecipeRoute({ recipeNick: recipe.nick })}>Edit Recipe</LinkButton>
        </div>
      )}
      {canBlockRecipes(me) && (
      <div className={css.blockRecipe}>
        <BlockRecipe recipe={recipe} />
      </div>
    )}
    </Segment>
  ))