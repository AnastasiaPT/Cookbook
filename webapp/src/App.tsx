import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import { TrpcProvider } from './lib/trpc'
import { AllRecipesPage } from './pages/AllRecipesPage'
import { ViewRecipePage } from './pages/ViewRecipePage'
import { NewRecipePage } from './pages/NewRecipePage'
import './styles/global.scss'

export const App = () => {

  return (
    <TrpcProvider>
       <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllRecipesRoute()} element={<AllRecipesPage />} />
            <Route path={routes.getNewRecipeRoute()} element={<NewRecipePage />} />
            <Route path={routes.getViewRecipeRoute(routes.viewRecipeRouteParams)} element={<ViewRecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}

