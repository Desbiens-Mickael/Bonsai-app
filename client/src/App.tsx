import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFoud";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import CreateBonsai from "./pages/CreateBonsai";
import ShowBonsaisList from "./pages/ShowBonsaisList";
import EditeBonsai from "./pages/EditeBonsai";
import { useGetCurrentUserQuery } from "./gql/generated/schema";
import Loader from "./components/Loader";

function App() {
  const {
    data: CurentUser,
    loading,
    error,
  } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={CurentUser ? false : true} />}>
        <Route
          path="/register"
          element={<Register />}
          errorElement={<ErrorPage />}
        />
        <Route path="/auth" element={<Login />} errorElement={<ErrorPage />} />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isAllowed={CurentUser ? true : false}
            redirectTo="/auth"
          />
        }
      >
        <Route
          path="/profile/:id"
          element={<Profile />}
          errorElement={<ErrorPage />}
        />
        <Route path="/create-bonsai" element={<CreateBonsai />} />
        <Route path="/show-bonsais-list" element={<ShowBonsaisList />} />
        <Route path="/edit-bonsai/:id" element={<EditeBonsai />} />
      </Route>
      <Route index path="/" element={<Home />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="*" element={<Navigate to={"/notFound"} />} />
    </Routes>
  );
}

export default App;
