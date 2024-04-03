"use client";

import React, { useCallback, useState } from "react";
import ProfileEditing from "@/components/profile/profile_editing";
import { User, isAPIError } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { PageFrame } from "@/components/structural/PageFrame";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const Profile: React.FC = () => {
  const mockPreferences = {
    onClickPreferencesSave: async () => {},
    lang: "",
    onChangeLang: (lang: string) => {
      console.log(lang);
    },
    timezone: "",
    onChangeTimezone: (timezone: string) => {
      console.log(timezone);
    },
    notifications: false,
    onChangeNotifications: (notifications: boolean) => {
      console.log(notifications);
    },
    recommendation: false,
    onChangeRecommendation: (recommendation: boolean) => {
      console.log(recommendation);
    },
  };

  const mockSecurity = {
    onClickSecuritySave: async () => {},
    twoFactorEnabled: false,
    onChangeTwoFactorEnabled: (twoFactorEnabled: boolean) => {
      console.log(twoFactorEnabled);
    },
  };

  const backend = useBackend();

  const user = useCurrentUser()!;
  const [userInfo, setUserInfo] = useState<null | User>(user);

  const onChangeAvatar = useCallback((avatar: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return { ...prev, avatar };
      }
      return null;
    });
  }, []);

  const onChangeFirstName = useCallback((firstName: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return { ...prev, firstName };
      }
      return null;
    });
  }, []);

  const onChangeLastName = useCallback((lastName: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return { ...prev, lastName };
      }
      return null;
    });
  }, []);

  const onChangeTitle = useCallback((title: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return { ...prev, title };
      }
      return null;
    });
  }, []);

  const onChangeGender = useCallback((gender: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return { ...prev, gender };
      }
      return null;
    });
  }, []);

  const onChangeBio = useCallback((bio: string) => {
    setUserInfo((prev) => {
      if (prev) {
        return { ...prev, bio };
      }
      return null;
    });
  }, []);

  const onClickProfileSave = useCallback(async () => {
    try {
      if (!userInfo) return;

      await backend.setUserProfile({
        user: userInfo,
      });
    } catch (e) {
      if (isAPIError(e)) {
        console.error(e);
      }
    }
  }, [backend, userInfo]);

  return (
    <PageFrame title="Settings">
      {userInfo && (
        <ProfileEditing
          onClickProfileSave={onClickProfileSave}
          avatar={userInfo.avatar}
          onChangeAvatar={onChangeAvatar}
          firstName={userInfo.firstName}
          onChangeFirstName={onChangeFirstName}
          lastName={userInfo.lastName}
          onChangeLastName={onChangeLastName}
          title={userInfo.title}
          onChangeTitle={onChangeTitle}
          gender={userInfo.gender}
          onChangeGender={onChangeGender}
          bio={userInfo.bio}
          onChangeBio={onChangeBio}
          onClickPreferenceSave={mockPreferences.onClickPreferencesSave}
          lang={mockPreferences.lang}
          onChangeLang={mockPreferences.onChangeLang}
          timezone={mockPreferences.timezone}
          onChangeTimezone={mockPreferences.onChangeTimezone}
          notification={mockPreferences.notifications}
          onChangeNotification={mockPreferences.onChangeNotifications}
          recommendation={mockPreferences.recommendation}
          onChangeRecommendation={mockPreferences.onChangeRecommendation}
          onClickSecuritySave={mockSecurity.onClickSecuritySave}
          two_factor_auth={mockSecurity.twoFactorEnabled}
          onChangeTwoFactorAuth={mockSecurity.onChangeTwoFactorEnabled}
        />
      )}
    </PageFrame>
  );
};

export default Profile;
