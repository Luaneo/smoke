import { useEffect, useState } from "react";
import { Button, Text, Panel, PanelHeader } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

function Intro({ user, setActivePanel, setGroups }) {
  return (
    <Panel className="Intro">
      <PanelHeader>Опросник v2 </PanelHeader>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
        <Button
          stretched
          size="l"
          style={{

          }}
          onClick={async (e) => {
            e.preventDefault();

            let token = null;

            // Получение пользовательского access_token
            bridge
              .send("VKWebAppGetAuthToken", {
                app_id: 51791983,
                scope: "groups,stats",
              })
              .then((data) => {
                if (data.access_token) {
                  // Токен получен - получаем подписки
                  debugger;
                  bridge
                    .send("VKWebAppCallAPIMethod", {
                      method: "users.getSubscriptions",
                      params: {
                        user_ids: user.id,
                        v: "5.131",
                        access_token: data.access_token,
                      },
                    })
                    .then((data) => {
                      if (data.response) {
                        // Метод API выполнен
                        setActivePanel("survey");
                        console.log(data.response);
                        setGroups(data.response);
                      }
                    })
                    .catch((error) => {
                      // Ошибка
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                // Ошибка
                console.log(error);
              });

            // TODO: сохранить данные в БД
          }}
        >
          Помочь Ване и Юле
        </Button>
      </div>
    </Panel>
  );
}

export default Intro;
