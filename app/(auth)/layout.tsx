export const metadata = {
  title: "Dudda",
  description: "Question everything",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-b from-pink-600 via-slate-100 to-pink-300 m-5">
        {children}
      </body>
    </html>
  );
}
