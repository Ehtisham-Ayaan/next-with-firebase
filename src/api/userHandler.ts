import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  getCountFromServer,
} from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase/firebase.config';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dp: any;
  password: string;
  confirmPassword: string;
  termsAcceptance: boolean;
};

type SigninData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const addUserToFirebase = async (signUpData: UserData) => {
  const response = await auth
    .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
    .then(async (cred: any) => {
      let url = '';
      if (signUpData.dp?.name) {
        const storage = getStorage();
        const userImage = ref(
          storage,
          `users/display_pictures/${signUpData.email}`,
        );
        url = await uploadBytes(userImage, signUpData.dp).then(
          async (snapshot) => await getDownloadURL(snapshot.ref),
        );
      }
      return { cred, url };
    })
    .then((res: any) => {
      const data = firestore.collection('users').doc(res.cred.user.uid).set({
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        phone: signUpData.phone,
        email: signUpData.email,
        address: signUpData.address,
        termsAcceptance: signUpData.termsAcceptance,
        dp: res.url,
        createdAt: new Date(),
      });
      return { data, res };
    })
    .then((user: any) => {
      return user.res.cred.user;
    })
    .catch((err: any) => {
      return err;
    });
  return response;
};

export const signInUserToFirebase = async (signInData: SigninData) => {
  const response = await auth
    .signInWithEmailAndPassword(signInData.email, signInData.password)
    .then((res: any) => {
      return res.user;
    })
    .catch((err: any) => {
      return err;
    });
  return response;
};

export const getSignedInUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user: any) => {
        unsubscribe();
        resolve(user);
      },
      reject, // pass up any errors attaching the listener
    );
  });
};

export const getAllUsers = async () => {
  const users = await getDocs(collection(firestore, 'users'))
    .then((res) => {
      return res;
    })
    .catch((error) => {
      alert(error);
    });
  const usersData: any = [];

  if (typeof users == 'object') {
    users.forEach((user: any) => {
      let date;
      if (user.data().createdAt) {
        date = new Date(user.data().createdAt?.seconds * 1000);
      } else {
        date = '';
      }
      usersData.push({
        id: user.id,
        date: date.toString(),
        ...user.data(),
      });
    });
  } else {
    alert('Please try again later');
  }

  return usersData;
};

export const updateThisUser = async (
  id: string,
  userData: any,
  email: string,
) => {
  const docRef = doc(firestore, 'users', id);
  let url = '';
  if (typeof userData.dp != 'string' && userData.dp?.name) {
    const storage = getStorage();
    const userImage = ref(storage, `users/display_pictures/${email}`);
    url = await uploadBytes(userImage, userData.dp).then(
      async (snapshot) => await getDownloadURL(snapshot.ref),
    );
  } else {
    url = userData.dp;
  }

  const updateUserData = {
    ...userData,
    dp: url,
  };

  updateDoc(docRef, updateUserData)
    .then((docRef) => {
      alert('User has been updated');
    })
    .catch((error) => {
      alert(error);
    });
};

export const totalUsers = async () => {
  const coll = collection(firestore, 'users');
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

export const logOutUser = async () => {
  auth
    .signOut()
    .then((res: any) => {})
    .catch((err: any) => {
      console.log(err);
    });
};
