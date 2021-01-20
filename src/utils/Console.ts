const isProduction = process.env.NODE_ENV === "production";

export const Console = {
  log: (s: any) => {
    !isProduction && console.log(s);
  },
};
