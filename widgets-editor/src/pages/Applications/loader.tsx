import React from "react";
import PageLoadingBar from "pages/common/PageLoadingBar";
import { retryPromise } from "utils/AppsmithUtils";
import AnalyticsUtil from "utils/AnalyticsUtil";
import moduleDefault from "./index";

class ApplicationListLoader extends React.PureComponent<any, { Page: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      Page: null,
    };
  }

  componentDidMount() {
    AnalyticsUtil.logEvent("APPLICATIONS_PAGE_LOAD");
    this.setState({ Page: moduleDefault });
  }

  render() {
    const { Page } = this.state;

    return Page ? <Page {...this.props} /> : <PageLoadingBar />;
  }
}

export default ApplicationListLoader;
