import { UserProfile } from '/user-profile.js';

class Header {

  loadHeader() {
    // Creata a new instance
    const userProfile = new UserProfile(); 
    
    // Invoke the method (component)
    userProfile.loadUserProfile();
    
    // Output loading status
    console.log('Header component is loaded...')
  }
  
}

export { Header };