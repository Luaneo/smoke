import { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Div, Input, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QDisposablePrice: React.FC<QuestionProps> = ({
  data,
  setData,
  setPage,
}) => {
  const [price, setPrice] = useState<number>();

  return (
    <Div className="center">
      <Text className="q-text">За сколько ты покупаешь одну?</Text>

      <Input
        type="number"
        placeholder="Введи цену"
        value={price}
        onInput={(e) => {
          setPrice(Number(e.currentTarget.value));
        }}
      />

      <Button
        className="continue"
        after={<Icon12ChevronRight color="#2BB4D6" />}
        onClick={() => {
          setData({ ...data, disposablePrice: price });
          setPage("disposableCount");
        }}
      >
        <Text className="continue__text">Продолжить</Text>
      </Button>
    </Div>
  );
};
