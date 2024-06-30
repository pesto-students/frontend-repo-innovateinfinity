import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import viewRoutes from "./views/routes";

const Routes = () => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const profile = useSelector(state => state.authReducer.profile);

  return (
    <ReactRoutes>
      {viewRoutes.map((item, i) => (
        // <Route key={i} path={item.path} exact element={item.renderer()} />
        <Route key={i} path={item.path} exact element={item.renderer({ isAuthenticated, profile })} />
      ))}
      <Route path="*" element={<Navigate replace to="/not-found-cover" />} />
    </ReactRoutes>
  );
};

export default Routes;
