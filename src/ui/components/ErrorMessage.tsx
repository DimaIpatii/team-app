import React from "react";

/* Components */
import { initializeIcons } from "@uifabric/icons";
import { MessageBar, MessageBarType } from "@fluentui/react";
initializeIcons();

const ErrorMessage: React.FunctionComponent<{ msg: string }> = ({
  msg,
}): JSX.Element => {
  return (
    <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
      {msg}
    </MessageBar>
  );
};

export default ErrorMessage;
