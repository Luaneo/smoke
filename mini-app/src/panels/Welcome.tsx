import { NavIdProps, Panel, Text } from "@vkontakte/vkui";
import { BigLogo } from "../components";
import React from "react";

export const Welcome: React.FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id} centered={true}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: "23px",
            fontWeight: "500",
          }}
        >
          Добро пожаловать в
        </Text>
        <BigLogo />
      </div>
    </Panel>
  );
};
