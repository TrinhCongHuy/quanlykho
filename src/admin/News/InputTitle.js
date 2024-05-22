import React, { useState } from 'react';

const InputTitle = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(toSlug(newTitle));
  };

  return (
    <div className=" flex flex-col gap-3 my-3">
      <input
        type="text"
        id="title"
        className="form-control outline-none border rounded-lg p-2"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        id="slug"
        className="form-control border rounded-lg p-2 outline-none"
        placeholder="Slug"
        value={slug}
        readOnly
      />
    </div>
  );
};

export function toSlug(text) {
  return text.toLowerCase()
  .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
  .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
  .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
  .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
  .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
  .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
  .replace(/đ/gi, 'd')
  .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
  .replace(/ /gi, "-")
  .replace(/\-\-\-\-\-/gi, '-')
  .replace(/\-\-\-\-/gi, '-')
  .replace(/\-\-\-/gi, '-')
  .replace(/\-\-/gi, '-')
  .replace(/\@\-|\-\@|\@/gi, '')
    .trim();
}

export default InputTitle