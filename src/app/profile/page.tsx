/**
 * Main profile page that handles redirecting users
 * to the appropriate page based on authentication status
 */
import { ProfileRedirect } from "./components/ProfileRedirect";

/**
 * Profile page that redirects users based on their authentication status
 */
export default function ProfilePage() {
  return <ProfileRedirect />;
}
