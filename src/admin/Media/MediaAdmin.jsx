import React, { useState } from 'react';
import { database, storage, ref, set, push, storageRef, uploadBytes, getDownloadURL, serverTimestamp } from '../../App';

function MediaAdmin() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        } else {
            console.log("No image file selected.");
        }
    };

    const handleVideoUpload = (event) => {
        if (event.target.files[0]) {
            setVideo(event.target.files[0]);
        } else {
            console.log("No video file selected.");
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !title || !video) {
            alert("Please enter complete information");
            return;
        }

        // Upload image
        const imageRef = storageRef(storage, `images/${image.name}`);
        const imageSnapshot = await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageSnapshot.ref);

        // Upload video
        const videoRef = storageRef(storage, `videos/${video.name}`);
        const videoSnapshot = await uploadBytes(videoRef, video);
        const videoUrl = await getDownloadURL(videoSnapshot.ref);

        // Save to database
        const newsRef = push(ref(database, 'Media'));
        set(newsRef, {
            title: title,
            image: imageUrl,
            video: videoUrl,
            createdAt: serverTimestamp()
        }).then(() => {
            alert('Data uploaded successfully!');
        }).catch((error) => {
            alert('Failed to upload data: ' + error);
        });
    };

    return (
        <form className="space-y-6 border-2 p-6 bg-white rounded-lg" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
                <h1>Post Media</h1>
                <div className="flex flex-col gap-3 my-3">
                    <input
                        type="text"
                        id="title"
                        className="form-control outline-none border rounded-lg p-2"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="custom-file flex flex-col gap-3">
                    <label className='flex flex-col border rounded-lg p-3'>Upload cover image
                        <input type="file" className="form-control" onChange={handleImageUpload} /> 
                    </label>
                    <label className='flex flex-col border rounded-lg p-3'> Upload video
                        <input type="file" className="form-control" onChange={handleVideoUpload} />
                    </label>
                </div>
                <button type="submit" className='py-3 w-full bg-[#6366f1] text-white font-rob mt-4 rounded-lg'>Post</button>
            </div>
        </form>
    )
}

export default MediaAdmin;
