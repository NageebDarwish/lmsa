import { baseUrl } from "../../Api/Api";
import React, { useContext, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";
import { User } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function DashAboutUsPage() {
  const [disableButton, setDisableButton] = useState(true);
  const [oldContent, setOldContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const cookie = new Cookies();

  // Get Token
  const { auth } = useContext(User);

  // Upload Image

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            axios
              .post(`${baseUrl}/ck`, body, {
                headers: {
                  Authorization: "Bearer " + String(auth.Token),
                },
              })

              .then((res) => {
                resolve({
                  default: `${res.data.image}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  // Get Data

  useEffect(() => {
    fetch(`${baseUrl}/aboutL`)
      .then((res) => res.json())
      .then((data) => {
        setNewContent(data[0].description);
        setOldContent(data[0].description);
      })
      .then(() => setDisableButton(false));
  }, []);

  // Submit Form
  async function handleSubmit() {
    try {
      await axios.post(
        `${baseUrl}/aboutL/update/1`,
        { description: newContent },
        {
          headers: {
            Authorization: "Bearer " + String(auth.Token),
          },
        }
      );
      setSuccess(true);
      setErr(false);
      setOldContent(newContent);
    } catch (err) {
      setSuccess(false);
      if (err.response.status === 401) {
        cookie.remove("Bearer");
        window.location.pathname = "/dashboard";
      } else if (err.response.status === 422) {
        setErr("يجب ان يحتوي حقل هذه الصفحة على حرف على الأقل!");
      } else {
        setErr("حدث خطأ, يرجى إعادة المحاولة لاحقا");
      }
    }
  }
  return (
    <section className="m-4 w-100">
      <h2>تعديل معلومات صفحة عن الشركة</h2>
      <div style={{ width: "99%" }}>
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin],
            language: {
              // The UI will be English.
              ui: "en",

              // But the content will be edited in Arabic.
              content: "ar",
            },
          }}
          editor={ClassicEditor}
          data={newContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNewContent(data);
            if (err) {
              setErr(false);
            }
            if (success) {
              setSuccess(false);
            }
          }}
        />
      </div>
      <button
        disabled={disableButton || oldContent === newContent ? true : false}
        onClick={handleSubmit}
        className="btn btn-primary mt-5"
      >
        حفظ التعديلات
      </button>
      {success && (
        <div className="alert alert-primary mt-2" role="alert">
          تم الحفظ بنجاح
        </div>
      )}
      {err && (
        <div className="alert alert-danger mt-2" role="alert">
          {err}
        </div>
      )}
    </section>
  );
}
