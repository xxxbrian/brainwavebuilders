import { PingRequest, PingResponse } from "@/apis";

export const ping = async (
  ctx: {},
  { seq }: PingRequest,
): Promise<PingResponse> => {
  return { seq: seq + 1 };
};
