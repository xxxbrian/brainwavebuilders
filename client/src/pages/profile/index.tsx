import React, { useCallback, useEffect, useState } from "react";
import ProfileEditing from "@/components/profile/profile_editing";
import SideNav from "../../components/structural/SideNav";
import { User, isAPIError } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { PageFrame } from "@/components/structural/PageFrame";

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
  const [userInfo, setUserInfo] = useState<null | User>(null);

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const inner = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    };

    void inner();
  }, []);

  useEffect(() => {
    console.log(token);
    if (!token) {
      return;
    }
    const inner = async () => {
      const { user } = await backend.getUserInfo({
        token: token ?? "",
      });
      setUserInfo(user);
    };

    void inner();
  }, [backend, token]);

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
    if (userInfo && token) {
      try {
        await backend.setUserProfile({
          user: userInfo,
          token,
        });
      } catch (e) {
        if (isAPIError(e)) {
          console.error(e);
        }
      }
    }
  }, [backend, token, userInfo]);

  return (
    <PageFrame title="Edit Profile">
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
