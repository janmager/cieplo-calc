
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="w-full max-w-[1280px] mx-auto px-5 md:px-10">
            {children}
        </div>
    );
  }