import LogoutModalButton from "@/components/auth/LogoutModalButton";
import DeleteAccountButton from "@/components/Button/DeleteAccountButton";
import AccountTable from "@/components/UserInfo/AccountTable";

const MyPage = ({params}: { params: { id: string } }) => {
  return (
    <>
      
      <AccountTable />
      <LogoutModalButton />
      <DeleteAccountButton />
    </>
  )
}

export default MyPage;