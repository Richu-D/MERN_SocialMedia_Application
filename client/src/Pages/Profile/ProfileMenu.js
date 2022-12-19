export default function ProfileMenu({option,setOption,followersCount,followingCount}) {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <div onClick={()=>{setOption("posts")}} className={`${(option==="posts")?"profile_menu_active":"hover1"}`}>
          Posts
        </div>
        <div onClick={()=>{setOption("about")}} className={`${(option==="about")?"profile_menu_active":"hover1"}`}>
          About
        </div>
        <div onClick={()=>{setOption("followers")}} className={`${(option==="followers")?"profile_menu_active":"hover1"}`}>
         Followers ({followersCount})
        </div>
        <div onClick={()=>{setOption("following")}} className={`${(option==="following")?"profile_menu_active":"hover1"}`}>
         Following ({followingCount})
        </div>
      </div>
    </div>
  );
}
