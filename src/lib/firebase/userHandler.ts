import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, user } from '@/lib/firebase/firebase.config';

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
        address: signUpData.address,
        termsAcceptance: signUpData.termsAcceptance,
        dp: res.url,
      });
    })
    .then(() => {
      alert('Signed Up Successfuly');
    })
    .catch((err) => {
      alert(err);
    });
};

export const signInUserToFirebase = (signInData: SigninData) => {
  auth
    .signInWithEmailAndPassword(signInData.email, signInData.password)
    .then((res) => {
      alert('Signed In Successful');
    })
    .catch((err) => {
      alert('Email or Password in Incorrect');
    });
};
