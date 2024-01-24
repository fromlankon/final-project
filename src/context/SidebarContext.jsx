import { createContext, useState } from "react";

export const sidebarContext = createContext()

export const SidebarProvider = ({ children }) => {

    const [show, setShow] = useState(false)
    const [query, setQuery] = useState("");

    const closeSidebar = () => {
        setShow(false);
    };

    return (

        <sidebarContext.Provider value={{ show, setShow, query, setQuery }}>
            {children}
        </sidebarContext.Provider>
    )
}