import { NavIdProps, Panel } from "@vkontakte/vkui";
import React from "react";
import { MotionAss } from "./motions";

export const SmokeFromAss: React.FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <MotionAss />
    </Panel>
  );
};
