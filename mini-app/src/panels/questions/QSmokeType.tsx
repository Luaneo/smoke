import { Button, Div, Radio, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";
import React, { useState } from "react";
import { QuestionProps } from "../Registration";

export const QSmokeType: React.FC<QuestionProps> = ({
  data,
  setData,
  setPage,
}) => {
  const [smokeType, setType] = useState<"CIGS" | "ECIGS" | "NOTHING" | null>();

  return (
    <Div className="center">
      <Text className="q-text">Что ты куришь?</Text>
      <Radio
        checked={smokeType === "CIGS"}
        onChange={() => {
          setType(smokeType === "CIGS" ? null : "CIGS");
        }}
      >
        обычные сигареты
      </Radio>
      <Radio
        checked={smokeType === "ECIGS"}
        onChange={() => {
          setType(smokeType === "ECIGS" ? null : "ECIGS");
        }}
      >
        электронные сигареты
      </Radio>
      <Radio
        checked={smokeType === "NOTHING"}
        onChange={() => {
          setType(smokeType === "NOTHING" ? null : "NOTHING");
        }}
      >
        просто так зашел
      </Radio>
      <Button
        onClick={() => {
          switch (smokeType) {
            case "CIGS":
              setData({ ...data, smokeType: smokeType });
              setPage("cigs");
              break;
            case "ECIGS":
              setPage("smoketype-exact");
              break;
            case "NOTHING":
              setPage("kitten");
              break;
          }
        }}
      >
        Продолжить <Icon12ChevronRight />
      </Button>
    </Div>
  );
};
