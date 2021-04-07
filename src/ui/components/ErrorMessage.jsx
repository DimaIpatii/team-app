import React from "react";

/* Components */
import { initializeIcons } from "@uifabric/icons";
import { MessageBar, MessageBarType } from "@fluentui/react";
initializeIcons();

const ErrorMessage = ({ msg }) => {
  return (
    <MessageBar
      messageBarType={MessageBarType.error}
      onDismiss={false}
      dismissButtonAriaLabel="Close"
      isMultiline={true}
    >
      {msg}
    </MessageBar>
  );
};

export default ErrorMessage;
