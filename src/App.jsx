import { UserProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import { SidebarProvider } from "./context/SidebarContext";
import { WishlistProvider } from "./context/WishlistContext";
import { MainRouter } from "./router";

function App() {
  return (
    <UserProvider>
      <BasketProvider>
        <WishlistProvider>
          <SidebarProvider >
            <MainRouter />
          </SidebarProvider>
        </WishlistProvider>
      </BasketProvider>
    </UserProvider>
  )
}

export default App