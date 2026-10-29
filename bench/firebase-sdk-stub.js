// Minimal stand-in for the Firebase web SDK modules loaded from the CDN.
// Only used by the benchmarks so app modules can be imported in Node.
const noop = () => {};

export const initializeApp = () => ({});
export const getAuth = () => ({ currentUser: null });
export const getFirestore = () => ({});
export const getStorage = () => ({});
export class GoogleAuthProvider {}
export class RecaptchaVerifier {
  clear() {}
}

export const createUserWithEmailAndPassword = noop;
export const signInWithEmailAndPassword = noop;
export const signOut = noop;
export const onAuthStateChanged = noop;
export const updateProfile = noop;
export const signInWithRedirect = noop;
export const getRedirectResult = noop;
export const signInWithPhoneNumber = noop;

export const collection = noop;
export const doc = noop;
export const getDoc = noop;
export const setDoc = noop;
export const addDoc = async () => ({ id: "stub" });
export const updateDoc = noop;
export const query = noop;
export const where = noop;
export const orderBy = noop;
export const onSnapshot = () => noop;
export const serverTimestamp = noop;
