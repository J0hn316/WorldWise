import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// context
import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/FakeAuthContext';

// Pages
// import Product from './pages/Product/Product';
// import Pricing from './pages/Pricing/Pricing';
// import AppLayout from './pages/AppLayout/AppLayout';
// import PageNotFound from './pages/PageNotFound';
// import Homepage from './pages/HomePage/HomePage';
// import Login from './pages/Login/Login';
import ProtectedRoute from './pages/ProtectedRoute';

//Components
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';
import SpinnerFullPage from './components/SpinnerFullPage/SpinnerFullPage';

// Lazy loading examples
const Homepage = lazy(() => import('./pages/HomePage/HomePage'));
const Product = lazy(() => import('./pages/Product/Product'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const Login = lazy(() => import('./pages/Login/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};
export default App;
