import React, { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Checkbox, Div, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QReason: React.FC<QuestionProps> = ({
  data,
  setData,
  setPage,
}) => {
  const [health, setHealth] = useState<boolean>(false);
  const [emotions, setEmotions] = useState<boolean>(false);
  const [willpower, setWillpower] = useState<boolean>(false);
  const [money, setMoney] = useState<boolean>(false);
  const [defaul, setDefaul] = useState<boolean>(false);

  return (
    <Div className="center">
      <Text className="q-text">Почему ты хочешь бросить курить?</Text>

      <Checkbox
        checked={health}
        onChange={(e) => {
          setHealth(e.target.checked);
        }}
      >
        Проблемы со здоровьем
      </Checkbox>
      <Checkbox
        checked={emotions}
        onChange={(e) => {
          setEmotions(e.target.checked);
        }}
      >
        Хочу стабилизировать свой эмоциональный фон
      </Checkbox>
      <Checkbox
        checked={willpower}
        onChange={(e) => {
          setWillpower(e.target.checked);
        }}
      >
        Хочу проверить свою силу воли
      </Checkbox>
      <Checkbox
        checked={money}
        onChange={(e) => {
          setMoney(e.target.checked);
        }}
      >
        Надоело тратить деньги на сигареты
      </Checkbox>
      <Checkbox
        checked={defaul}
        onChange={(e) => {
          setDefaul(e.target.checked);
        }}
      >
        Просто хочу избавиться от вредной привычки
      </Checkbox>

      <Button
        onClick={() => {
          setData({
            ...data,
            reasons: [
              health && "HEALTH",
              emotions && "EMOTIONS",
              willpower && "WILLPOWER",
              money && "MONEY",
              defaul && "DEFAULT",
            ].reduce((prev, cur) => prev + (cur ? cur + "," : ""), ""),
          });
          setPage("end");
        }}
      >
        Продолжить <Icon12ChevronRight />
      </Button>
    </Div>
  );
};
