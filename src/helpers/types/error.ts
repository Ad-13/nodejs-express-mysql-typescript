export type TError = { error: string };

export type CustomErrorContent = {
  message: string;
  context?: { [key: string]: any };
};
