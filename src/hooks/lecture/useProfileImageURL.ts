import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function getProfileImageURL(imagePath: string) {
  const storage = getStorage();
  const imageRef = ref(storage, imagePath);

  const url = await getDownloadURL(imageRef);
  return url;
}
