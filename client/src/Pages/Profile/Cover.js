

import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useSelector,useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import useInstance from "../../axios/axiosInstance";

export default function Cover({setReloadPost}) {
  const dispatch = useDispatch();
  const instance = useInstance()
  const [coverPicture, setCoverPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const refInput = useRef(null);
  const cRef = useRef(null);
  const [error, setError] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, [window.innerWidth]);
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const coverRef = useRef(null);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, []);

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      let formData = new FormData();
      formData.append("image", blob);
      formData.append("type", "cover");
      const res = await instance.put("post/cover",formData)
      console.log("resposnse form update cover picture",res);

      if(res.status=== 201){
        
            setLoading(false)
            setTimeout(() => {
              dispatch({type:"UpdateCoverPic",payload: res?.data?.cover })
            }, 500);
          setCoverPicture("")
          setReloadPost(prev => !prev)
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Save the changes
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}>
              Cancel
            </button>
            <button className="blue_btn " onClick={() => updateCoverPicture()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="postError comment_error cover_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      { coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {user.cover && !coverPicture && (
        <img src={user.cover} className="cover" alt="" ref={cRef} />
      )}
    
        <div className="udpate_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => refInput.current.click()}>
              {user.cover 
              ? <>
              <i className="fa-solid fa-edit" />
              Edit Cover Photo
              </>
              : <>
            <i className="fa-solid fa-upload" />
            Upload Cover Photo
            </>
              }
          </div>
        </div>

    </div>
  );
}

