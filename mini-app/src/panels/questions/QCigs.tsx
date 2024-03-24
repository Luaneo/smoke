import React, { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Div, Slider, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QCigs: React.FC<QuestionProps> = ({ data, setData, setPage }) => {
  const [cigs, setCigs] = useState<number>();

  return (
    <Div className="center">
      <Text className="q-text">Сколько сигарет тебе нужно в день?</Text>
      <Slider
        className="q-slider"
        value={cigs}
        onChange={setCigs}
        max={30}
        min={0}
      />
      <div className="q-underbox">{cigs}</div>

      <Button
        className="continue"
        after={<Icon12ChevronRight color="#2BB4D6" />}
        onClick={() => {
          setData({ ...data, cigsPerDay: cigs });
          setPage("reason");
        }}
      >
        <Text className="continue__text">Продолжить</Text>
      </Button>
    </Div>
  );
};
