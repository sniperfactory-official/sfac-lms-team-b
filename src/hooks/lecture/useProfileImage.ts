import { useState, useEffect } from "react";
import { getMediaURL } from "@/hooks/lecture/useGetMediaURL";

const useProfileImage = (profileImage: string | undefined) => {
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage) {
      getMediaURL(profileImage).then(setProfileImageURL).catch(console.error);
    }
  }, [profileImage]);

  return profileImageURL;
};

export default useProfileImage;
