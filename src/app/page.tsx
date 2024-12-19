import CoinTable from "@/components/CoinTable/CoinTable";

export default function Home() {
  return (
    <section className="py-[64px] w-[1200px] my-[48px] mx-auto">
      <h2 className="text-[#1c2028] text-[48px] font-bold text-center">오늘의 시세를 확인해보세요</h2>
      <CoinTable />
    </section>
  );
}
