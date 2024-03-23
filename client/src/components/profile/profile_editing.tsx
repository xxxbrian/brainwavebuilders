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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const onChangeFirstName = (value: string) => {
    setFirstName(value);
  };

  const onChangeLastName = (value: string) => {
    setLastName(value);
  };

  const onChangeTitle = (value: string) => {
    setTitle(value);
  };

  const onChangeGender = (value: string) => {
    setGender(value);
  };

  const onChangeBio = (value: string) => {
    setBio(value);
  };

  const onChangeLang = (value: string) => {
    setLang(value);
  };

  const onChangeTimezone = (value: string) => {
    setTimezone(value);
  };

  const onChangeNotification = (value: boolean) => {
    setNotification(value);
  };

  const onChangeRecommendation = (value: boolean) => {
    setRecommendation(value);
  };

  const onChangeAuth = (value: boolean) => {
    setAuth(value);
  };

  const onClickSaveProfile = () => {
    // TODO
  };

  const onClickSavePreferences = () => {
    // TODO
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
              {/* FirstName */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xl font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => onChangeFirstName(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:border-2"
                />
              </div>

              {/* LastName */}
              <div>
                <label htmlFor="lastName" className="block text-xl font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => onChangeLastName(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 focus:border-2"
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-xl font-medium">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => onChangeTitle(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                >
                  <option value="">Select a title</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-xl font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => onChangeGender(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-xl font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(e) => onChangeBio(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:border-blue-500 focus:border-2"
                />
              </div>

              {/* Save Button */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClickSaveProfile}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90"
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
              {/* Language */}
              <div>
                <label htmlFor="lang" className="block text-xl font-medium">
                  Preferred language
                </label>
                <select
                  id="lang"
                  name="lang"
                  value={lang}
                  onChange={(e) => onChangeLang(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                >
                  <option value="">Select your preferred language</option>
                  <option value="Mr">English</option>
                  <option value="Ms">Mandarin</option>
                  <option value="Dr">Korean</option>
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label htmlFor="timezone" className="block text-xl font-medium">
                  Time Zone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={timezone}
                  onChange={(e) => onChangeTimezone(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                >
                  <option value="">Select Time Zone</option>
                  <option value="female">
                    Australian Eastern Standard Time (AEST)
                  </option>
                </select>
              </div>

              <div className="text-xl font-bold">Notifications</div>

              {/* Notifications Switch */}
              <div className="flex items-center md:col-span-2">
                <Switch.Root
                  checked={notification}
                  onCheckedChange={onChangeNotification}
                  className="w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-zinc-300 data-[state=checked]:bg-[#004E89] cursor-default"
                  id="notification"
                >
                  <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
                <label className="text-xl ml-2" htmlFor="notification">
                  Receive notifications for announcements
                </label>
              </div>

              {/* Recommendations Switch */}
              <div className="flex items-center md:col-span-2">
                <Switch.Root
                  checked={recommendation}
                  onCheckedChange={onChangeRecommendation}
                  className="w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-zinc-300 data-[state=checked]:bg-[#004E89] cursor-default"
                  id="recommendation"
                >
                  <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
                <label className="text-xl ml-2" htmlFor="recommendation">
                  Get recommendations for courses
                </label>
              </div>

              {/* Save Button */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClickSavePreferences}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90"
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
              <div className="text-xl font-bold">Two-factor Authentication</div>

              {/* 2 factor authentication */}
              <div className="flex items-center md:col-span-2">
                <Switch.Root
                  checked={auth}
                  onCheckedChange={onChangeAuth}
                  className="w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-zinc-300 data-[state=checked]:bg-[#004E89] cursor-default"
                  id="auth"
                >
                  <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
                <label className="text-xl ml-2" htmlFor="auth">
                  Enable or disable two factor authentication
                </label>
              </div>

              <div className="text-xl font-bold">Change Password</div>

              {/* Current Password */}
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="current-password"
                  className="block text-xl font-medium"
                >
                  Current Password
                </label>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="current-password"
                  name="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-11 text-3xl text-gray-400"
                >
                  {showCurrentPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              {/* New Password */}
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="new-password"
                  className="block text-xl font-medium"
                >
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  name="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-11 text-3xl text-gray-400"
                >
                  {showNewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="confirm-password"
                  className="block text-xl font-medium"
                >
                  Confirm your new password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border-2 sm:text-xl border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-11 text-3xl text-gray-400"
                >
                  {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              {/* Save Button */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClickSaveSecurity}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90"
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
