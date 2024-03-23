import { Div, NavIdProps, Panel, PanelHeader, Text } from "@vkontakte/vkui";
import { BackgroundWaves, PanelHeaderLogo } from "../components";
import { Icon24ListBulletOutline } from "@vkontakte/icons";

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
            zIndex: 5,
          }}
        />
      </Div>
      <Div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Div
          style={{
            width: "87vw",
          }}
        >
          <Icon24ListBulletOutline
            width={36}
            height={36}
            color="#2BB4D6"
            style={{
              marginLeft: "auto",
            }}
          />
        </Div>
        <Div
          style={{
            border: "solid 1px #2BB4D6",
            borderRadius: "15px",
          }}
        >
          <Text
            style={{
              color: "#2BB4D6",
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            Привет! Не забудь заполнить календарь) Отвечай честно и помни, что
            ты работаешь исключительно на свой результат!
          </Text>
        </Div>
        <Div
          style={{
            display: "flex",
            gap: "21px",
            padding: 0,
          }}
        >
          <Div
            style={{
              padding: 0,
              width: "43%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              ты не куришь:
            </Text>
            <Div
              style={{
                padding: 6,
                marginTop: 5,
                border: "solid 1px #2BB4D6",
                borderRadius: "10px",
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                }}
              >
                1 день 5 часов
              </Text>
            </Div>
          </Div>
          <Div
            style={{
              padding: 0,
              width: "43%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              до цели осталось:
            </Text>
            <Div
              style={{
                padding: 6,
                marginTop: 5,
                border: "solid 1px #2BB4D6",
                borderRadius: "10px",
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                }}
              >
                10 дней 19 часов
              </Text>
            </Div>
          </Div>
        </Div>
      </Div>
    </Panel>
  );
};
