import './commentaire.css'; 
export default function DeleteModal() {
    return (
      <div className="delete-modal">
        <h2 className="delete-modal_title">Delete comment</h2>
        <p className="delete-modal_content">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="delete-modal_btns">
          <button className="delete-modal_btn no">No, cancel</button>
          <button className="delete-modal_btn yes">Yes, delete</button>
        </div>
      </div>
    );
  }
  