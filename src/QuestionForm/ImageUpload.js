import React from "react";

function ImageUpload({ target }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadToCloudinary = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_exam_upload");

      const cloudName = "dlfq0hngz";
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    };

    const insertAtCursor = (textarea, textToInsert) => {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      return (
        value.substring(0, start) +
        textToInsert +
        value.substring(end, value.length)
      );
    };

    try {
      const imageUrl = await uploadToCloudinary(file);
      const markdown = `![ảnh](${imageUrl})`;
      const inputId = target === "ques" ? "ques-input" : "explain-input";
      const textarea = document.getElementById(inputId);
      if (textarea) {
        const updated = insertAtCursor(textarea, markdown);
        textarea.value = updated;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch (error) {
      console.error("Upload thất bại:", error);
      alert("Không thể upload ảnh lên Cloudinary.");
    }
  };

  return <input type="file" accept="image/*" onChange={handleUpload} />;
}

export default ImageUpload;
