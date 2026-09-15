"use client";

import { PersistGate as ReduxPersistGate } from "redux-persist/integration/react";

import { persistor } from "../store/store";

interface PersistGateProps {
  children: React.ReactNode;
}

export default function PersistGate({
  children,
}: PersistGateProps) {
  return (
    <ReduxPersistGate
      loading={null}
      persistor={persistor}
    >
      {children}
    </ReduxPersistGate>
  );
}