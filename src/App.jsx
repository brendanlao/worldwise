import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/PageNotFound"));

const router = createBrowserRouter([
  { path: "/", element: <Homepage />, errorElement: <NotFound /> },
  { path: "pricing", element: <Pricing /> },
  { path: "product", element: <Product /> },
  { path: "login", element: <Login /> },
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate replace to="cities" /> },
      { path: "cities", element: <CityList /> },
      {
        path: "cities/:id",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
]);

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </CitiesProvider>
  );

  //* Without using createBrowserRouter
  // return (
  //   <CitiesProvider>
  //     <AuthProvider>
  //       <BrowserRouter>
  //         <Suspense fallback={<SpinnerFullPage />}>
  //           <Routes>
  //             <Route path="/" element={<Homepage />} />
  //             <Route path="pricing" element={<Pricing />} />
  //             <Route path="product" element={<Product />} />
  //             <Route path="login" element={<Login />} />
  //             <Route
  //               path="app"
  //               element={
  //                 <ProtectedRoute>
  //                   <AppLayout />
  //                 </ProtectedRoute>
  //               }
  //             >
  //               <Route index element={<Navigate replace to="cities" />} />
  //               <Route path="cities" element={<CityList />} />
  //               <Route path="cities/:id" element={<City />} />
  //               <Route path="countries" element={<CountryList />} />
  //               <Route path="form" element={<Form />} />
  //             </Route>
  //             <Route path="*" element={<NotFound />} />
  //           </Routes>
  //         </Suspense>
  //       </BrowserRouter>
  //     </AuthProvider>
  //   </CitiesProvider>
  // );
}

export default App;
