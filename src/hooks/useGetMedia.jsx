import React from "react";
import { rcMediaAllMediaSelector } from "../store/redux/states";
import { searchService } from "../services/media";
import useReduxState from "./useReduxState";

export function useGetMedia(mediaId = "", customUrl = null) {
  const [getMedia, setMedia] = useReduxState(rcMediaAllMediaSelector);
  
  const [id, setId] = React.useState(mediaId);
  const [state, setState] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (mediaId || mediaId === "") {
          if (getMedia && mediaId && getMedia[mediaId]) {
            setState(data);
          } else {
            const response = await searchService(
              customUrl ?? "media/" + mediaId,
              {}
            );
            // setMedia(response?.data || response || {});
            setState(response?.data || response[0] || {});
          }
        }
      } catch (error) {
        console.error(error.message, "error");
      }
      setIsLoading(false);
    })();
  }, [id]);
  return [{ ...state, dataIsLoading: isLoading }, setId];
}

export default useGetMedia;
