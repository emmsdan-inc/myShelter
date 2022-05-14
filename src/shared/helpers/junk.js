import AudioImageCard from "../../components/Audio/AudioImageCard";
import React from "react";

if (item.media.length === 10000) {
  for (let i = 0; i < item.media.length; ) {
    const media1 = item.media[i];
    const media2 = item.media[i + 1];
    if (media2 && item.media.length >= 3) {
      data.push({
        value: [
          <AudioImageCard
            media={media2 || media1}
            uri={media2.thumbnail_url}
          />,
          <AudioImageCard
            media={media1 || media2}
            uri={(media1 || media2 || {}).thumbnail_url}
          />,
        ],
        media: media2 || media1,
      });
      i += 2;
    } else {
      data.push({
        value: (
          <AudioImageCard media={media1 || media2} uri={media1.thumbnail_url} />
        ),
        media: media1 || media2 || {},
      });
      i++;
    }
  }
}
