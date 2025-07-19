// Firebase 설정 및 초기화
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

// Firebase 설정 (실제 값으로 교체해주세요)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com", 
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore 데이터베이스 함수들
class FirestoreManager {
    constructor() {
        this.db = db;
        this.applicantsCollection = 'applicants';
    }

    // 지원자 데이터 저장
    async saveApplicant(applicantData) {
        try {
            const docRef = await addDoc(collection(this.db, this.applicantsCollection), {
                ...applicantData,
                createdAt: new Date().toISOString(),
                timestamp: Date.now()
            });
            console.log("지원자 데이터 저장 완료:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("지원자 데이터 저장 실패:", error);
            throw error;
        }
    }

    // 모든 지원자 데이터 가져오기
    async getAllApplicants() {
        try {
            const q = query(
                collection(this.db, this.applicantsCollection), 
                orderBy('timestamp', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const applicants = [];
            
            querySnapshot.forEach((doc) => {
                applicants.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            console.log("지원자 데이터 로드 완료:", applicants.length, "명");
            return applicants;
        } catch (error) {
            console.error("지원자 데이터 로드 실패:", error);
            throw error;
        }
    }

    // 실시간 데이터 청취 (관리자 대시보드용)
    async onApplicantsChange(callback) {
        try {
            const q = query(
                collection(this.db, this.applicantsCollection),
                orderBy('timestamp', 'desc')
            );
            
            return onSnapshot(q, (querySnapshot) => {
                const applicants = [];
                querySnapshot.forEach((doc) => {
                    applicants.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(applicants);
            });
        } catch (error) {
            console.error("실시간 데이터 청취 실패:", error);
            throw error;
        }
    }
}

// 전역 Firestore 매니저 인스턴스
window.firestoreManager = new FirestoreManager();

export { FirestoreManager, db }; 