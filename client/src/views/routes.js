import React from "react";
import { Navigate } from "react-router-dom";
import {
  // student imports
  Students,
  AddStudent,
  EditStudent,
  ViewStudent,
  EditAttendance,

  // driver imports
  Drivers,
  AddDriver,
  EditDriver,

  // organization imports
  Organizations,
  OrganizationSignup,
  ViewOrganization,
  AddOrganization,
  EditOrganization,
  ViewExpenses,

  // expenses imports
  Expenses,
  AddExpense,
  EditExpense,

  // admins imports
  Admins,
  AddAdmin,
} from "./Dashboard";

import {
  NotFound,
  LoginPage,
  SignupPage,
  About,
  Home,
  Contact,
} from "./Frontend";
import { PROFILES } from "../utils/constants";

const routes = [
  // login and signup routes
  {
    path: "/",
    renderer: (params = {}) => <Home {...params} />,
  },
  {
    path: "/home",
    renderer: (params = {}) => <Home {...params} />,
  },
  {
    path: "/login",
    renderer: (params = {}) => <LoginPage {...params} />,
  },
  {
    path: "/signup",
    renderer: (params = {}) => <SignupPage {...params} />,
  },
  {
    path: "/about",
    renderer: (params = {}) => <About {...params} />,
  },
  {
    path: "/contact",
    renderer: (params = {}) => <Contact {...params} />,
  },
  // admins routes start
  {
    path: "/admins",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <Admins {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/admins/add",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <AddAdmin {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },

  // admins routes end

  // student routes
  {
    path: "/students",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <Students {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/students/add",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <AddStudent {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/students/view/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <ViewStudent {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/students/edit/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <EditStudent {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/students/attendance/edit/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <EditAttendance {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },

  // driver routes
  {
    path: "/drivers",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <Drivers {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/drivers/add",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <AddDriver {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/drivers/edit/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true ? (
        <EditDriver {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },

  // organization routes
  {
    path: "/organizations",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <Organizations {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/organizations/signup",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <OrganizationSignup {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/organizations/view/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <ViewOrganization {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/organizations/add",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <AddOrganization {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/organizations/edit/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <EditOrganization {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },
  {
    path: "/organizations/view-expenses/:id",
    renderer: (params = {}) =>
      params.isAuthenticated === true && params.profile === PROFILES.ADMIN ? (
        <ViewExpenses {...params} />
      ) : (
        <Navigate to='/login' />
      ),
  },

  // expenses routes
  // {
  //   path: "/expenses",
  //   renderer: (params = {}) => (params.isAuthenticated === true ? <Expenses {...params} /> : <Navigate to='/login' />),
  // },
  // {
  //   path: "/expenses/add",
  //   renderer: (params = {}) => (params.isAuthenticated === true ? <AddExpense {...params} /> : <Navigate to='/login' />),
  // },
  // {
  //   path: "/expenses/edit/:id",
  //   renderer: (params = {}) => (params.isAuthenticated === true ? <EditExpense {...params} /> : <Navigate to='/login' />),
  // },
  {
    path: "/*",
    renderer: (params = {}) => <NotFound {...params} />,
  },
];

export default routes;
