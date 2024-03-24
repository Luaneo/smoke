import React, { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Div, Slider, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QDisposableCount: React.FC<QuestionProps> = ({
  data,
  setData,
  setPage,
}) => {
  const [count, setCount] = useState<number>(0);

  return (
    <Div className="center">
      <Text className="q-text">Сколько раз в месяц ты их покупаешь?</Text>
      <Slider
        className="q-slider"
        value={count}
        onChange={setCount}
        max={6}
        min={0}
        step={0.5}
      />
      <div className="q-underbox">{count}</div>
      <Button
        className="continue"
        after={<Icon12ChevronRight color="#2BB4D6" />}
        onClick={() => {
          setData({ ...data, disposablePerMonth: count });
          setPage("reason");
        }}
      >
        <Text className="continue__text">Продолжить</Text>
      </Button>
    </Div>
  );
};
