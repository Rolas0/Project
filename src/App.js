import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './Pages/Main/Main';
import History from './Pages/History/History';
import NewClient from './Pages/newClient/NewClient';
import NewParts from './Pages/newParts/NewParts';
import NewServices from './Pages/newServices/NewServices';
import Services from './Pages/Services/Services';
import Parts from './Pages/Parts/Parts';
import NewRepair from './Pages/newRepair/NewRepair';
import Repair from './Pages/Repair/Repair';
import DataProvider from './context/Context';
import AllClients from './Pages/ClientsPage/AllClients';
import './styles/global.scss';

const routers = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'repair/:clientId',
                element: <Repair />,
            },
            {
                path: '/',
                element: <AllClients />,
            },
            {
                path: '/clients',
                element: <AllClients />,
            },
            {
                path: 'newRepair/:id',
                element: <NewRepair />,
            },
            {
                path: 'history',
                element: <History />,
            },
            {
                path: 'newClient',
                element: <NewClient />,
            },
            {
                path: 'services',
                element: <Services />,
            },
            {
                path: 'newServices',
                element: <NewServices />,
            },
            {
                path: 'parts',
                element: <Parts />,
            },
            {
                path: 'newParts',
                element: <NewParts />,
            },
        ],
    },
]);

function App() {
    return (
        <DataProvider>
            <div className="App">
                <RouterProvider router={routers} />
            </div>
        </DataProvider>
    );
}

export default App;
