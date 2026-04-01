import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { AppShell } from '@/components/app-shell';
import { TemplateProvider } from '@/context/TemplateContext';
import { JournalProvider } from '@/context/JournalContext';
import { PostProvider } from '@/context/PostContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'A.S.K.',
  description: 'A focused app for prayer and reflection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TemplateProvider>
            <JournalProvider>
              <PostProvider>
                <AppShell>
                  {children}
                </AppShell>
              </PostProvider>
            </JournalProvider>
          </TemplateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
