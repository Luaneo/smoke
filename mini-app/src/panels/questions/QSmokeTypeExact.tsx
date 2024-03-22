import { useState } from "react";
import { QuestionProps } from "../Registration";
import { Button, Div, Radio, Text } from "@vkontakte/vkui";
import { Icon12ChevronRight } from "@vkontakte/icons";

export const QSmokeTypeExact: React.FC<QuestionProps> = ({
  data,
  setData,
  setPage,
}) => {
  const [smokeType, setType] = useState<"PODS" | "DISPOSABLE" | null>();

  return (
    <Div className="center">
      <Text className="q-text">Что именно?</Text>
      <Radio
        checked={smokeType === "PODS"}
        onChange={() => {
          setType(smokeType === "PODS" ? null : "PODS");
        }}
      >
        поды
      </Radio>
      <Radio
        checked={smokeType === "DISPOSABLE"}
        onChange={() => {
          setType(smokeType === "DISPOSABLE" ? null : "DISPOSABLE");
        }}
      >
        одноразовые
      </Radio>
      <Button
        onClick={() => {
          if (smokeType === "PODS") {
            setData({ ...data, smokeType: smokeType });
            setPage("juice");
          } else if (smokeType === "DISPOSABLE") {
            setData({ ...data, smokeType: smokeType });
            setPage("disposablePrice");
          }
        }}
      >
        Продолжить <Icon12ChevronRight />
      </Button>
    </Div>
  );
};
