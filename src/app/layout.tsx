import NavMenu from "~/components/NavMenu";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Birdclone",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
// might switch fonts to google outfit
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="container">
          <div className="grid-cols-2">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavMenu />
              {children}
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
