import { uploads } from '../../utils/config';

// estilo
import './photo.sass';

// components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem';

// Hooks
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// Redux
import { getPhoto, like } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer';


const Photo = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);

    const { photo, loading, error, message } = useSelector((state) => state.photo);

    // Comments

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // Like
    const handleLike = () => {
        dispatch(like(photo._id));

        resetMessage();
    };


    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
            <div className="message-container">
                {error && <Message msg={error} type="error"/>}
                {message && <Message msg={message} type="success"/>}
            </div>
        </div>
    )
}

export default Photo