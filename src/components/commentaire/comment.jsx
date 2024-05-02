import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import NewComment from "./newcomment";
import Reply from "./newreply";
import deleteIcon from '../../../public/images/icon-delete.svg'
import editIcon from '../../../public/images/icon-edit.svg'
import minusIcon from '../../../public/images/icon-minus.svg'
import plusIcon from '../../../public/images/icon-plus.svg'
import replyIcon from '../../../public/images/icon-reply.svg'
import './commentaire.css'; 
import defaultAvatar from '../../../public/images/profil.png';
import DeleteModal from "./deletemodal";

export default function Comment(props) {
  const [score, setScore] = useState(props.score);
  const [disableUpvote, setDisableUpvote] = useState(false);
  const [disableDownvote, setDisableDownvote] = useState(false);
  const [backendReplies, setBackendReplies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    setBackendReplies(props.replies || []);
  }, [props.replies]);

  let starterScore = props.score;

  const isCurrentUser = props.currentUser && props.currentUser.id === props.user._id;

  console.log(props.currentUser) ; 
  console.log(props.currentUser.id) ; 
  console.log(props.user._id) ; 



  const isReplying =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "replying";
  const isEditing =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "editing";

  const handleScoreChange = async (e) => {
    let updatedScore;
    if (e.target.classList.contains("minus-btn")) {
      updatedScore = score - 1;
      if (updatedScore - starterScore < 1) {
        setDisableDownvote(true);
        setDisableUpvote(false);
        starterScore = props.score;
      }
    }
    if (e.target.classList.contains("plus-btn")) {
      updatedScore = score + 1;
      if (starterScore - updatedScore < 1) {
        setDisableUpvote(true);
        setDisableDownvote(false);
        starterScore = props.score;
      }
    }

    try {
      const response = await fetch(`http://localhost:3000/commentaires/updateScore/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: updatedScore, // Use the updated score directly here
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update score');
      }

      // Update the score state after the request is successful
      setScore(updatedScore);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const createReply = async (text) => {
    return {
       description: text,
      createdAt: "Just now",
      id: nanoid(),
      replyingTo: props.user.username,
      score: 1,
      user: props.currentUser,
    };
  };

  const addReply = (text) => {
    createReply(text).then((reply) => {
      setBackendReplies([reply, ...backendReplies]);
    });
    props.setActiveComment(null);
  };

  const deleteReply = (replyId) => {
    const updatedBackendReplies = backendReplies.filter(
      (backendReply) => backendReply.id !== replyId
    );
    setBackendReplies(updatedBackendReplies);
  };

  const updateReply = (text, replyId) => {
    const updatedBackendReplies = backendReplies.map((backendReply) => {
      if (backendReply.id === replyId) {
        return { ...backendReply, description: text }
      }
      return backendReply
    })
    setBackendReplies(updatedBackendReplies)
    props.setActiveComment(null)
  }

  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-heading">
          <img
            className="user-avatar"
            src={props.user.image ? `http://localhost:3000/${props.user.image}` : defaultAvatar}
            alt="user avatar"
          />
          <p className="username">{`${props.user.fullname}`}</p>
          {isCurrentUser && (
            <p className="tag">you</p>
          )}
          <p className="date">{props.createdAt}</p>
        </div>
        <div className="editing">
          {!isEditing && <p className="comment-content">{props.description}</p>}
          {isEditing && (
            <NewComment
              currentUser={props.currentUser}
              handleSubmit={(text) => {
                props.updateComment(text, props.id);
              }}
              initialText={props.description}
              isEdit
              buttonText='update'
            />
          )}
        </div>
        <div className="comment-votes">
          <button
            className='plus-btn'
            disabled={disableUpvote}
            onClick={handleScoreChange}
          >
            <img
              className={`plus-btn plus-icon`}
              src={plusIcon}
              alt="plus icon"
            />
          </button>
          <p className="comment-votes_total">{score}</p>
          <button
            disabled={disableDownvote}
            className='minus-btn'
            onClick={handleScoreChange}
          >
            <img
              className={`minus-btn minus-icon`}
              src={minusIcon}
              alt="minus icon"
            />
          </button>
        </div>
        <div className="comment-footer">
          {isCurrentUser ? (
            <div className="toggled-btns">
              <button
                className="delete-btn"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                <img
                  className="delete-icon"
                  src={deleteIcon}
                  alt="delete icon"
                />
                Delete
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  props.setActiveComment({ id: props.id, type: "editing" });
                }}
              >
                <img
                  className="edit-icon"
                  src={editIcon}
                  alt="edit icon"
                />
                Edit
              </button>
            </div>
          ) : (
            <button
              className="reply-btn"
              onClick={() =>
                props.setActiveComment({ id: props.id, type: "replying" })
              }
            >
              <img
                className="reply-icon"
                src={replyIcon}
                alt="reply icon"
              />
              Reply
            </button>
          )}
        </div>
      </div>
      {isReplying && (
        <div>
          <NewComment
            currentUser={props.currentUser}
            placeholder={`Replying to @${props.user.username}`}
            handleSubmit={(text) =>
              addReply(`@${props.user.username}, ${text}`)
            }
            buttonText='reply'
          />
        </div>
      )}
      {backendReplies.length > 0 && (
        <div className="replies-container">
          {backendReplies.map((reply) => (
            <div className="reply" key={reply.id}>
              <Reply
                currentUser={props.currentUser}
                activeComment={props.activeComment}
                setActiveComment={props.setActiveComment}
                addReply={addReply}
                deleteReply={deleteReply}
                updateReply={updateReply}
                {...reply}
              />
            </div>
          ))}
        </div>
      )}
      {showDeleteModal && (
        <div className="delete-modal-container">
          <div className="delete-modal">
            <h2 className="delete-modal_title">Delete comment</h2>
            <p className="delete-modal_content">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="delete-modal_btns">
              <button
                className="delete-modal_btn no"
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                No, cancel
              </button>
              <button
                className="delete-modal_btn yes"
                onClick={() => {
                  props.deleteComment(props.id);
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
