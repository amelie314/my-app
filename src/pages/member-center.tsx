/** @format */

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { auth, db, storage } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FavoriteReviews from "../components/FavoriteReviews";

const MemberPage = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(""); // 用戶顯示名稱
  const [username, setUsername] = useState(""); // 用戶名
  const [bio, setBio] = useState(""); // 個人簡介
  const [favorites, setFavorites] = useState<string[]>([]); // 用戶收藏列表
  // 新增狀態用於儲存選擇的圖片檔案
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState(
    user?.photoURL || "default-profile.png"
  );

  const handleImageUpload = async () => {
    if (!selectedFile) {
      return;
    }
    try {
      if (user) {
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        const uploadTask = await uploadBytes(storageRef, selectedFile);

        // Rest of your code
        const downloadURL = await getDownloadURL(uploadTask.ref);
        setProfilePicUrl(downloadURL); // 更新頭像的 URL
        // 如果需要，也可以在這裡更新 Firebase auth 中的 photoURL
        await updateProfile(user, { photoURL: downloadURL });
      } else {
        // Handle the case when 'user' is null or undefined
        console.error("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }

    setSelectedFile(null); // 清除已選擇的檔案
  };

  const validateUsername = (username) => {
    // 正則表達式用於檢查用戶名稱是否只包含字母、數字及標點符號
    const regex = /^[a-zA-Z0-9.\-_]+$/;
    return regex.test(username);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    // 驗證 username
    if (!validateUsername(username)) {
      alert(
        "用戶名稱格式不正確，只能包含字母、數字及標點符號（例如：username.123）。"
      );
      return;
    }
    if (user) {
      try {
        // 更新 displayName
        await updateProfile(user, { displayName });

        // 更新用戶名和個人簡介
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          username,
          bio,
          displayName,
        });

        alert("個人資料更新成功！");
      } catch (error) {
        alert(`更新失敗：${error.message}`);
        console.error("更新錯誤：", error);
      }
    } else {
      alert("用戶未登錄，無法更新個人資料。");
    }
  };

  useEffect(() => {
    if (user) {
      // 獲取用戶收藏的評論
      const fetchFavorites = async () => {
        const favoritesRef = collection(db, "userFavorites");
        const q = query(favoritesRef, where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const favoritesData: string[] = [];
        querySnapshot.forEach((doc) => {
          favoritesData.push(doc.data().reviewId); // 儲存收藏的評論ID
        });

        // 更新 favorites 狀態
        setFavorites(favoritesData);
      };

      fetchFavorites();
    }
  }, [user]);

  // 取消收藏的處理函數
  const handleRemoveFavorite = async (reviewId) => {
    // 根据 reviewId 来定位 Firestore 中的记录
    const favoriteRef = doc(db, "userFavorites", reviewId);

    try {
      // 刪除紀錄
      await deleteDoc(favoriteRef);
      // 更新组件狀態以移除取消收藏的評論
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favoriteReviewId) => favoriteReviewId !== reviewId
        )
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };
  // 加載當前用戶資料
  useEffect(() => {
    // 假設您的用戶資料存儲在 Firestore 的 'users' 集合中
    // 請確保這部分邏輯與您的資料結構一致
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef); // 使用 getDoc 函數來獲取文檔
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setDisplayName(userData.displayName);
          setUsername(userData.username);
          setBio(userData.bio);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="bg-primary-color text-white p-8 ">
      <div className="flex flex-col items-center">
        {/* 大頭貼和用戶名稱 */}
        <div className="flex items-center">
          {" "}
          {/* 使用 flex 布局 */}
          <img
            src={user?.photoURL ? user.photoURL : profilePicUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover object-center mr-4" // 圖片類別
          />
          <div>
            {" "}
            {/* 新 div 包裹用戶名稱和按鈕 */}
            <span className="block text-lg text-white mb-2">
              {username}
            </span>{" "}
            {/* 用戶名稱 */}
            <div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="hidden" // 隱藏 input
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer text-sm text-green-500  rounded ${
                  selectedFile ? "hidden" : "block"
                } `} // 根據是否選擇了檔案來顯示或隱藏
              >
                選擇檔案
              </label>
              {selectedFile && (
                <button
                  onClick={handleImageUpload}
                  className="text-sm bg-blue-500 text-white py-1 px-4 rounded-lg mb-2"
                >
                  上傳檔案
                </button>
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleUpdate}
          className="mt-8 w-full max-w-xs space-y-3"
        >
          <div className="flex items-center space-x-2">
            <span className="text-me text-white">姓名</span>
            <input
              className="flex-1 text-black rounded-lg p-2"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="顯示名稱"
            />
          </div>
          <p className="text-sm text-gray-500">
            使用你為大眾所熟知的姓名／名稱，例如全名、暱稱。
          </p>
          <div className="flex items-center space-x-2 mb-1 ">
            <span className="text-me text-white">用戶名稱</span>
            <input
              className="flex-1 text-black rounded-lg p-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="用户名稱"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-me text-white">個人簡介</span>
            <textarea
              className="flex-1 text-black rounded-lg p-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="個人簡介"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-300 hover:bg-green-500 rounded-lg p-2"
          >
            更新資料
          </button>
        </form>
      </div>

      {/* 收藏的評論列表 */}
      <div className="mt-8">
        {user && (
          <>
            {/* ...其他组件 */}
            <FavoriteReviews
              favoriteReviewIds={favorites}
              currentUserId={user?.uid} // 確保這裡傳遞了當前用戶的ID
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MemberPage;
