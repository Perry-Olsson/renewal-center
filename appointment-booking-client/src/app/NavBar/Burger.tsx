import React from "react";
import { useGetUser } from "../../context";
import { BurgerTab } from "./Tab";
import { UserTabs } from "./UserTabs";
import { BurgerMenu } from "../../components";

export const Burger: React.FC = () => {
  const user = useGetUser();

  return (
    <>
      <BurgerMenu>
        <BurgerTab href="/" isFirst={true}>
          Home
        </BurgerTab>
        <BurgerTab href="/about">About</BurgerTab>
        <BurgerTab href="/schedule">Book Online</BurgerTab>
        <UserTabs isBurger />
      </BurgerMenu>
      {user && user !== "loading" ? (
        <span style={{ margin: "auto 1rem" }}>
          logged in as {user.firstName}
        </span>
      ) : null}
    </>
  );
};
