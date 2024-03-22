import { useState, useEffect, ReactNode } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Persik, Home } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { Welcome } from "./panels/Welcome";
import { Registration } from "./panels/Registration";

export const App = () => {
  // const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
  //   useActiveVkuiLocation();
  const [activePanel, setPanel] =
    useState<(typeof DEFAULT_VIEW_PANELS)[keyof typeof DEFAULT_VIEW_PANELS]>(
      "welcome"
    );
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(
    // <ScreenSpinner size="large" />
    null
  );

  useEffect(() => {
    setTimeout(() => {
      setPanel("registration");
    }, 800);
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View
          activePanel={activePanel}
          style={{
            overflow: "hidden",
          }}
        >
          <Welcome id="welcome" />
          <Registration id="registration" setPanel={setPanel} />
          <Home id="home" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
