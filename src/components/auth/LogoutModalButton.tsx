"use client";

import { deleteSession } from "@/actions/sessions";
import { Button } from "../ui/button";
import { useModalStore } from "@/stores/useModalStore";
import toast from "react-hot-toast";
import { useUserStore } from "@/stores/useUserStore";

const LogoutModalButton = ({ className }: { className?: string }) => {
  const { openModal, closeModal } = useModalStore();
  const updateUser = useUserStore((state) => state.updateUser);

  const handleDelete = async () => {
    try {
      await deleteSession();
      toast.success("로그아웃 되었습니다.");
      updateUser(null);
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  const ClickLogout = (event: any) => {
    event.preventDefault();

    openModal({
      title: "로그아웃 하시겠습니까?",
      footer: (
        <>
          <Button onClick={closeModal} variant="secondary">
            취소
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            로그아웃
          </Button>
        </>
      ),
    });
  };

  return (
    <button className={className} onClick={ClickLogout}>
      로그아웃
    </button>
  );
};

export default LogoutModalButton;

