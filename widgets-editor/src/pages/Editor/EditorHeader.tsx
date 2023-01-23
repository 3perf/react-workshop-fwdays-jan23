import React from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  ApplicationPayload,
  ReduxActionTypes,
} from "constants/ReduxActionConstants";
import { getApplicationViewerPageURL } from "constants/routes";
import AppInviteUsersForm from "pages/organization/AppInviteUsersForm";
import StyledHeader from "components/designSystems/appsmith/StyledHeader";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { FormDialogComponent } from "components/editorComponents/form/FormDialogComponent";
import AppsmithLogo from "assets/images/appsmith_logo_square.png";
import { Link } from "react-router-dom";
import { AppState } from "reducers";
import {
  getCurrentApplicationId,
  getCurrentPageId,
  getIsPageSaving,
  getIsPublishingApplication,
  getPageSavingError,
} from "selectors/editorSelectors";
import { getCurrentOrgId } from "selectors/organizationSelectors";
import { connect, useDispatch, useSelector } from "react-redux";
import { HeaderIcons } from "icons/HeaderIcons";
import ThreeDotLoading from "components/designSystems/appsmith/header/ThreeDotsLoading";
import DeployLinkButtonDialog from "components/designSystems/appsmith/header/DeployLinkButton";
import { EditInteractionKind, SavingState } from "components/ads/EditableText";
import { updateApplication } from "actions/applicationActions";
import {
  getApplicationList,
  getIsSavingAppName,
} from "selectors/applicationSelectors";
import EditableAppName from "./EditableAppName";
import Boxed from "components/editorComponents/Onboarding/Boxed";
import OnboardingHelper from "components/editorComponents/Onboarding/Helper";
import { OnboardingStep } from "constants/OnboardingConstants";
import GlobalSearch from "components/editorComponents/GlobalSearch";
import EndOnboardingTour from "components/editorComponents/Onboarding/EndTour";
import ProfileDropdown from "pages/common/ProfileDropdown";
import { getCurrentUser } from "selectors/usersSelectors";
import { ANONYMOUS_USERNAME } from "constants/userConstants";
import Button, { Size } from "components/ads/Button";
import { IconWrapper } from "components/ads/Icon";
import { Profile } from "pages/common/ProfileImage";
import { getTypographyByKey } from "constants/DefaultTheme";
import HelpBar from "components/editorComponents/GlobalSearch/HelpBar";
import HelpButton from "./HelpButton";
import OnboardingIndicator from "components/editorComponents/Onboarding/Indicator";
import { getThemeDetails, ThemeMode } from "selectors/themeSelectors";
import { useStore } from "react-redux";

const HeaderWrapper = styled(StyledHeader)`
  width: 100%;
  padding-right: 0;
  padding-left: ${(props) => props.theme.spaces[7]}px;
  background-color: ${(props) => props.theme.colors.header.background};
  height: ${(props) => props.theme.smallHeaderHeight};
  flex-direction: row;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  & .editable-application-name {
    ${(props) => getTypographyByKey(props, "h4")}
    color: ${(props) => props.theme.colors.header.appName};
  }

  & .header__application-share-btn {
    background-color: ${(props) => props.theme.colors.header.background};
    border-color: ${(props) => props.theme.colors.header.background};
    // margin-right: ${(props) => props.theme.spaces[1]}px;margin-right
  }

  & .header__application-share-btn:hover {
    color: ${(props) => props.theme.colors.header.shareBtnHighlight};
    ${IconWrapper} path {
      fill: ${(props) => props.theme.colors.header.shareBtnHighlight};
    }
  }

  & ${Profile} {
    width: 24px;
    height: 24px;
  }
`;

// looks offset by 1px even though, checking bounding rect values
const HeaderSection = styled.div`
  position: relative;
  top: -1px;
  display: flex;
  flex: 1;
  overflow: hidden;
  align-items: center;
  :nth-child(1) {
    justify-content: flex-start;
  }
  :nth-child(2) {
    justify-content: center;
  }
  :nth-child(3) {
    justify-content: flex-end;
  }
`;

const AppsmithLogoImg = styled.img`
  margin-right: ${(props) => props.theme.spaces[6]}px;
  height: 24px;
`;

const SaveStatusContainer = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeploySection = styled.div`
  display: flex;
`;

const ProfileDropdownContainer = styled.div`
  margin: 0 ${(props) => props.theme.spaces[7]}px;
`;

const StyledDeployButton = styled(Button)`
  height: ${(props) => props.theme.smallHeaderHeight};
  ${(props) => getTypographyByKey(props, "btnLarge")}
  padding: ${(props) => props.theme.spaces[2]}px;
`;

