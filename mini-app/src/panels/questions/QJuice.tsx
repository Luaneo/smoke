import React, { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Div, Slider, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QJuice: React.FC<QuestionProps> = ({ data, setData, setPage }) => {
  const [juiceCount, setCount] = useState<number>(0);

  return (
    <Div className="center">
      <Text className="q-text">Сколько банок жижи у тебя уходит в месяц?</Text>
      <Slider
        className="q-slider"
        value={juiceCount}
        onChange={setCount}
        max={6}
        min={0}
        step={0.5}
      />
      <div className="q-underbox">{juiceCount}</div>
      <Button
        after={<Icon12ChevronRight color="#2BB4D6" />}
        className="continue"
        onClick={() => {
          setData({ ...data, juicePerMonth: juiceCount });
          setPage("vaporizer");
        }}
      >
        <Text className="continue__text">Продолжить</Text>
      </Button>
    </Div>
  );
};
