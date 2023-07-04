import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
import ProtectedRoute from './utils/protectedRoutes';
import Doceditor from "./pages/documentationPage"
import NotificationUser from "./pages/notificationSend";
import LevelsPage from './pages/LevelsPage';
import ReportedUsers from './pages/ReportedUsersPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { // this is for when only / is hit then it will first go to login then to the admin page
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        // here the protected routes is used
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute> <DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute><UserPage /></ProtectedRoute> },
        { path: 'docs', element: <ProtectedRoute><Doceditor /></ProtectedRoute> },
        { path: 'notification', element: <ProtectedRoute><NotificationUser /></ProtectedRoute> },
        { path: 'levels', element: <ProtectedRoute><LevelsPage /></ProtectedRoute> },
        { path: 'reportedUsers', element: <ProtectedRoute><ReportedUsers /></ProtectedRoute> },



      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
