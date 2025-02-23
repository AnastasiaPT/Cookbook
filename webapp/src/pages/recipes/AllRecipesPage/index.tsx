import { zGetRecipesTrpcInput } from '@cookingbook/backend/src/router/recipes/getRecipes/input'
import InfiniteScroll from 'react-infinite-scroller'
import { useDebounce } from '@uidotdev/usehooks'
import { Link } from 'react-router-dom'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Alert } from '../../../components/Alert'
import { useForm } from '../../../lib/form'
import { layoutContentElRef } from '../../../components/Layout'
import { getViewRecipeRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { Loader } from '../../../components/Loader'
import css from './index.module.scss'

export const AllRecipesPage = withPageWrapper({
  title: 'CookBook',
  isTitleExact: true,
})(() => {  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetRecipesTrpcInput.pick({ search: true }),
  })
   const search = useDebounce(formik.values.search, 500) 
 // const search = formik.values.search
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getRecipes.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All recipes">
       <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].recipes.length ? (
        <Alert color="brown">Nothing found by search</Alert>
      ) : (
        <div className={css.recipes}>
           <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
          {data.pages
            .flatMap((page) => page.recipes)
            .map((item) => (
              <div className={css.recipe} key={item.nick}>
                <Segment
                  size={2}
                  title={
                    <Link className={css.recipeLink} to={getViewRecipeRoute({ recipeNick: item.nick })}>
                      {item.name}
                    </Link>
                  }
                  description={item.description}
                  >
                  Likes: {item.likesCount}
                </Segment>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}

    </Segment>
  )
})
