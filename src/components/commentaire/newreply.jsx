import { useEffect, useState } from "react";
import NewComment from "./newcomment";
import deleteIcon from '../../../public/images/icon-delete.svg'
import editIcon from '../../../public/images/icon-edit.svg'
import minusIcon from '../../../public/images/icon-minus.svg'
import plusIcon from '../../../public/images/icon-plus.svg'
import replyIcon from '../../../public/images/icon-reply.svg'
import './commentaire.css'; 
import defaultAvatar from '../../../public/images/profil.png';
export default function Reply(props) {
  const [score, setScore] = useState(props.score);
  const [disableUpvote, setDisableUpvote] = useState(false);
  const [disableDownvote, setDisableDownvote] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  let starterScore = props.score;
  const isCurrentUser = props.currentUser && props.currentUser.id === props.user._id;
  const isReplying =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "replying";
  const isEditing =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "editing";

  const handleScoreChange = (e) => {
    if (e.target.classList.contains("minus-btn")) {
      setScore((prevScore) => prevScore - 1);
      if (score - starterScore < 1) {
        setDisableDownvote(true);
        setDisableUpvote(false);
        starterScore = props.score;
      }
    }
    if (e.target.classList.contains("plus-btn")) {
      setScore((prevScore) => prevScore + 1);
      if (starterScore - score < 1) {
        setDisableUpvote(true);
        setDisableDownvote(false);
        starterScore = props.score;
      }
    }
  };
  const getUser = async (email) =>{
    const data = await getUser(email);
    console.log(data);
    setCurrentUser(data)
  }

  useEffect(()=>{
    console.log(props.currentUser.email);
    getUser(props.currentUser.email)
  },[])

  return (
    <div>
      <div className="comment">
        <div className="comment-heading">
          <img
            className="user-avatar"
            src={props.user.image ? `http://localhost:3000/${props.user.image}` : defaultAvatar}
            alt="user avatar"
          />
          <p className="username">{`${props.currentUser.username}`}</p>
          {props.user.username === props.currentUser.username && (
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
                props.updateReply(text, props.id);
              }}
              initialText={props.description}
              isEdit
              buttonText='update'
            />
          )}
        </div>
        <div className="comment-votes">
          <button
            className={`plus-btn`}
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
            className={`minus-btn`}
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
              props.addReply(`@${props.user.username}, ${text}`)
            }
            buttonText='reply'
          />
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
                  props.deleteReply(props.id);
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