export const EditorHeader = () => {
  const isSaving = useSelector(getIsPageSaving);
  const pageSaveError = useSelector(getPageSavingError);
  const orgId = useSelector(getCurrentOrgId); // ←
  // const applicationId = useSelector(getCurrentApplicationId); // ←
  // why am I selecting this during the render time, if I only need this much later, when the callback is called?
  //
  const currentApplication = useSelector(
    (state: AppState) => state.ui.applications.currentApplication,
  ); // ←
  const isPublishing = useSelector(getIsPublishingApplication);
  const pageId = useSelector(getCurrentPageId);
  const isSavingName = useSelector(getIsSavingAppName);
  const isNewApp = useSelector((state: AppState) => {
    const applicationList = getApplicationList(state);
    const applicationId = getCurrentApplicationId(state);
    return applicationList.filter((el) => el.id === applicationId).length > 0;
  });
  const user = useSelector(getCurrentUser); // ←
  const darkTheme = useSelector((state: AppState) =>
    getThemeDetails(state, ThemeMode.DARK),
  );
  const store = useStore();

  const dispatch = useDispatch();
  const publishApplication = (applicationId: string) => {
    dispatch({
      type: ReduxActionTypes.PUBLISH_APPLICATION_INIT,
      payload: {
        applicationId,
      },
    });
  };

  const handlePublish = () => {
    const applicationId = getCurrentApplicationId(store.getState());
    if (applicationId) {
      publishApplication(applicationId);

      const appName = currentApplication ? currentApplication.name : "";
      AnalyticsUtil.logEvent("PUBLISH_APP", {
        appId: applicationId,
        appName,
      });
    }
  };

  let saveStatusIcon: React.ReactNode;
  if (isSaving) {
    saveStatusIcon = <ThreeDotLoading className="t--save-status-is-saving" />;
  } else {
    if (!pageSaveError) {
      saveStatusIcon = (
        <HeaderIcons.SAVE_SUCCESS
          color={"#36AB80"}
          height={20}
          width={20}
          className="t--save-status-success"
        />
      );
    } else {
      saveStatusIcon = (
        <HeaderIcons.SAVE_FAILURE
          color={"#F69D2C"}
          height={20}
          width={20}
          className={"t--save-status-error"}
        />
      );
    }
  }

  const updateApplicationDispatch = (
    id: string,
    data: { name: string; currentApp: boolean },
  ) => {
    dispatch(updateApplication(id, data));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <HeaderWrapper>
        <HeaderSection>
          <span style={{ height: 24 }}>
            <AppsmithLogoImg
              src={AppsmithLogo}
              alt="Appsmith logo"
              className="t--appsmith-logo"
            />
          </span>
          <Boxed step={OnboardingStep.FINISH}>
            {currentApplication && (
              <EditableAppName
                defaultValue={currentApplication.name || ""}
                editInteractionKind={EditInteractionKind.SINGLE}
                className="t--application-name editable-application-name"
                fill={true}
                savingState={
                  isSavingName ? SavingState.STARTED : SavingState.NOT_STARTED
                }
                isNewApp={isNewApp}
                onBlur={(value: string) => {
                  const applicationId = getCurrentApplicationId(
                    store.getState(),
                  );
                  return updateApplicationDispatch(applicationId || "", {
                    name: value,
                    currentApp: true,
                  });
                }}
              />
            )}
          </Boxed>
        </HeaderSection>
        <HeaderSection>
          <HelpBar />
          <HelpButton />
        </HeaderSection>
        <HeaderSection>
          <Boxed step={OnboardingStep.FINISH}>
            <SaveStatusContainer className={"t--save-status-container"}>
              {saveStatusIcon}
            </SaveStatusContainer>
            <FormDialogComponent
              trigger={
                <Button
                  text={"Share"}
                  icon={"share"}
                  size={Size.small}
                  className="t--application-share-btn header__application-share-btn"
                />
              }
              canOutsideClickClose={true}
              Form={AppInviteUsersForm}
              orgId={orgId}
              applicationId={applicationId}
              title={
                currentApplication
                  ? currentApplication.name
                  : "Share Application"
              }
            />
          </Boxed>
          <Boxed
            step={OnboardingStep.DEPLOY}
            alternative={<EndOnboardingTour />}
          >
            <DeploySection>
              <OnboardingIndicator
                step={OnboardingStep.DEPLOY}
                hasButton={false}
                width={75}
              >
                <StyledDeployButton
                  fill
                  onClick={handlePublish}
                  text={"Deploy"}
                  isLoading={isPublishing}
                  size={Size.small}
                  className="t--application-publish-btn"
                />
              </OnboardingIndicator>

              <DeployLinkButtonDialog
                trigger={
                  <StyledDeployButton icon={"downArrow"} size={Size.xxs} />
                }
                link={getApplicationViewerPageURL(applicationId, pageId)}
              />
            </DeploySection>
          </Boxed>
          {user && user.username !== ANONYMOUS_USERNAME && (
            <ProfileDropdownContainer>
              <ProfileDropdown
                userName={user?.username || ""}
                hideThemeSwitch
                name={user.name}
              />
            </ProfileDropdownContainer>
          )}
        </HeaderSection>
        <OnboardingHelper />
        <GlobalSearch />
      </HeaderWrapper>
    </ThemeProvider>
  );
};

export default EditorHeader;
