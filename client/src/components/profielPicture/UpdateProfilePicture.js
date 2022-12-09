
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import useInstance from "../../axios/axiosInstance";
import getCroppedImg from "../../helpers/getCroppedImg";
import BarLoader from "react-spinners/BarLoader";

export default function UpdateProfilePicture({ setImage, image, setError ,setShow ,setRefresh}) {
  
  const [success,setSuccess]= useState(null);
  const [err,setErr]= useState(null);
  const [loading,setLoading]= useState(false);
  const dispatch = useDispatch();
  const instance = useInstance()
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
          console.log("just show");
        } else {
          console.log("not show");
          console.log(img);

          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const updateProfielPicture = async () => {
    try {
      setLoading(true)
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      let formData = new FormData();
      formData.append("image", blob);
      formData.append("type", "profilePicture");
      formData.append( "text",description);
      const res = await instance.put("post/profilePic",formData)
      console.log("resposnse form update profile picture",res);

      if(res.status=== 201){
        setSuccess(res.data.message)
            setLoading(false)
            setTimeout(() => {
              dispatch({type:"UpdateProfile",payload: res?.data?.picture })
              setRefresh(prev => !prev)
              setShow(false)
            }, 1000);

      }
      
    } catch (error) {
      setLoading(false)
      setErr(true)
      setError(error.response.data.message);
    }
  };
  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <BarLoader color="#1876f2" loading={loading} width={"100%"} size={50} />
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>

      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="crop_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          {/* <i className="temp_icon"></i>Make Temporary */}
        </div>
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={()=>{setShow(prev => !prev)}}>Cancel</div>
        <button className="blue_btn" onClick={() => updateProfielPicture()}>
          Save
        </button>
      </div>
    </div>
  );
}
