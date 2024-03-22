import { Div, NavIdProps, Panel, PanelHeader } from "@vkontakte/vkui";
import { BackgroundWaves, PanelHeaderLogo } from "../components";

export const Home: React.FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        <PanelHeaderLogo />
      </PanelHeader>
      <Div>
        <BackgroundWaves
          style={{
            position: "absolute",
            top: "0px",
            left: "-38px",
          }}
        />
      </Div>
    </Panel>
  );
};
