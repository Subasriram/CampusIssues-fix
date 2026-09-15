"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    dispatch({
      type: "auth/logout",
    });

    setShowConfirm(false);
    router.push("/login");
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShowConfirm(true)}
      >
        Logout
      </Button>

      <ConfirmDialog
        open={showConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}