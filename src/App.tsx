import { lazy, Suspense, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/MainHooks";
import { isUserLogged } from "./store/Auth/Actions/IsUserLogged";
import LoadingPage from "./components/common/feedback/LoadingPage";
import { getCartInfo } from "./store/Cart/Actions/CartInfo";
import AuthRequire from "./components/Guard/AuthRequire";
import PagesWithNavbar from "./components/common/PagesWithNavbar";
import AdminRequire from "./components/Guard/AdminRequire";
import UserRequire from "./components/Guard/UserRequire";
import { getWishListAction } from "./store/WishList/Actions/GetWishListAction";
import AuthFormGuard from "./components/Guard/AuthFormGuard";
import ShowAllProducts from "./pages/AllProducts/ShowAllProducts";

const WishListPage = lazy(() => import("./pages/WishList/WishListPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/Dashboard/User/ContactUs"));
const UserOrders = lazy(() => import("./pages/Dashboard/User/UserOrders"));
const UserOverview = lazy(() => import("./pages/Dashboard/User/UserOverview"));

const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Register/RegisterPage"));
const Error404 = lazy(() => import("./pages/Error404"));
const ProductInfo = lazy(() => import("./pages/ProductInfo/ProductInfo"));
const AddProduct = lazy(
  () => import("./pages/Dashboard/AddProduct/AddProduct")
);
const CartPage = lazy(() => import("./pages/CartPage/CartPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashOverview = lazy(() => import("./pages/Dashboard/DashOverview"));
const DashAllProduct = lazy(() => import("./pages/Dashboard/DashAllProduct"));
const EditProduct = lazy(
  () => import("./pages/Dashboard/EditProduct/EditProduct")
);
const PaymentPage = lazy(() => import("./pages/CartPage/PaymentPage"));
const AddDiscountPage = lazy(
  () => import("./pages/Dashboard/DiscountPage/AddDiscountPage")
);

const OrdersPage = lazy(
  () => import("./pages/Dashboard/OrdersPage/OrdersPage")
);
const OrderDetails = lazy(
  () => import("./pages/Dashboard/OrdersPage/OrderDetails")
);
function App() {
  const { isLoggedIn } = useAppSelector((state) => state.AuthSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(isUserLogged())
        .unwrap()
        .then((e) => {
          if (e.uid.length > 0) {
            dispatch(getCartInfo(e.uid));
            dispatch(getWishListAction(e.uid));
          }
        });
    };
  }, [dispatch, isLoggedIn]);
  return (
    <>
      <Routes>
        {/* Pages With NavBar */}
        <Route element={<PagesWithNavbar />}>
          <Route path="/" element={<ShowAllProducts />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<LoadingPage />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ContactUsPage />
              </Suspense>
            }
          />
          <Route
            path="wishlist"
            element={
              <Suspense fallback={<LoadingPage />}>
                <WishListPage />
              </Suspense>
            }
          />
          <Route
            path="cart"
            element={
              <Suspense fallback={<LoadingPage />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="cart/payment"
            element={
              <Suspense fallback={<LoadingPage />}>
                <PaymentPage />
              </Suspense>
            }
          />

          <Route
            path="product/:prod_title"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProductInfo />
              </Suspense>
            }
          />
          <Route element={<AuthFormGuard />}>
            <Route
              path="login"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <RegisterPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route element={<AuthRequire />}>
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Dashboard />
              </Suspense>
            }>
            {/*   Admin Dashboard */}

            <Route element={<AdminRequire />}>
              <Route
                path="edit/:title"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <EditProduct />
                  </Suspense>
                }
              />
              <Route
                path="overview"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <DashOverview />
                  </Suspense>
                }
              />
              <Route
                path="orders"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <OrdersPage />
                  </Suspense>
                }
              />
              <Route
                path="discounts"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AddDiscountPage />
                  </Suspense>
                }
              />
              <Route
                path="orders/:id"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <OrderDetails />
                  </Suspense>
                }
              />

              <Route
                path="all-products"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <DashAllProduct />
                  </Suspense>
                }
              />
              <Route
                path="add-product"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AddProduct />
                  </Suspense>
                }
              />
            </Route>

            {/* User Dashboard */}
            <Route element={<UserRequire />}>
              <Route
                path="user-overview"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <UserOverview />
                  </Suspense>
                }
              />
              <Route
                path="user-orders"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <UserOrders />
                  </Suspense>
                }
              />
              <Route
                path="contact-us"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <ContactUs />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
