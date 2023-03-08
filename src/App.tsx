import React from "react";

import { Refine, GitHubBanner } from "@pankod/refine-core";
import {
  NotificationsProvider,
  notificationProvider,
  MantineProvider,
  Global,
  Layout,
  ReadyPage,
  ErrorComponent,
  useLocalStorage,
  ColorSchemeProvider,
  ColorScheme,
  DarkTheme,
  LightTheme,
  AuthPage,
} from "@pankod/refine-mantine";

import dataProvider from "@pankod/refine-simple-rest";
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { Header } from "components/layout";
import { OffLayoutArea } from "components/offLayoutArea";
import { authProvider } from "./authProvider";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const { t, i18n } = useTranslation();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      <GitHubBanner />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={colorScheme === "dark" ? DarkTheme : LightTheme}
          withNormalizeCSS
          withGlobalStyles
        >
          <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
          <NotificationsProvider position="top-right">
            <RefineKbarProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                  {
                    name: "posts",
                    list: MantineInferencer,
                    edit: MantineInferencer,
                    show: MantineInferencer,
                    create: MantineInferencer,
                    canDelete: true,
                  },
                ]}
                routerProvider={routerProvider}
                authProvider={authProvider}
                LoginPage={AuthPage}
                i18nProvider={i18nProvider}
                Header={Header}
                OffLayoutArea={OffLayoutArea}
              />
            </RefineKbarProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
