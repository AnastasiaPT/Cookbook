import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import { TrpcProvider } from './lib/trpc'
import { AllRecipesPage } from './pages/recipes/AllRecipesPage'
import { ViewRecipePage } from './pages/recipes/ViewRecipePage'
import { NewRecipePage } from './pages/recipes/NewRecipePage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { EditRecipePage } from './pages/recipes/EditRecipePage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import './styles/global.scss'

export const App = () => {

  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
                <Route element={<Layout />}>
                <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
                <Route path={routes.getSignInRoute()} element={<SignInPage />} />
                <Route path={routes.getAllRecipesRoute()} element={<AllRecipesPage />} />
                <Route path={routes.getNewRecipeRoute()} element={<NewRecipePage />} />
                <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
                <Route path={routes.getViewRecipeRoute(routes.viewRecipeRouteParams)} element={<ViewRecipePage />} />
                <Route path={routes.getEditRecipeRoute(routes.editRecipeRouteParams)} element={<EditRecipePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}

