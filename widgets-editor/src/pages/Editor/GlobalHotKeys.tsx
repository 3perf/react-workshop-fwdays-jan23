import React from "react";

type Props = {
  copySelectedWidget: () => void;
  pasteCopiedWidget: () => void;
  deleteSelectedWidget: () => void;
  cutSelectedWidget: () => void;
  toggleShowGlobalSearchModal: () => void;
  selectedWidget?: string;
  children: React.ReactNode;
};

class GlobalHotKeys extends React.Component<Props> {
  render() {
    // IA: removed to facilitate a React update
    return <div>{this.props.children}</div>;
  }
}

export default GlobalHotKeys;
