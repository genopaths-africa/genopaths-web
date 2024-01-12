import React from "react";

import { Refine, 
  Authenticated, 
  NotificationProvider
} from "@refinedev/core";

import {
  notificationProvider,
  ErrorComponent,
  AuthPage,
  // ThemedLayoutV2,
  RefineThemes
} from "@refinedev/mantine";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ColorSchemeProvider } from "@mantine/styles";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global, ColorScheme } from "@mantine/core";
import { dataProvider } from "./rest-data-provider";
import { MantineInferencer } from "@refinedev/inferencer/mantine";
// import routerProvider from "@refinedev/react-router-v6/legacy";
import routerProvider, { CatchAllNavigate, NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { RefineKbarProvider } from "@refinedev/kbar";
import { Header } from "components/layout";
import { OffLayoutArea } from "components/offLayoutArea";
import { authProvider } from "./authProvider";
import { ProjectList, ProjectCreate, ProjectEdit, ProjectAnalysis } from "pages/projects";
import { ParameterList, ParameterCreate, ParameterEdit, ParameterRules } from "pages/parameters";
import { DataList } from "pages/data";
import { HeroText } from 'pages/landing/index';
import { ThemedLayoutV2 } from 'components/themedLayout';

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

  return <>
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        //theme={colorScheme === "dark" ? DarkTheme : LightTheme}
        // theme={RefineThemes.Green}
        theme={{
          colorScheme: "light",
          primaryColor: "green",
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
        <NotificationsProvider position="top-right">
          <RefineKbarProvider>
            <BrowserRouter>
              <Refine
                dataProvider={{
                  default: dataProvider(process.env.REACT_APP_API_BASE_URL + ""),
                  baseEndPoi: dataProvider(process.env.REACT_APP_API_BASE_URL + "/schools"),
                }}
                notificationProvider={notificationProvider}
                resources={[
                  // {
                  //   name: "posts",
                  //   list: MantineInferencer,
                  //   edit: MantineInferencer,
                  //   show: MantineInferencer,
                  //   create: MantineInferencer,
                  //   canDelete: true,
                  // },
                  // {
                  //   name: "projects",
                  //   list: ProjectList,
                  //   edit: ProjectEdit,
                  //   //show: MantineInferencer,
                  //   create: ProjectCreate,
                  //   canDelete: true,
                  //   options: {
                  //     title: 'Projects'
                  //   }
                  // },
                  {
                    name: "projects",
                    identifier: "projects",
                    list: "/projects",
                    edit: "/projects/edit/:id",
                    create: "projects/create",
                    options: {
                      canCreate: true,
                      canDelete: true,
                      canEdit: true,
                    },
                    meta: {
                      label: "Projects",
                    }
                  },
                  {
                    name: "data",
                    identifier: "data",
                    list: '/projects/:projectId/data',
                    options: {
                      hide: true
                    },
                    meta: {
                      label: "Data",
                    }
                  },
                  {
                    name: "parameters",
                    identifier: "parameters",
                    list: '/projects/:projectId/parameters',
                    edit: '/projects/:projectId/parameters/edit/:id',
                    create: 'projects/:projectId/parameters/create',
                    options: {
                      hide: true,
                      title: 'Parameters',
                      canCreate: true,
                      canDelete: true,
                      canEdit: true,
                    },
                    meta: {
                      label: "Parameters",
                    }
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
                //routerProvider={routerBindings}
                routerProvider={routerProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
              >

                <Routes>
                  <Route
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                        index
                        element={
                            <NavigateToResource resource="projects" />
                        }
                    />
                    <Route
                        index
                        element={
                            <NavigateToResource resource="parameters" />
                        }
                    />

                    <Route path="projects">
                      <Route index element={<ProjectList />} />
                      <Route path="create" element={<ProjectCreate />} />
                      <Route path="edit/:id" element={<ProjectEdit />} />
                      <Route path="analysis/:id" element={<ProjectAnalysis />} />
                    </Route>
                    <Route path="projects/:projectId/parameters">
                      <Route index element={<ParameterList />} />
                      <Route path="create" element={<ParameterCreate />} />
                      <Route path="edit/:id" element={<ParameterEdit />} />
                      <Route path="rules" element={<ParameterRules />} />
                    </Route>
                    <Route path="projects/:projectId/analysis">
                      <Route index element={<ProjectAnalysis />} />
                    </Route>
                    <Route path="projects/:projectId/data">
                      <Route index element={<DataList />} />
                    </Route>
                  </Route>

                  <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={<AuthPage
                        wrapperProps={{
                          style: {
                            //background: "rgb(0,153,125)",
                            background: "radial-gradient(circle, rgba(0,153,125,1) 0%, rgba(4,4,4,1) 100%)",
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            left: "0px",
                          }
                        }}
                        renderContent={(content: React.ReactNode) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <h1 style={{ color: '#ffffff' }}>GenoPaths</h1>
                              {content}
                              <h4 style={{ color: '#ffffff' }}>&copy; {(new Date()).getFullYear()} GenoPaths Africa </h4>
                            </div>
                          );
                        }}

                        providers={[
                          {
                            name: "github",
                            icon: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
                              </svg>
                            ),
                            label: "Sign in with GitHub",
                          },
                          {
                            name: "google",
                            icon: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#4285F4"
                                  d="m23.7 12.3-.1-2.3H12.3v4.5h6.4a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8Z"
                                />
                                <path
                                  fill="#34A853"
                                  d="M12.3 24c3.2 0 6-1 7.9-3l-3.9-3a7.2 7.2 0 0 1-10.8-3.7h-4v3c2 4 6 6.7 10.8 6.7Z"
                                />
                                <path
                                  fill="#FBBC05"
                                  d="M5.5 14.3a7 7 0 0 1 0-4.6v-3h-4a11.9 11.9 0 0 0 0 10.7l4-3.1Z"
                                />
                                <path
                                  fill="#EA4335"
                                  d="M12.3 4.8c1.7 0 3.3.6 4.6 1.8L20.3 3A12 12 0 0 0 1.6 6.6l4 3.1c.9-2.8 3.5-5 6.7-5Z"
                                />
                              </svg>
                            ),
                            label: "Sign in with Google",
                          },
                          {
                            name: "shibboleth",
                            icon: (
                              <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" width="24px" height="24px" stroke="#ffffff">

                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                <g id="SVGRepo_iconCarrier"> <path id="single--sign-on_1_" d="M31,31.36H1v-0.72h30V31.36z M31,24.36H1c-0.199,0-0.36-0.161-0.36-0.36V1 c0-0.199,0.161-0.36,0.36-0.36h30c0.199,0,0.36,0.161,0.36,0.36v23C31.36,24.199,31.199,24.36,31,24.36z M1.36,23.64h29.28V1.36 H1.36V23.64z M8.664,16.164c-0.672,0-1.234-0.128-1.687-0.385s-0.842-0.6-1.169-1.029l0.798-0.644 c0.28,0.355,0.593,0.628,0.938,0.819c0.345,0.191,0.747,0.287,1.204,0.287c0.476,0,0.847-0.103,1.113-0.308 c0.266-0.206,0.399-0.495,0.399-0.868c0-0.28-0.091-0.52-0.273-0.721C9.805,13.114,9.476,12.977,9,12.901l-0.574-0.084 C8.09,12.771,7.782,12.698,7.502,12.6c-0.28-0.098-0.525-0.229-0.735-0.392s-0.374-0.366-0.49-0.609 c-0.117-0.243-0.175-0.532-0.175-0.868c0-0.354,0.065-0.665,0.196-0.931c0.13-0.266,0.31-0.488,0.539-0.665s0.501-0.311,0.819-0.399 c0.317-0.089,0.658-0.133,1.022-0.133c0.588,0,1.08,0.103,1.477,0.308c0.396,0.206,0.744,0.49,1.043,0.854l-0.742,0.672 c-0.159-0.224-0.392-0.427-0.7-0.609C9.448,9.646,9.061,9.556,8.594,9.556s-0.819,0.1-1.057,0.3 C7.299,10.057,7.18,10.33,7.18,10.675c0,0.354,0.119,0.611,0.357,0.77c0.238,0.159,0.581,0.275,1.029,0.35l0.56,0.084 c0.803,0.122,1.372,0.353,1.708,0.693c0.336,0.341,0.504,0.786,0.504,1.337c0,0.7-0.238,1.251-0.714,1.652 C10.148,15.963,9.494,16.164,8.664,16.164z M15.397,16.164c-0.672,0-1.234-0.128-1.687-0.385s-0.842-0.6-1.169-1.029l0.798-0.644 c0.28,0.355,0.593,0.628,0.938,0.819c0.345,0.191,0.747,0.287,1.204,0.287c0.476,0,0.847-0.103,1.113-0.308 c0.266-0.206,0.399-0.495,0.399-0.868c0-0.28-0.091-0.52-0.273-0.721c-0.182-0.201-0.511-0.338-0.987-0.413l-0.574-0.084 c-0.336-0.046-0.644-0.119-0.924-0.217s-0.525-0.229-0.735-0.392s-0.374-0.366-0.49-0.609c-0.117-0.243-0.175-0.532-0.175-0.868 c0-0.354,0.065-0.665,0.196-0.931c0.13-0.266,0.31-0.488,0.539-0.665c0.229-0.177,0.501-0.311,0.819-0.399 c0.317-0.089,0.658-0.133,1.022-0.133c0.588,0,1.08,0.103,1.477,0.308c0.396,0.206,0.744,0.49,1.043,0.854l-0.742,0.672 c-0.158-0.224-0.392-0.427-0.7-0.609s-0.695-0.273-1.162-0.273s-0.819,0.101-1.057,0.301c-0.238,0.201-0.357,0.474-0.357,0.819 c0,0.354,0.119,0.611,0.357,0.77s0.581,0.275,1.029,0.35l0.56,0.084c0.803,0.122,1.372,0.353,1.708,0.693 c0.337,0.341,0.505,0.786,0.505,1.337c0,0.7-0.238,1.251-0.715,1.652C16.882,15.963,16.228,16.164,15.397,16.164z M22.775,16.164 c-0.485,0-0.929-0.089-1.33-0.266s-0.744-0.432-1.028-0.763c-0.285-0.332-0.507-0.728-0.665-1.19 c-0.159-0.462-0.238-0.982-0.238-1.561c0-0.569,0.079-1.087,0.238-1.554c0.158-0.467,0.38-0.866,0.665-1.197 c0.284-0.332,0.627-0.586,1.028-0.763s0.845-0.266,1.33-0.266s0.927,0.089,1.323,0.266s0.739,0.432,1.029,0.763 c0.289,0.331,0.513,0.73,0.672,1.197c0.158,0.467,0.238,0.985,0.238,1.554c0,0.579-0.08,1.099-0.238,1.561 c-0.159,0.462-0.383,0.858-0.672,1.19c-0.29,0.331-0.633,0.585-1.029,0.763C23.702,16.076,23.261,16.164,22.775,16.164z M22.775,15.169c0.606,0,1.102-0.187,1.484-0.56c0.383-0.373,0.574-0.942,0.574-1.708v-1.036c0-0.765-0.191-1.334-0.574-1.708 s-0.878-0.56-1.484-0.56s-1.102,0.187-1.483,0.56c-0.383,0.374-0.574,0.943-0.574,1.708v1.036c0,0.766,0.191,1.335,0.574,1.708 C21.674,14.983,22.169,15.169,22.775,15.169z" />
                                  <rect id="_Transparent_Rectangle" style={{ "fill": "none" }} width="32" height="32" /> </g>

                              </svg>
                            ),
                            label: "Sign in with your institution credentials",
                          },
                        ]}

                      />}
                    />
                  </Route>
                  <Route path="/" element={<HeroText />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>

                <UnsavedChangesNotifier />
              </Refine>
            </BrowserRouter>
          </RefineKbarProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  </>;
}

export default App;
