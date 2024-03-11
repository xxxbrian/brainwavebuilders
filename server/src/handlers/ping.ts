import { PingRequest, PingResponse } from "@/apis";

export const ping = async ({ seq }: PingRequest): Promise<PingResponse> => {
  return { seq: seq + 1 };
};
