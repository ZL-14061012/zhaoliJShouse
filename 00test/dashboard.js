// From component folder
import { Users } from '/users.js';
import { Issues } from '/issues.js';

// From layout folder
import { Header } from '/header.js';
import { Sidebar } from '/sidebar.js';


class Dashboard {

  loadDashboard(){

    // Create new instances
    const users = new Users();
    const issues = new Issues();
    const header = new Header();
    const sidebar = new Sidebar();

    console.log('Dashboard component is loaded');
  }

}

export { Dashboard } 
// export { Users } from '/users.js';
// export { Issues } from '/issues.js';

// // From layout folder
// export { Header } from '/header.js';
// export { Sidebar } from '/sidebar.js';
