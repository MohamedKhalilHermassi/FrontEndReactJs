import { useState } from "react";
import './commentaire.css'; 

export default function NewComment({
  handleSubmit,
  placeholder = "Add comment...",
  buttonText
}) {
  const [text, setText] = useState("");

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
      <button className="new-comment-submit" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
