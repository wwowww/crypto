"use client";

import React from "react";
import { deleteAccount } from "@/actions/deleteAccount";
import { useUserStore } from "@/stores/useUserStore";
import { useModalStore } from "@/stores/useModalStore";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";  // useRouter 훅 사용

type ButtonProps = {
  className?: string;
}

const DeleteAccountButton = ({ className }: ButtonProps) => {
  const { openModal, closeModal } = useModalStore();
  const updateUser = useUserStore((state) => state.updateUser);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteAccount();
      toast.success("회원탈퇴 되었습니다.");
      updateUser(null);
      closeModal();
      router.push("/"); 
    } catch (error) {
      console.error(error);
      toast.error("회원탈퇴에 실패했습니다.");
    }
  };

  const ClickDeleteAccount = (event: any) => {
    event.preventDefault();

    openModal({
      title: "회원탈퇴 하시겠습니까?",
      footer: (
        <>
          <Button onClick={closeModal} variant="secondary">
            취소
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            회원탈퇴
          </Button>
        </>
      ),
    });
  };

  return (
    <div>
      <button className={className} onClick={ClickDeleteAccount}>회원탈퇴</button>
    </div>
  );
};

export default DeleteAccountButton;
