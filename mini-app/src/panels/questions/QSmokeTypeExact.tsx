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
        className="option"
        checked={smokeType === "PODS"}
        onChange={() => {
          setType(smokeType === "PODS" ? null : "PODS");
        }}
      >
        поды
      </Radio>
      <Radio
        className="option"
        checked={smokeType === "DISPOSABLE"}
        onChange={() => {
          setType(smokeType === "DISPOSABLE" ? null : "DISPOSABLE");
        }}
      >
        одноразовые
      </Radio>
      <Button
        after={<Icon12ChevronRight color="#2BB4D6" />}
        className="continue"
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
        <Text className="continue__text"> Продолжить</Text>
      </Button>
    </Div>
  );
};
