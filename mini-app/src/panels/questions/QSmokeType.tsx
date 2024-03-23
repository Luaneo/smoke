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
        className="option"
        checked={smokeType === "CIGS"}
        onChange={() => {
          setType(smokeType === "CIGS" ? null : "CIGS");
        }}
      >
        обычные сигареты
      </Radio>
      <Radio
        className="option"
        checked={smokeType === "ECIGS"}
        onChange={() => {
          setType(smokeType === "ECIGS" ? null : "ECIGS");
        }}
      >
        электронные сигареты
      </Radio>
      <Radio
        className="option"
        checked={smokeType === "NOTHING"}
        onChange={() => {
          setType(smokeType === "NOTHING" ? null : "NOTHING");
        }}
      >
        просто так зашел
      </Radio>
      <Div>
        <Button
          className="continue"
          after={<Icon12ChevronRight color="#2BB4D6" />}
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
          <Text className="continue__text">Продолжить</Text>
        </Button>
      </Div>
    </Div>
  );
};
