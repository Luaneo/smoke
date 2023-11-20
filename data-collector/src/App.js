import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Intro from "./panels/Intro.js";
import Survey from "./panels/Survey.js";
import Thanks from "./panels/Thanks.js";

const App = () => {
  const [activePanel, setActivePanel] = useState("intro");
  const [fetchedUser, setUser] = useState(null);
  const [groups, setGroups] = useState(null);
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      console.log(user);
    }
    fetchData();
  }, []);

  useEffect(async () => {
    if (groups && survey) {
      fetch("https://smoke-server2.smoke-ai.ru/post/groups_and_interests", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: fetchedUser.id,
          groups: JSON.stringify(groups),
          interests: JSON.stringify(survey),
        }),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });

    }
  }, [groups, survey]);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Intro
                  id="intro"
                  user={fetchedUser}
                  setActivePanel={setActivePanel}
                  setGroups={setGroups}
                />
                <Survey
                  id="survey"
                  setActivePanel={setActivePanel}
                  setSurvey={setSurvey}
                />
                <Thanks id="thanks" />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
