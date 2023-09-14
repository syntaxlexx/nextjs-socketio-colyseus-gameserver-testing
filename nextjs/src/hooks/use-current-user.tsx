import { getCookie } from "cookies-next";

export const useCurrentUser = () => {
  const username = getCookie("username");

  return {
    username,
  };
};
