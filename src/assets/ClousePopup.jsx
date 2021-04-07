import React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

const ClousePopup = () => {
  return (
    <>
      {`CLOSE `}
      <Icon
        iconName="Cancel"
        styles={{ root: { lineHeight: 1, marginLeft: 5 } }}
      />
    </>
  );
};

export default ClousePopup;
