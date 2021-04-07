import React from "react";

/* Components */
import { initializeIcons } from "@uifabric/icons";
import { MessageBar, MessageBarType } from "@fluentui/react";
initializeIcons();

function InfoMessage({ msg }) {
  return <MessageBar MessageBarType={MessageBarType.info}>{msg}</MessageBar>;
}

export default InfoMessage;
