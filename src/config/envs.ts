const env = import.meta.env;
type Config = {
  isDev: boolean;
};

export const CONFIG: Config = {
  isDev: env.MODE === 'development' ? true : false,
};
