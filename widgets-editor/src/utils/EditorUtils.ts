import WidgetBuilderRegistry from "./WidgetRegistry";
import PropertyControlRegistry from "./PropertyControlRegistry";
import moment from "moment-timezone";

export const editorInitializer = async () => {
  WidgetBuilderRegistry.registerWidgetBuilders();
  PropertyControlRegistry.registerPropertyControlBuilders();

  moment.tz.setDefault(moment.tz.guess());
};
