import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';
import {
  RouterProvider,
} from "react-router-dom";

import './css/style.css';
import './css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import Router from './routes';
import {store, persistor} from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
// import Loader from './components/loader';
 
DataTable.use(DT);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
        {/* <Loader /> */}
      </PersistGate>
    </Provider>
      {/* <Router>
      <App />
    </Router> */}
  </React.StrictMode>,
);
