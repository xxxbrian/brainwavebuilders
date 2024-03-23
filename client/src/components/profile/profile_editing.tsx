import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import ErrorDialog from "../ErrDialog";
import React, { useState } from "react";
import { IoMdPerson } from "react-icons/io";

export type ProfileProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
  title?: string;
  gender?: string;
  bio?: string;
};

export type PreferenceProps = {
  lang?: string;
  timezone?: string;
  notification: boolean;
  recommendation: boolean;
};

export type SecurityProps = {
  two_factor_auth: boolean;
};

type EditingProps = ProfileProps & PreferenceProps & SecurityProps;

const ProfileEditing: React.FC<EditingProps> = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [title, setTitle] = useState(props.title ?? "");
  const [gender, setGender] = useState(props.gender ?? "");
  const [bio, setBio] = useState(props.bio ?? "");
  const [avatar, setAvatar] = useState(props.avatar);
  const [lang, setLang] = useState(props.lang ?? "");
  const [timezone, setTimezone] = useState(props.timezone ?? "");
  const [notification, setNotification] = useState(props.notification);
  const [recommendation, setRecommendation] = useState(props.recommendation);
  const [auth, setAuth] = useState(props.two_factor_auth);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // alert dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setAvatar(e.target!.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const onClickSaveProfile = () => {
    // TODO
  };

  const onClickSavePreferences = () => {
    // TODO
  };

  interface TextInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: React.HTMLInputTypeAttribute;
  }

  const TextInput: React.FC<TextInputProps> = ({
    id,
    label,
    value,
    onChange,
    type = "text",
  }) => {
    if (type === "textarea") {
      return (
        <div>
          <label htmlFor={id} className="block text-xl font-medium">
            {label}
          </label>
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:border-blue-500 focus:border-2"
          />
        </div>
      );
    }

    return (
      <div>
        <label htmlFor={id} className="block text-xl font-medium">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:border-2"
        />
      </div>
    );
  };

  const textInputForm = (
    id: string,
    label: string,
    value: string,
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

  interface SelectInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }

  const SelectInput: React.FC<SelectInputProps> = ({
    id,
    label,
    value,
    onChange,
    options,
  }) => (
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

  const selectInputForm = (
    id: string,
    label: string,
    value: string,
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

  interface SwitchInputProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }

  const SwitchInput: React.FC<SwitchInputProps> = ({
    id,
    label,
    checked,
    onChange,
  }) => (
    <div className="flex items-center">
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-zinc-300 data-[state=checked]:bg-[#004E89] cursor-default"
      >
        <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
      <label htmlFor={id} className="text-xl ml-2">
        {label}
      </label>
    </div>
  );

  const switchInputForm = (
    id: string,
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void,
  ) => {
    return (
      <div className="flex items-center">
        <Switch.Root
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          className="w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-zinc-300 data-[state=checked]:bg-[#004E89] cursor-default"
        >
          <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
        <label htmlFor={id} className="text-xl ml-2">
          {label}
        </label>
      </div>
    );
  };

  interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
  }

  const PasswordInput: React.FC<PasswordInputProps> = ({
    id,
    label,
    value,
    onChange,
  }) => {
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

  const passwordInputForm = (
    id: string,
    label: string,
    value: string,
    onChange: (value: string) => void,
  ) => {
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

  const onClickSaveSecurity = () => {
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
    setCurrentPassword("");
    setNewPassword("");
    // TODO
  };

  return (
    <>
      <Tabs.Root defaultValue="editProfile">
        <Tabs.List className="flex space-x-10 pt-5 pl-3 border-b">
          <Tabs.Trigger
            value="editProfile"
            className="px-4 py-2 text-xl font-medium text-blue-800
                      focus:outline-none
                      hover:border-b-blue-500 hover:text-blue-500
                      [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-blue-500 [&[data-state='active']]:text-blue-500"
          >
            Edit Profile
          </Tabs.Trigger>
          <Tabs.Trigger
            value="preferences"
            className="px-4 py-2 text-xl font-medium text-blue-800
                      focus:outline-none
                      hover:border-b-blue-500 hover:text-blue-500
                      [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-blue-500 [&[data-state='active']]:text-blue-500"
          >
            Preferences
          </Tabs.Trigger>
          <Tabs.Trigger
            value="security"
            className="px-4 py-2 text-xl font-medium text-blue-800
                      focus:outline-none
                      hover:border-b-blue-500 hover:text-blue-500
                      [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-blue-500 [&[data-state='active']]:text-blue-500"
          >
            Security
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="editProfile" className="p-6 space-y-8">
          {/* Avatar */}
          <div className="w-full flex-col flex items-center">
            <div className="relative w-32 h-32 rounded-full flex justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="object-cover" />
              ) : (
                <IoMdPerson className="h-full w-full  text-zinc-500 bg-zinc-300" />
              )}
              <button
                className="absolute bottom-0 text-white transform translate-x w-full text-sm bg-zinc-500 opacity-90"
                onClick={() => document.getElementById("avatarInput")!.click()}
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
              {/* <TextInput
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={setFirstName}
              />
               */}
              {textInputForm(
                "firstName",
                "First Name",
                firstName,
                setFirstName,
              )}
              {/* <TextInput
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={setLastName}
              />
               */}
              {textInputForm("lastName", "Last Name", lastName, setLastName)}
              {/* <SelectInput
                id="title"
                label="Title"
                value={title}
                onChange={setTitle}
                options={[
                  { value: "", label: "Select a title" },
                  { value: "Mr", label: "Mr" },
                  { value: "Ms", label: "Ms" },
                  { value: "Dr", label: "Dr" },
                  { value: "Prof", label: "Prof" },
                ]}
              /> */}
              {selectInputForm("title", "Title", title, setTitle, [
                { value: "", label: "Select a title" },
                { value: "Mr", label: "Mr" },
                { value: "Ms", label: "Ms" },
                { value: "Dr", label: "Dr" },
                { value: "Prof", label: "Prof" },
              ])}
              {/* <SelectInput
                id="gender"
                label="Gender"
                value={gender}
                onChange={setGender}
                options={[
                  { value: "", label: "Select gender" },
                  { value: "female", label: "Female" },
                  { value: "male", label: "Male" },
                  { value: "non-binary", label: "Non-binary" },
                ]}
              /> */}
              {selectInputForm("gender", "Gender", gender, setGender, [
                { value: "", label: "Select gender" },
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "non-binary", label: "Non-binary" },
              ])}
              <div className="md:col-span-2">
                {/* <TextInput
                  id="bio"
                  label="Bio"
                  value={bio}
                  onChange={setBio}
                  type="textarea"
                /> */}
                {textInputForm("bio", "Bio", bio, setBio, "textarea")}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClickSaveProfile}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 self-end"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Tabs.Content>

        <Tabs.Content value="preferences" className="p-6 space-y-8">
          <div className="w-full">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <SelectInput
                id="lang"
                label="Preferred language"
                value={lang}
                onChange={setLang}
                options={[
                  { value: "", label: "Select your preferred language" },
                  { value: "English", label: "English" },
                  { value: "Mandarin", label: "Mandarin" },
                  { value: "Korean", label: "Korean" },
                ]}
              /> */}
              {selectInputForm("lang", "Preferred language", lang, setLang, [
                { value: "", label: "Select your preferred language" },
                { value: "English", label: "English" },
                { value: "Mandarin", label: "Mandarin" },
                { value: "Korean", label: "Korean" },
              ])}
              {/* <SelectInput
                id="timezone"
                label="Time Zone"
                value={timezone}
                onChange={setTimezone}
                options={[
                  { value: "", label: "Select Time Zone" },
                  {
                    value: "AEST",
                    label: "Australian Eastern Standard Time (AEST)",
                  },
                ]}
              /> */}
              {selectInputForm("timezone", "Time Zone", timezone, setTimezone, [
                { value: "", label: "Select Time Zone" },
                {
                  value: "AEST",
                  label: "Australian Eastern Standard Time (AEST)",
                },
              ])}
              <div className="flex items-center md:col-span-2">
                {/* <SwitchInput
                  id="notification"
                  label="Receive notifications for announcements"
                  checked={notification}
                  onChange={setNotification}
                /> */}
                {switchInputForm(
                  "notification",
                  "Receive notifications for announcements",
                  notification,
                  setNotification,
                )}
              </div>
              <div className="flex items-center md:col-span-2">
                {/* <SwitchInput
                  id="recommendation"
                  label="Get recommendations for courses"
                  checked={recommendation}
                  onChange={setRecommendation}
                /> */}
                {switchInputForm(
                  "recommendation",
                  "Get recommendations for courses",
                  recommendation,
                  setRecommendation,
                )}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClickSavePreferences}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 self-end"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Tabs.Content>

        <Tabs.Content value="security" className="p-6 space-y-8">
          <div className="w-full">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center md:col-span-2">
                {/* <SwitchInput
                  id="auth"
                  label="Enable or disable two factor authentication"
                  checked={auth}
                  onChange={setAuth}
                /> */}
                {switchInputForm(
                  "auth",
                  "Enable or disable two factor authentication",
                  auth,
                  setAuth,
                )}
              </div>

              <div className="md:col-span-2 relative max-w-[600px]">
                {/* <PasswordInput
                  id="current-password"
                  label="Current Password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                /> */}
                {passwordInputForm(
                  "current-password",
                  "Current Password",
                  currentPassword,
                  setCurrentPassword,
                )}
              </div>
              <div className="md:col-span-2 relative max-w-[600px]">
                {/* <PasswordInput
                  id="new-password"
                  label="New Password"
                  value={newPassword}
                  onChange={setNewPassword}
                /> */}
                {passwordInputForm(
                  "new-password",
                  "New Password",
                  newPassword,
                  setNewPassword,
                )}
              </div>
              <div className="md:col-span-2 relative max-w-[600px]">
                {/* <PasswordInput
                  id="confirm-password"
                  label="Confirm your new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                /> */}
                {passwordInputForm(
                  "confirm-password",
                  "Confirm your new password",
                  confirmPassword,
                  setConfirmPassword,
                )}
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClickSaveSecurity}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 self-end"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <ErrorDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default ProfileEditing;
