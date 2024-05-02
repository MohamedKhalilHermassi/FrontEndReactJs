import React, { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";


export default function NewComment({
  handleSubmit,
  placeholder = "Add comment...",
  initialText="",
  buttonText
}) {
  const [text, setText] = useState(initialText);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

  const emojis = ["🥺", "😴", "😊", "😂", "😍", "👍", "👎", "🙌", "🎉", "❤️"];

  const handleEmojiClick = (emoji) => {
    setText(text + emoji);
    setShowEmojiSelector(false);
  };

  const handleEmojiSelectorClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowEmojiSelector(!showEmojiSelector);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    try {
      await handleSubmit(text);
      setText("");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form className="new-comment-container" onSubmit={onSubmit}>
      <textarea
        className="new-comment"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="emoji-selector-button"
        onClick={handleEmojiSelectorClick}
      >
        <MdEmojiEmotions className="h-50 w-50"/>
      </button>
      {showEmojiSelector && (
        <div className="emoji-selector">
          {emojis.map((emoji, index) => (
            <button key={index} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}
      <button className="new-comment-submit" type="submit">
        {buttonText}
      </button>
    </form>
  );
}