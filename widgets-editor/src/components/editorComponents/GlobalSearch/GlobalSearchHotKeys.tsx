import React from "react";
import { SearchItem } from "./utils";

type Props = {
  modalOpen: boolean;
  toggleShow: () => void;
  handleUpKey: () => void;
  handleDownKey: () => void;
  handleItemLinkClick: (item?: SearchItem, source?: string) => void;
  children: React.ReactNode;
};
class GlobalSearchHotKeys extends React.Component<Props> {
  render() {
    // IA: removed to facilitate a React update
    return <div>{this.props.children}</div>;
  }
}

export default GlobalSearchHotKeys;
