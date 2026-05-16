// Firebase Authentication Manager
import {
    auth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from './firebase-config.js';

// Admin emails (these emails can access admin panel)
const ADMIN_EMAILS = [
    'chethanmalode.1si16is016@gmail.com',
    'fireworksmadhu@gmail.com',
    'manish.vadhone@gmail.com'
];

// Check if email is admin
function isAdminEmail(email) {
    return ADMIN_EMAILS.includes(email.toLowerCase());
}

// Login function
async function adminLogin(email, password) {
    try {
        if (!isAdminEmail(email)) {
            return { success: false, error: 'Unauthorized email. Only admin can login.' };
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. Please try again.';

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password.';
                break;
        }

        return { success: false, error: errorMessage };
    }
}

// Logout function
async function adminLogout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

// Check if user is logged in
function isLoggedIn() {
    return auth.currentUser !== null && isAdminEmail(auth.currentUser.email);
}

// Get current user
function getCurrentUser() {
    return auth.currentUser;
}

// Auth state listener
function onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (user && isAdminEmail(user.email)) {
            callback(user);
        } else {
            callback(null);
        }
    });
}

export {
    adminLogin,
    adminLogout,
    isLoggedIn,
    getCurrentUser,
    onAuthChange,
    ADMIN_EMAILS,
    isAdminEmail
};
