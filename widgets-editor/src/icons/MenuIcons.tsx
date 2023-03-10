import React from "react";
import { IconProps, IconWrapper } from "constants/IconConstants";
import WidgetsIcon from "assets/icons/menu/widgets.svg";
import ApisIcon from "assets/icons/menu/api.svg";
import OrgIcon from "assets/icons/menu/org.svg";
import PagesIcon from "assets/icons/menu/pages.svg";
import PageIcon from "assets/icons/menu/page.svg";
import DataSourcesIcon from "assets/icons/menu/data-sources.svg";
import QueriesIcon from "assets/icons/menu/queries.svg";
import HomepageIcon from "assets/icons/menu/homepage.svg";
import ExplorerIcon from "assets/icons/menu/explorer.svg";
import ApisColoredIcon from "assets/icons/menu/api-colored.svg";
import DataSourcesColoredIcon from "assets/icons/menu/datasource-colored.svg";
import DatasourceTableIcon from "assets/icons/menu/datasource-table.svg";
import PrimaryKeyIcon from "assets/icons/menu/primary-key.svg";
import ForeignKeyIcon from "assets/icons/menu/foreign-key.svg";
import DatasourceColumnIcon from "assets/icons/menu/datasource-column.svg";
import WidgetsColoredIcon from "assets/icons/menu/widgets-colored.svg";
import { Icon } from "@blueprintjs/core";
/* eslint-disable react/display-name */

export const MenuIcons: {
  //TODO(abhinav): Fix this type to JSXElementConstructor<IconProps>
  // eslint-disable-next-line @typescript-eslint/ban-types
  [id: string]: Function;
} = {
  WIDGETS_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <WidgetsIcon />
    </IconWrapper>
  ),
  APIS_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <ApisIcon />
    </IconWrapper>
  ),
  ORG_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <OrgIcon />
    </IconWrapper>
  ),
  PAGES_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <PagesIcon />
    </IconWrapper>
  ),
  PAGE_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <PageIcon />
    </IconWrapper>
  ),
  DATASOURCES_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <DataSourcesIcon />
    </IconWrapper>
  ),
  QUERIES_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <QueriesIcon />
    </IconWrapper>
  ),
  HOMEPAGE_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <HomepageIcon />
    </IconWrapper>
  ),
  EXPLORER_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <ExplorerIcon />
    </IconWrapper>
  ),
  DOCS_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <Icon icon="help"></Icon>
    </IconWrapper>
  ),
  WIDGETS_COLORED_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <WidgetsColoredIcon />
    </IconWrapper>
  ),
  APIS_COLORED_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <ApisColoredIcon />
    </IconWrapper>
  ),
  DATASOURCES_COLORED_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <DataSourcesColoredIcon />
    </IconWrapper>
  ),
  DATASOURCES_TABLE_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <DatasourceTableIcon />
    </IconWrapper>
  ),
  PRIMARY_KEY_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <PrimaryKeyIcon />
    </IconWrapper>
  ),
  FOREIGN_KEY_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <ForeignKeyIcon />
    </IconWrapper>
  ),
  DATASOURCE_COLUMN_ICON: (props: IconProps) => (
    <IconWrapper {...props}>
      <DatasourceColumnIcon />
    </IconWrapper>
  ),
};
