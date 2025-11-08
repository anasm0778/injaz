"use client";
import React, { useEffect, useState } from "react";
import AdminHome from "./AdminHome";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AdminPageLogic = ({ children }: any) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(checkAdmin);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      // Redirect to login page if not authenticated
      router.push("/adminpage/signin_signup/signin");
    }
  }, [isAdmin, router]);

  return (
    <>
      {loading ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            visibility: "hidden",
          }}
        >
          Loading...
        </h1>
      ) : isAdmin ? (
        <>{children}</>
      ) : (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </h1>
      )}
    </>
  );
};

export default AdminPageLogic;
