import { createRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMe } from '../../lib/ctx'
import { getAllRecipesRoute,
         getNewRecipeRoute, 
         getSignInRoute, 
         getSignUpRoute,
         getSignOutRoute, 
         getEditProfileRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const layoutContentElRef = createRef<HTMLDivElement>()

export const Layout = () => {
  const me = useMe()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
      <div className={css.logo}>CookBook</div>
      <ul className={css.menu}>
        <li className={css.item}>
          <Link className={css.link} to={getAllRecipesRoute()}>
            All Recipes
          </Link>
        </li>
        {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewRecipeRoute()}>
                  Add Recipe
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
      </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}

