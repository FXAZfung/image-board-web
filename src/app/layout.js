import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { apiSetting } from "@/api/setting";
import { AuthProvider } from "@/context/auth-context";
import { SettingProvider } from "@/context/status-context";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const setting = await apiSetting();
export const metadata = {
  manifest: "/site.webmanifest",
  title: setting.site_title,
  description: setting.site_description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({ children }) {

  return (
    <html suppressHydrationWarning lang="zh-CN" className={[geistMono.className, geistSans.className]}>
      <body className="min-h-screen w-full" font={geistSans} mono={geistMono}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SettingProvider>
              {children}
              <Toaster richColors position="top-right" />
            </SettingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
