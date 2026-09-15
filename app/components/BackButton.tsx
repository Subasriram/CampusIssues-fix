"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant="secondary"
      onClick={handleBack}
    >
      ← Back
    </Button>
  );
}