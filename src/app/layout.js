export const metadata = {
  title: "OptionsPro Coach",
  description: "Your AI mentor for learning options trading",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
