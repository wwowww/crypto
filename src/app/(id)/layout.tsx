export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-10 w-[1200px] mx-auto">
      {children}
    </div>
  );
}
