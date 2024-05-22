import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Error404 from './Error404';
import Home from './pages/Home';

export  const router = createBrowserRouter([
    {   
        path: "/",
        element: <RootLayout />,
        id: "root",
        errorElement: <Error404 />,
        children: [
            { index: true, element: <Home /> },
        ]}
]); 