// _app.js
import "@/styles/globals.css";

import {  Provider } from 'react-redux';
import { store } from "@/reducers/store";


// function AuthComponent({ Component, pageProps }) {
//   const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  // const dispatch = useDispatch();

//   const [isAuthChecked, setIsAuthChecked] = useState(false);

// useEffect(() => {
//   console.log(isAuthenticated)
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     dispatch(loginSuccess({ token }));
//   } else {
//     dispatch(authError("No authenticated user"));
//   }
//   setIsAuthChecked(true);
// }, [dispatch]);

// if (!isAuthChecked) {
//   return <div>Loading...</div>;  // Or some other loading indicator
// }

// if (!isAuthenticated ) {
//   return <Login />;
// } else if (isAuthenticated && Component === Login) {
//   return <Home />;
// } else {
//   return <Component {...pageProps} />;
// }

   
 
// }

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
