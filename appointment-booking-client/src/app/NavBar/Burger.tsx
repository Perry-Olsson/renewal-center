import React, { createContext, useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useGetUser } from "../../context";
import { BurgerTab } from "./Tab";
import { UserTabs } from "./UserTabs";

export const Burger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useGetUser();

  return (
    <>
      <Menu isOpen={isOpen} onStateChange={state => setIsOpen(state.isOpen)}>
        <SetOpenProvider value={setIsOpen}>
          <BurgerTab href="/" isFirst={true}>
            Home
          </BurgerTab>
          <BurgerTab href="/about">About</BurgerTab>
          <BurgerTab href="/schedule">Book Online</BurgerTab>
          <UserTabs isBurger />
        </SetOpenProvider>
      </Menu>
      {user && user !== "loading" ? (
        <span style={{ margin: "auto 1rem" }}>
          logged in as {user.firstName}
        </span>
      ) : null}
    </>
  );
};

const SetMenuContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

const SetOpenProvider = SetMenuContext.Provider;

export const useIsOpen = () => {
  const context = useContext(SetMenuContext);
  if (context === undefined)
    throw new Error("useIsOpen needs to be called within it's provider");
  return context;
};
