import { useBackend } from "@/hooks/useBackend";
import React, { useCallback } from "react";

export default function Home() {
  const backend = useBackend();
  const onClickTest = useCallback(async () => {
    const { seq } = await backend.ping({
      seq: 1,
    });
    console.log(seq);
  }, [backend]);

  return (
    <>
      <div>Test Page</div>
      <button onClick={onClickTest}>Test</button>
    </>
  );
}
