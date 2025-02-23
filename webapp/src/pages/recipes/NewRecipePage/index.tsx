import { zCreateRecipeTrpcInput } from '@cookingbook/backend/src/router/recipes/createRecipe/input'
import { withZodSchema } from 'formik-validator-zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { trpc } from '../../../lib/trpc'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'

export const NewRecipePage = withPageWrapper({
  authorizedOnly: true,
  title: 'New Recipe',

})(() => {
  const createRecipe = trpc.createRecipe.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateRecipeTrpcInput,
    onSubmit:  async (values) => {
        await createRecipe.mutateAsync(values)
        formik.resetForm()
       },
    successMessage: 'Recipe created!',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Recipe">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Recipe</Button>

        </FormItems> 
      </form>
    </Segment>
  )
})