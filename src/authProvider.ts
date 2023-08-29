import { AuthBindings } from '@refinedev/core';
import { authenticateUser } from './services/api';

export const TOKEN_KEY = "auth";

export const authProvider: AuthBindings = {
    login: async ({ email, password }: any) => {
        
        try {
            const response = await authenticateUser (email, password);
                console.log(response.data);
                const user = response.data.data;
                
                //stringify used if setting the value in the local storage and the value is an object or array 
                localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
                return Promise.resolve({
                      success: true,
                      redirectTo: '/projects'
                  });
            }catch(error: any){
                // return Promise.reject({
                //     name: "Login Failed!",
                //     message: "The email or password that you've entered doesn't match any account.",
                // });
                return Promise.resolve({
                  success: false,
                  redirectTo: '/'
              });


            };

       // return Promise.reject(new Error("username: admin, password: admin"));
    },
    logout: (params: any) => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve({
          success: true,
          redirectTo: '/'
          // error?: Error;
          // [key: string]: unknown;
      });
    },
    check: (params: any) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve({
              authenticated: true
              //redirectTo?: string;
              //logout?: boolean;
              //error?: Error;
          });
        }

        //return Promise.reject();
        return Promise.resolve({
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: {
            message: "Check failed",
            name: "Unauthorized",
          },
        });
    },
    onError: async (error) => {
      if (error.status === 401 || error.status === 403) {
          return {
              logout: true,
              redirectTo: "/login",
              error,
          };
      }

      return {};
  },
    getPermissions: () => {
        const auth = localStorage.getItem(TOKEN_KEY);
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.sysUser);
        }
        return Promise.reject();
    },
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 1,
        });
    },
};
