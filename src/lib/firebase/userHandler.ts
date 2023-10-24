import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
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

export const addUserToFirebase = (signUpData: UserData) => {
  auth
    .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
    .then(async (cred: any) => {
      let url = '';
      if (signUpData.dp?.name) {
        const storage = getStorage();
        const userImage = ref(
          storage,
          `users/display_pictures/${signUpData.dp.name}`,
        );
        url = await uploadBytes(userImage, signUpData.dp).then(
          async (snapshot) => await getDownloadURL(snapshot.ref),
        );
      }
      return { cred, url };
    })
    .then((res: any) => {
      return firestore.collection('users').doc(res.cred.user.uid).set({
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        phone: signUpData.phone,
        email: signUpData.email,
        address: signUpData.address,
        termsAcceptance: signUpData.termsAcceptance,
        dp: res.url,
        createdAt: new Date(),
      });
    })
    .then(() => {
      alert('Signed Up Successfuly');
    })
    .catch((err: any) => {
      alert(err);
    });
};

export const signInUserToFirebase = (signInData: SigninData) => {
  auth
    .signInWithEmailAndPassword(signInData.email, signInData.password)
    .then((res: any) => {
      alert('Signed In Successful');
    })
    .catch((err: any) => {
      alert('Email or Password in Incorrect');
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

export const updateThisUser = async (id: string, userData: any) => {
  const docRef = doc(firestore, 'users', id);
  let url = '';
  if (typeof userData.dp != 'string' && userData.dp?.name) {
    const storage = getStorage();
    const userImage = ref(
      storage,
      `users/display_pictures/${userData.dp.name}`,
    );
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
