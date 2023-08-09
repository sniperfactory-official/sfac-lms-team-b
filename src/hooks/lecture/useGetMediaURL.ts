import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function getMediaURL(mediaPath: string) {
  const storage = getStorage();
  const mediaRef = ref(storage, mediaPath);

  const url = await getDownloadURL(mediaRef);
  return url;
}
