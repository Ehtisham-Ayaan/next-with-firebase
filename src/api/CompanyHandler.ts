import { auth, firestore } from '@/lib/firebase/firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { getSignedInUser } from './userHandler';

export const addNewCompany = async (companyData: any) => {
  const user = await getSignedInUser()
    .then((res: any) => {
      return res;
    })
    .catch((err) => {
      alert('Please Sign in again');
    });

  if (user.uid) {
    firestore
      .collection('companies')
      .doc()
      .set({
        userId: user.user.uid,
        name: companyData.name,
        phone: companyData.phone,
        address: companyData.address,
        createdAt: new Date(),
      })
      .then((res) => {
        alert('Company Added Successfuly');
      })
      .catch((err) => {
        alert('Some error occured. Try again later');
      });
  } else {
    alert(user.error);
  }
};

export const updateThisCompany = (companyId: string, companyData: any) => {
  const docRef = doc(firestore, 'companies', companyId);

  updateDoc(docRef, companyData)
    .then((docRef) => {
      alert('Company has been updated');
    })
    .catch((error) => {
      alert(error);
    });
};

export const getUserCompanies = async () => {
  const user = await getSignedInUser().then((res: any) => {
    return res;
  });

  const companiesData: any = [];
  if (user?.uid) {
    const customQuery = query(
      collection(firestore, 'companies'),
      where('userId', '==', user.uid),
    );

    const querySnapshot = await getDocs(customQuery)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert(error);
      });

    if (typeof querySnapshot == 'object') {
      querySnapshot.forEach((company: any) => {
        let date;
        if (company.data().createdAt) {
          date = new Date(company.data().createdAt?.seconds * 1000);
        } else {
          date = '';
        }
        companiesData.push({
          id: company.id,
          date: date.toString(),
          ...company.data(),
        });
      });
    } else {
      alert('Please try again later');
    }
  }
  return companiesData;
};

export const totalCompanies = async () => {
  const coll = collection(firestore, 'companies');
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
