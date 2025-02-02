"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Props {
  maxCount: number;
  name: string;
  label: string;
  listType: "text" | "picture" | "picture-card" | "picture-circle";
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<any>;
}

const App: React.FC<Props> = ({ maxCount, name, label, listType, setIsLoading, form }) => {
  // let fileList;
  const [fileList, setFileList] = useState<any[]>([]);
  const files = form.getFieldValue(name);
  useEffect(() => {
    // const fileList = Array.isArray(files) ? files : files ? [files] : [];
    if (Array.isArray(files)) {
      setFileList(files.filter((item) => item.url));
    } else if (files?.url) {
      setFileList([files]);
    } else {
      setFileList([]);
    }
  }, [form, name, files]);

  const customUpload = ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append("photo", file);
    setIsLoading(true);
    axios
      .post("/upload", formData)
      .then(({ data }) => {
        if (data) {
          onSuccess(data, file);
          const currentFiles = form.getFieldValue(name).filter((image: any) => image?.url) || [];
          const updatedFiles =
            currentFiles.length >= maxCount ? [...currentFiles.slice(1), data?.data] : [...currentFiles, data?.data];

          form.setFieldsValue({ [name]: updatedFiles });
        } else {
          throw new Error("No response data");
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        onError(error);
        toast.error("Upload failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePreview = (file: any) => {
    const imageUrl = file.url || file.preview;
    Swal.fire({
      imageUrl: imageUrl,
      imageAlt: "Preview",
      showConfirmButton: false,
      background: "white",
      padding: "0",
      width: "auto",
      heightAuto: false,
      customClass: {
        popup: "no-padding-swal",
        image: "no-margin-image",
      },
    });
  };

  return (
    <>
      <Form.Item name={name} label={label} layout="horizontal" getValueFromEvent={({ fileList }) => fileList}>
        <Upload
          fileList={fileList}
          customRequest={customUpload}
          onRemove={(file) => {
            const updatedFiles = fileList.filter((image: any) => image.uid !== file.uid);
            form.setFieldsValue({ [name]: updatedFiles });
            setFileList(updatedFiles);
            toast.success(`${file.name} file removed.`);
          }}
          supportServerRender={true}
          listType={listType}
          maxCount={maxCount + 1}
          onChange={({ file }) => {
            if (file.status === "error") toast.error(`${file.name} file upload failed.`);
          }}
          onPreview={handlePreview}
        >
          <Button disabled={false} icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Form.Item>
    </>
  );
};

export default App;
