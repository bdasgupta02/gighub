import "./profile.css"
const ProfileSKill = (props) => {
  const { text } = props;

  return (
    <div id = "ProfilePageSkill">
      <span>{text}</span>
    </div>
  );
};

export default ProfileSKill;