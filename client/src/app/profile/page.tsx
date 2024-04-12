"use client";

import React, { useCallback, useEffect, useState } from "react";
import { User, isAPIError } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { PageFrame } from "@/components/structural/PageFrame";

import { Text, Tabs, Switch } from "@radix-ui/themes";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import ErrorDialog from "@/components/ErrDialog";

type PasswordInputFormProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const PasswordInputForm = ({
  id,
  label,
  value,
  onChange,
}: PasswordInputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-xl font-medium">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-11 text-3xl text-gray-400"
      >
        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
      </button>
    </div>
  );
};

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
  useEffect(() => {
    const inner = async () => {
      const { user } = await backend.getUserInfo({});
      setUserInfo(user);
    };

    void inner();
  }, [backend]);

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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const onChangePassword = useCallback((password: string) => {
  //   setCurrentPassword(password);
  // }, []);

  // const onChangeNewPassword = useCallback((newPassword: string) => {
  //   setNewPassword(newPassword);
  // }, []);

  // const onChangeConfirmPassword = useCallback((confirmPassword: string) => {
  //   setConfirmPassword(confirmPassword);
  // }, []);

  ////////////////////////////////
  // Component (this is a workaround, maybe steve can refactor this)

  // alert dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        // setAvatar(e.target!.result as string);
        onChangeAvatar(e.target!.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const textInputForm = (
    id: string,
    label: string,
    value: string | undefined,
    onChange: (value: string) => void,
    type: React.HTMLInputTypeAttribute = "text",
  ) => {
    const isTextarea = type === "textarea";
    const InputOrTextarea = isTextarea ? "textarea" : "input";

    return (
      <div>
        <label htmlFor={id} className="block text-xl font-medium">
          {label}
        </label>
        <InputOrTextarea
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            type === "textarea"
              ? "mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:border-blue-500 focus:border-2"
              : "mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:border-2"
          }
        />
      </div>
    );
  };

  const selectInputForm = (
    id: string,
    label: string,
    value: string | undefined,
    onChange: (value: string) => void,
    options: { value: string; label: string }[],
  ) => {
    return (
      <div>
        <label htmlFor={id} className="block text-xl font-medium">
          {label}
        </label>
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const switchInputForm = (
    id: string,
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void,
  ) => {
    return (
      <div className="flex items-center">
        <Switch checked={checked} onCheckedChange={onChange} />
        <label htmlFor={id} className="text-xl ml-2">
          {label}
        </label>
      </div>
    );
  };

  // const PasswordInputForm = (
  //   id: string,
  //   label: string,
  //   value: string,
  //   onChange: (value: string) => void,
  // ) => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [showPassword, setShowPassword] = useState(false);

  //   return (
  //     <div className="relative">
  //       <label htmlFor={id} className="block text-xl font-medium">
  //         {label}
  //       </label>
  //       <input
  //         type={showPassword ? "text" : "password"}
  //         id={id}
  //         name={id}
  //         value={value}
  //         onChange={(e) => onChange(e.target.value)}
  //         className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
  //       />
  //       <button
  //         type="button"
  //         onClick={() => setShowPassword(!showPassword)}
  //         className="absolute right-3 top-11 text-3xl text-gray-400"
  //       >
  //         {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
  //       </button>
  //     </div>
  //   );
  // };

  const saveButton = (onClick: () => Promise<void>) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 self-end"
      >
        Save
      </button>
    );
  };

  const onClickSecuritySave = async () => {
    // If password not strong enough
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter,  1 number, and be at least 8 characters long.",
      );
      setIsDialogOpen(true);
      return;
    }
    // If newPassword != confirmed password
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation password do not match.");
      setIsDialogOpen(true);
      return;
    }
    // If current password is empty
    if (currentPassword === "") {
      setErrorMessage("Current password cannot be empty.");
      setIsDialogOpen(true);
      return;
    }

    try {
      await backend.resetPassword({
        password: currentPassword,
        newPassword,
      });
    } catch (e) {
      if (isAPIError(e)) {
        setErrorMessage("Invalid password");
        setIsDialogOpen(true);
      }
    }
  };

  return (
    <PageFrame title="Settings">
      {userInfo && (
        <>
          <Tabs.Root defaultValue="editProfile">
            <Tabs.List className="space-x-12">
              {[
                { value: "editProfile", label: "Edit Profile" },
                { value: "preferences", label: "Preferences" },
                { value: "security", label: "Security" },
              ].map((tab) => (
                <Tabs.Trigger key={tab.value} value={tab.value}>
                  <Text size="4">{tab.label}</Text>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <div className="flex flex-col m-auto max-w-[1000px]">
              <Tabs.Content value="editProfile" className="p-6 space-y-8">
                {/* Avatar */}
                <div className="w-full flex-col flex items-center">
                  <div className="relative w-32 h-32 rounded-full flex justify-center overflow-hidden">
                    {userInfo.avatar ? (
                      <img
                        src={userInfo.avatar}
                        alt="Avatar"
                        className="object-cover"
                      />
                    ) : (
                      <IoMdPerson className="h-full w-full  text-zinc-500 bg-zinc-300" />
                    )}
                    <button
                      className="absolute bottom-0 text-white transform translate-x w-full text-sm bg-zinc-500 opacity-90"
                      onClick={() =>
                        document.getElementById("avatarInput")!.click()
                      }
                    >
                      Edit
                    </button>
                    {/* Hide below input use button to click below input */}
                    <input
                      id="avatarInput"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {/* List of personal info */}
                <div className="w-full">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {textInputForm(
                      "firstName",
                      "First Name",
                      userInfo.firstName,
                      onChangeFirstName,
                    )}
                    {textInputForm(
                      "lastName",
                      "Last Name",
                      userInfo.lastName,
                      onChangeLastName,
                    )}
                    {selectInputForm(
                      "title",
                      "Title",
                      userInfo.title,
                      onChangeTitle,
                      [
                        { value: "", label: "Select a title" },
                        { value: "Mr", label: "Mr" },
                        { value: "Ms", label: "Ms" },
                        { value: "Dr", label: "Dr" },
                        { value: "Prof", label: "Prof" },
                      ],
                    )}
                    {selectInputForm(
                      "gender",
                      "Gender",
                      userInfo.gender,
                      onChangeGender,
                      [
                        { value: "", label: "Select gender" },
                        { value: "female", label: "Female" },
                        { value: "male", label: "Male" },
                        { value: "non-binary", label: "Non-binary" },
                      ],
                    )}
                    <div className="md:col-span-2">
                      {textInputForm(
                        "bio",
                        "Bio",
                        userInfo.bio,
                        onChangeBio,
                        "textarea",
                      )}
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                      {saveButton(onClickProfileSave)}
                    </div>
                  </form>
                </div>
              </Tabs.Content>

              <Tabs.Content value="preferences" className="p-6 space-y-8">
                <div className="w-full">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectInputForm(
                      "lang",
                      "Preferred language",
                      mockPreferences.lang,
                      mockPreferences.onChangeLang,
                      [
                        { value: "", label: "Select your preferred language" },
                        { value: "English", label: "English" },
                        { value: "Mandarin", label: "Mandarin" },
                        { value: "Korean", label: "Korean" },
                      ],
                    )}
                    {selectInputForm(
                      "timezone",
                      "Time Zone",
                      mockPreferences.timezone,
                      mockPreferences.onChangeTimezone,
                      [
                        { value: "", label: "Select Time Zone" },
                        {
                          value: "AEST",
                          label: "Australian Eastern Standard Time (AEST)",
                        },
                      ],
                    )}
                    <div className="flex items-center md:col-span-2">
                      {switchInputForm(
                        "notification",
                        "Receive notifications for announcements",
                        mockPreferences.notifications,
                        mockPreferences.onChangeNotifications,
                      )}
                    </div>
                    <div className="flex items-center md:col-span-2">
                      {switchInputForm(
                        "recommendation",
                        "Get recommendations for courses",
                        mockPreferences.recommendation,
                        mockPreferences.onChangeRecommendation,
                      )}
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                      {saveButton(mockPreferences.onClickPreferencesSave)}
                    </div>
                  </form>
                </div>
              </Tabs.Content>

              <Tabs.Content value="security" className="p-6 space-y-8">
                <div className="w-full">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center md:col-span-2">
                      {switchInputForm(
                        "auth",
                        "Enable or disable two factor authentication",
                        mockSecurity.twoFactorEnabled,
                        mockSecurity.onChangeTwoFactorEnabled,
                      )}
                    </div>

                    <div className="md:col-span-2 relative max-w-[600px]">
                      {/* {PasswordInputForm(
                    "current-password",
                    "Current Password",
                    currentPassword,
                    setCurrentPassword,
                  )} */}
                      <PasswordInputForm
                        id="current-password"
                        label="Current Password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                      />
                    </div>
                    <div className="md:col-span-2 relative max-w-[600px]">
                      {/* {PasswordInputForm(
                    "new-password",
                    "New Password",
                    newPassword,
                    setNewPassword,
                  )} */}
                      <PasswordInputForm
                        id="new-password"
                        label="New Password"
                        value={newPassword}
                        onChange={setNewPassword}
                      />
                    </div>
                    <div className="md:col-span-2 relative max-w-[600px]">
                      {/* {PasswordInputForm(
                    "confirm-password",
                    "Confirm your new password",
                    confirmPassword,
                    setConfirmPassword,
                  )} */}
                      <PasswordInputForm
                        id="confirm-password"
                        label="Confirm your new password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      {saveButton(onClickSecuritySave)}
                    </div>
                  </form>
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
          <ErrorDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            errorMessage={errorMessage}
          />
        </>
      )}
    </PageFrame>
  );
};

export default Profile;
