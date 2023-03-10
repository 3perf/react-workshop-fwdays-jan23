import WidgetBuilderRegistry from "./WidgetRegistry";
import PropertyControlRegistry from "./PropertyControlRegistry";

export const editorInitializer = async () => {
  WidgetBuilderRegistry.registerWidgetBuilders();
  PropertyControlRegistry.registerPropertyControlBuilders();

  const moment = (await import("moment-timezone")).default;
  moment.tz.setDefault(moment.tz.guess());
};
