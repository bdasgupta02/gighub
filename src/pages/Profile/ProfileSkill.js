import "./profile.css"
const ProfileSkill = (props) => {
  const { text } = props;

  return (
    <div id = "ProfilePageSkill">
      <span>{text}</span>
    </div>
  );
};

export default ProfileSkill;