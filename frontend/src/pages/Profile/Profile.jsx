import { uploads } from '../../utils/config';

// estilo
import './profile.sass';

// components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';

const Profile = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const [editId, setEditId] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editTitle, setEditTitle] = useState("");

    // New form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);
    };

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image,
        }

        // build form data
        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach((key) =>
            formData.append(key, photoData[key])
        );

        formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData));

        setTitle("");

        resetComponentMessage();
    };

    // Delete a photo
    const handleDelete = (id) => {
        dispatch(deletePhoto(id));

        resetComponentMessage();
    };

    // Show or hide forms
    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle("hide");
        editPhotoForm.current.classList.toggle("hide");
    };

    // Update a photo
    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            id: editId,
            title: editTitle
        }

        dispatch(updatePhoto(photoData));

        resetComponentMessage();
    };

    // Open edit form
    const handleEdit = (photo) => {
        if(editPhotoForm.current.classList.contains("hide")) {
            hideOrShowForms();

        }

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    };

    const handleCancelEdit = () => {
        hideOrShowForms();

    };



    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='profile'>
            <header className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </header>
            {id == userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Titulo para a foto:</span>
                                <input type="text" placeholder='Insira um título' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && <button type="submit">Postar</button>}
                            {loadingPhoto && <button type="submit" disabled>Aguarde...</button>}
                        </form>
                    </div>
                    <div className="edit-photo hide" ref={editPhotoForm}>
                        <p>Editando:</p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                        <form onSubmit={handleUpdate}>
                            <input type="text" placeholder='Insira um novo título' onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />
                            <button type="submit">Atualizar</button>
                            <button className='cancel-btn' onClick={handleCancelEdit}>Cancelar edição</button>
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type="error" />}
                    {messagePhoto && <Message msg={messagePhoto} type="success" />}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos &&
                        photos.map((photo) => (
                            <div className="photo" key={photo._id}>
                                {photo.image && (
                                    <img
                                        src={`${uploads}/photos/${photo.image}`}
                                        alt={photo.title}
                                    />
                                )}
                                {id === userAuth._id ? (
                                    <div className="actions">
                                        <Link to={`/photos/${photo._id}`}>
                                            <BsFillEyeFill />
                                        </Link>
                                        <BsPencilFill onClick={() => handleEdit(photo)} />
                                        <BsXLg onClick={() => handleDelete(photo._id)} />
                                    </div>
                                ) : (
                                    <Link className="btn" to={`/photos/${photo._id}`}>
                                        Ver
                                    </Link>
                                )}
                            </div>
                        ))}
                    {photos.length === 0 && <p>Ainda não há fotos publicadas...</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile;