<template>
  <div class="w-full">
    <div class="bg-teal-600 z-[-1] w-full h-[225px] fixed top-0"></div>
    <div
      class="bg-[#191919] z-[-1] w-full h-[calc(100vh-225px)] fixed bottom-0"
    ></div>

    <div class="max-w-xl mx-auto">
      <div class="mt-10 flex items-center w-full">
        <img width="40" src="Capybara-logo.png" alt="" />
        <div class="font-semibold text-gray-100 ml-6">WHATSAPP WEB</div>
      </div>

      <div class="bg-white z-10 p-24 m-6 mt-10">
        <div class="text-center text-4xl text-gray-700 font-light pb-10">
          WhatsApp Clone
        </div>
        <div class="w-full flex justify-center bg-red p-3 rounded-md">
          <button @click="login" >Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { 
  setDoc,
  doc,
  collection, 
  getFirestore,
} from 'firebase/firestore';


const login = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider).then(async (res) => {
        console.log(res.user)
        const docRef = doc(collection(getFirestore(), "users"))
        await setDoc(docRef, {
          email: res.user.email,
          picture: res.user.photoURL,
          firstName: res.user.displayName,
          sub: docRef.id
        })
        setTimeout(() => { router.push('/') }, 200)
    })
}

</script>

<style lang="scss" scoped></style>
