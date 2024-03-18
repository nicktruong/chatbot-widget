import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import { StorageKeys } from "./constants";

export const useClientId = () => {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem(StorageKeys.ID) ?? "";
    if (id) {
      setClientId(id);
      return;
    }

    setClientId(StorageKeys.ID);
    localStorage.setItem(StorageKeys.ID, uuidv4());
  }, []);

  return clientId;
};
