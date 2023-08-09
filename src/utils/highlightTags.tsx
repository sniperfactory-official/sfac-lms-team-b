import React from "react";

function highlightTags(
  comment: string,
  onClickTimestamp: (time: string) => void,
) {
  const tagPattern = /(@\S+)|(\b\d{1,2}:\d{2}\b)/g;
  const words = comment.split(" ");

  const highlightedComment = words
    .map((word, index) => {
      if (word.match(tagPattern)) {
        if (word.match(/\b\d{1,2}:\d{2}\b/)) {
          return (
            <span
              key={index}
              className="text-sm font-semibold text-blue-500 break-all whitespace-pre-wrap cursor-pointer"
              onClick={() => onClickTimestamp(word)}
            >
              {word}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="text-sm font-semibold text-blue-500 break-all whitespace-pre-wrap"
            >
              {word}
            </span>
          );
        }
      } else {
        return word;
      }
    })
    .reduce<React.ReactNode[]>((prev, curr, i) => {
      return i < words.length - 1 ? [...prev, curr, " "] : [...prev, curr];
    }, []);

  return highlightedComment;
}

export default highlightTags;
