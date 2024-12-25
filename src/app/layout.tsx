"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/redux/store";
import "./globals.css";
import Layout from "@/Components/Layout";

const persistor = persistStore(store);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {isMounted ? (
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
              <Layout>{children}</Layout>
            </PersistGate>
          ) : (
            <Layout>{children}</Layout>
          )}
        </Provider>
      </body>
    </html>
  );
}
