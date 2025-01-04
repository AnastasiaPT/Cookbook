import { Link, Outlet } from 'react-router-dom'
import { getAllRecipesRoute, getNewRecipeRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
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
        <li className={css.item}>
          <Link className={css.link} to={getNewRecipeRoute()}>
            Add Recipe
          </Link>
        </li>
      </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}

