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
        value={cigs}
        onChange={setCigs}
        max={30}
        min={0}
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
        {cigs}
      </div>

      <Button
        onClick={() => {
          setData({ ...data, cigsPerDay: cigs });
          setPage("reason");
        }}
      >
        Продолжить <Icon12ChevronRight />
      </Button>
    </Div>
  );
};
