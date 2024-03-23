import React, { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Div, Slider, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QVaporizer: React.FC<QuestionProps> = ({
  data,
  setData,
  setPage,
}) => {
  const [vaporizerCount, setCount] = useState<number>(0);

  return (
    <Div className="center">
      <Text className="q-text">Сколько раз в месяц ты меняешь испаритель?</Text>
      <Slider
        className="q-slider"
        value={vaporizerCount}
        onChange={setCount}
        max={6}
        min={0}
        step={0.5}
      />
      <div className="q-underbox">{vaporizerCount}</div>
      <Button
        className="continue"
        after={<Icon12ChevronRight color="#2BB4D6" />}
        onClick={() => {
          setData({ ...data, vaporizerPerMonth: vaporizerCount });
          setPage("reason");
        }}
      >
        <Text className="continue__text">Продолжить</Text>
      </Button>
    </Div>
  );
};
