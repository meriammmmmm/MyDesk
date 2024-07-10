import CredentialUpdate from './components/CredentialUpdate/CredentialUpdate'
import PasswordUpdate from './components/PasswordUpdate/PasswordUpdate'

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-forms">
        <div className="profile-update-container">
          <h2 className="profile-update-title">Update your Profile:</h2>
          <CredentialUpdate />
        </div>
        <div className="password-update-container">
          <h2 className="profile-update-title">Update your Password:</h2>
          <PasswordUpdate isReset={false} />
        </div>
      </div>
    </div>
  )
}

export default Profile
