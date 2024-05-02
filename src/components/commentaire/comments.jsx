import Comment from "./comment";
import NewComment from "./newcomment";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import './commentaire.css'; 

function Comments({ courseId }) {
    const [backendComments, setBackendComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeComment, setActiveComment] = useState(null);
    
    useEffect(() => {
        fetchComments();
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken); // Set currentUser state with decoded token
        } else {
            console.log('User token not found in localStorage.');
        }
    }, [courseId]); 

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/commentaires/getcoursescomments/${courseId}`);
            const data = await response.json();
            setBackendComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const addComment = async (text) => {
        try {
            const usersId = localStorage.getItem('id');
            if (!usersId) { // Check if usersId is defined
                console.error('Error adding comment: usersId is undefined');
                return;
            }
        
            const response = await fetch(`http://localhost:3000/commentaires/course/${courseId}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: usersId, // Use usersId instead of currentUser.id
                    description: text,
                }),
            });
            const newComment = await response.json();
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await fetch(`http://localhost:3000/commentaires/delete/${commentId}`, { 
                method: 'DELETE',
            });
            
            // Refresh the comments list
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const updateComment = async (text, commentId) => {
        try {
            const response = await fetch(`http://localhost:3000/commentaires/editCommentaire/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: text,
                }),
            });
        
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }
        
            // Update the local state with the updated comment
            fetchComments();
        
            // Clear the active comment (editing mode)
            setActiveComment(null);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <main>
            {backendComments.map((comment) => (
                <Comment
                    key={comment._id} // Adjust the key property based on your comment schema
                    id={comment._id} // Pass id instead of key
                    replies={comment.replies}
                    currentUser={currentUser}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    {...comment}
                />
            ))}
            <NewComment handleSubmit={addComment} placeholder="Add comment..." buttonText="Send" />
        </main>
    );
}

export default Comments;
