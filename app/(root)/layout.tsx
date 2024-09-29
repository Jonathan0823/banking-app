import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstname: "Eguin",
    lastname: "Jonathan",
  };

  return (
    <main className="flex w-full h-screen font-inter">
        <Sidebar user={loggedIn}/>
        {children}
    </main>
  );
}
