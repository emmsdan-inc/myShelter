import React from "react";

function fetchMedia(setState) {
  fetch(
    `http://shelter-api.emmsdan.com.ng/v1/media${mediaId ? "/" + mediaId : ""}`
  )
    .then((res) => res.json())
    .then((resp) => {
      if (resp.meta) {
        setState(resp.data);
      } else {
        setState([resp]);
      }
    });
}
export function useFetchMedia(mediaId = null) {
  const [state, setState] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const update = (value) => {
    setState(value);
    setIsLoading(false);
  };
  React.useEffect(() => {
    fetchMedia(update, mediaId);
  }, [mediaId]);
  return [{ data: state, isLoading }, (id = mediaId) => fetchMedia(update, id)];
}

export default useFetchMedia;
