**Mizban Delivery Frontend**

**Tech Stack:**
* Core: React.js
* Styling: Tailwind CSS 
* State Management: Zustand 

**Folder structure:**
```text
src/
├── assets/     # Images, icons, and global CSS
├── components/ # Reusable UI components (Buttons, Inputs, Modals)
│ ├── common/   # Components used everywhere
│ ├── admin/    # UI components specific to Admin views
│ └── business/ # UI components specific to Business views
├── hooks/      # Custom React hooks (e.g., useAuth, useDebounce)
├── pages/      # Main route components
│ ├── admin/    # Admin-only pages (Dashboard, Reports)
│ ├── business/ # Business-only pages (Orders, Profile)
│ └── public/   # Login, Register, Landing Page
├── services/   # API calls and Axios configurations
├── store/      # Zustand state management slices
├── utils/      # Helper functions (date formatting, validation)
```
