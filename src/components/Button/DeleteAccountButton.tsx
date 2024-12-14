"use client";

import React, { useState } from "react";
import { deleteAccount } from "@/actions/deleteAccount";
import { useUserStore } from "@/stores/useUserStore";

const DeleteAccountButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const updateUser = useUserStore((state) => state.updateUser);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      updateUser(null);
      await deleteAccount();
    } catch (error) {
      window.location.href = "/login";
    }

    setIsDeleting(false);
  };

  return (
    <div>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting} 
      >
        {isDeleting ? "탈퇴 중..." : "회원 탈퇴"}
      </button>
    </div>
  );
};

export default DeleteAccountButton;