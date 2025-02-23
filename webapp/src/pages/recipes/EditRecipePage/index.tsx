import { zUpdateRecipeTrpcInput } from '@cookingbook/backend/src/router/recipes/updateRecipe/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { canEditRecipe } from '@cookingbook/backend/src/utils/can'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { type EditRecipeRouteParams, getViewRecipeRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'

export const EditRecipePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { recipeNick } = useParams() as EditRecipeRouteParams
    return trpc.getRecipe.useQuery({
      recipeNick,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const recipe = checkExists(queryResult.data.recipe, 'Recipe not found')
    checkAccess(canEditRecipe(ctx.me, recipe), 'A recipe can only be edited by the author')
    return {
      recipe,
    }
  },
  title: ({ recipe }) => `Edit Recipe "${recipe.name}"`,
})(({ recipe }) => {
  const navigate = useNavigate()
  const updateRecipe = trpc.updateRecipe.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(recipe, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateRecipeTrpcInput.omit({ recipeId: true }),
    onSubmit: async (values) => {
      await updateRecipe.mutateAsync({ recipeId: recipe.id, ...values })
      navigate(getViewRecipeRoute({ recipeNick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })
  
  return (
    <Segment title={`Edit Recipe: ${recipe.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Recipe</Button>
        </FormItems>
      </form>
    </Segment>
  )
})

