import { Panel, PanelHeader, Text } from "@vkontakte/vkui";

function Thanks() {
  return (
    <Panel className="Thanks">
      <PanelHeader>Результат</PanelHeader>
      <Text
        weight="regular"
        style={{
          fontSize: "18px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Огромное спасибо за помощь!!!
      </Text>
    </Panel>
  );
}

export default Thanks;
