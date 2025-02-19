import { useUser } from "@clerk/clerk-expo";

// Nickname e.g. beto@expo.io -> beto
export const useUserIdAndNickname = () => {
  const { user } = useUser();
  if (!user || !user.primaryEmailAddress) {
    throw new Error("User is not signed in");
  }
  return [user.id, user.primaryEmailAddress.emailAddress.split("@")[0]];
};
