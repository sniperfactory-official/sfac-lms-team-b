import React from "react";

function highlightTags(comment: string) {
  const tagPattern = /(@\S+)/g;
  const words = comment.split(" ");

  const highlightedComment = words
    .map((word, index) => {
      if (word.match(tagPattern)) {
        return (
          <span
            key={index}
            className="text-sm font-semibold text-blue-500 break-all whitespace-pre-wrap"
          >
            {word}
          </span>
        );
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
