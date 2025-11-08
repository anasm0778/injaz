"use client";
import React from "react";
import "../[locale]/globals.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <section className="notFound">
        <div className="wrapper">
          <h2>Oops! Page not found.</h2>
          <div>
            <img
              decoding="async"
              src="/404-page-not-found-illustration-2048x998-yjzeuy4v.png"
              alt="404"
            />
          </div>
          <h4>We can&#39;t find the page you&#39;re looking for.</h4>
          <button
            type="button"
            className="main-btn"
            onClick={() => router.push("/")}
          >
            GO BACK HOME
          </button>
        </div>
      </section>
    </>
  );
}
