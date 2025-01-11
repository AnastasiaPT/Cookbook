import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import { TrpcProvider } from './lib/trpc'
import { AllRecipesPage } from './pages/AllRecipesPage'
import { ViewRecipePage } from './pages/ViewRecipePage'
import { NewRecipePage } from './pages/NewRecipePage'
import { SignUpPage } from './pages/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import './styles/global.scss'
import { SignOutPage } from './pages/SignOutPage'


export const App = () => {

  return (
    <TrpcProvider>
       <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getAllRecipesRoute()} element={<AllRecipesPage />} />
            <Route path={routes.getNewRecipeRoute()} element={<NewRecipePage />} />
            <Route path={routes.getViewRecipeRoute(routes.viewRecipeRouteParams)} element={<ViewRecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}

