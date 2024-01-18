import MainLayout from "./MainLayout";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css'
import { ReduxProvider } from "@/redux/provider";

export const metadata = {
  title: "BubbleDubble | Double the Flavor, Double the Fun!",
  description: "Welcome to BubbleDubble!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <MainLayout>{children}</MainLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
