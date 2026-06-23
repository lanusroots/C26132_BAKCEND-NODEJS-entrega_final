import db from '../config/firebase.js'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const productsCollection = collection(db, 'products')

const getAll = async () => {
  const snapshot = await getDocs(productsCollection)
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
}

const getById = async (id) => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  return { id: docSnap.id, ...docSnap.data() }
}

const create = async (productData) => {
  const docRef = await addDoc(productsCollection, productData)
  const newDoc = await getDoc(docRef)
  return { id: newDoc.id, ...newDoc.data() }
}

const update = async (id, productData) => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  await updateDoc(docRef, productData)
  const updatedDoc = await getDoc(docRef)
  return { id: updatedDoc.id, ...updatedDoc.data() }
}

const remove = async (id) => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  await deleteDoc(docRef)
  return { id }
}

export default { getAll, getById, create, update, remove }