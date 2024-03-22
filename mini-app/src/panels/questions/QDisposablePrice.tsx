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
        value={price}
        onInput={(e) => {
          setPrice(Number(e.currentTarget.value));
        }}
      />

      <Button
        onClick={() => {
          setData({ ...data, disposablePrice: price });
          setPage("disposableCount");
        }}
      >
        Продолжить <Icon12ChevronRight />
      </Button>
    </Div>
  );
};
