import React from "react";

/* Components */
import { initializeIcons } from "@uifabric/icons";
import { MessageBar, MessageBarType } from "@fluentui/react";
initializeIcons();

const InfoMessage: React.FunctionComponent<{ msg: string }> = ({
  msg,
}): JSX.Element => {
  return <MessageBar messageBarType={MessageBarType.info}>{msg}</MessageBar>;
};

export default InfoMessage;
