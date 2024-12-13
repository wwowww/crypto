import { Button } from "../ui/button";

type ModalFooterProps = {
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalFooter = ({ onCancel, onConfirm }: ModalFooterProps) => {
  return (
    <>
      <Button variant="destructive" onClick={onConfirm}>삭제</Button>
      <Button onClick={onCancel}>취소</Button>
    </>
  )
}

export default ModalFooter;