import { IRoute } from "./config";

import React from "react";

export const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        redirect: '/pokemons',
        fallback: <div> Loading... </div>
    },
    {
        path: '/home',
        component: lazy(() => import('../components/Home')),
        exact: false,
        private: false,
        fallback: <div> Loading... </div>,
        routes: [
          {
            path: '/home/signup',
            component: lazy(() => import('../components/Signup')),
            exact: false,
            private: false,
            fallback: <div> Loading... </div>
          },
          {
            path: '/home/login',
            component: lazy(() => import('../components/Login')),
            exact: false,
            private: false,
            fallback: <div> Loading... </div>
          }
        ]
      }
]