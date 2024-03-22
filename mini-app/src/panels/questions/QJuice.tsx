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
        value={juiceCount}
        onChange={setCount}
        max={6}
        min={0}
        step={0.5}
        style={{
          "--vkui--color_background_accent": "#E52E6A",
          "--vkui_internal--outline": "2px solid #E52E6A",
        }}
      />
      <div
        style={{
          border: "1px solid #2BB4D6",
          borderRadius: "10px",
          height: "44px",
          width: "260px",
        }}
      >
        {juiceCount}
      </div>
      <Button
        onClick={() => {
          setData({ ...data, juicePerMonth: juiceCount });
          setPage("vaporizer");
        }}
      >
        Продолжить <Icon12ChevronRight />
      </Button>
    </Div>
  );
};
