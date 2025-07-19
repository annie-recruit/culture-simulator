// Firebase 설정 및 초기화 (Compat 버전 - GitHub Pages 호환)
console.log('🔥 Firebase 설정 파일 로드 시작');

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyASXhHiYTQ2j0HA439YsI-Ac0eifkqxnGQ",
  authDomain: "culture-simulator.firebaseapp.com",
  projectId: "culture-simulator",
  storageBucket: "culture-simulator.firebasestorage.app",
  messagingSenderId: "76168310568",
  appId: "1:76168310568:web:2ee8915b2225b0f8df6a1d"
};

// Firestore 데이터베이스 함수들
class FirestoreManager {
    constructor(dbInstance) {
        this.db = dbInstance;
        this.applicantsCollection = 'applicants';
        console.log('📋 Firestore 매니저 초기화 완료');
    }

    // 지원자 데이터 저장
    async saveApplicant(applicantData) {
        try {
            console.log('💾 Firestore에 데이터 저장 시도:', applicantData.name);
            const docRef = await this.db.collection(this.applicantsCollection).add({
                ...applicantData,
                createdAt: new Date().toISOString(),
                timestamp: Date.now()
            });
            console.log("✅ Firestore에 데이터 저장 완료:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("❌ Firestore 저장 실패:", error);
            throw error;
        }
    }

    // 모든 지원자 데이터 가져오기
    async getAllApplicants() {
        try {
            console.log('📊 Firestore에서 모든 지원자 데이터 로드 시도');
            const querySnapshot = await this.db
                .collection(this.applicantsCollection)
                .orderBy('timestamp', 'desc')
                .get();
            
            const applicants = [];
            querySnapshot.forEach((doc) => {
                applicants.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            console.log("✅ Firestore 데이터 로드 완료:", applicants.length, "명");
            return applicants;
        } catch (error) {
            console.error("❌ Firestore 로드 실패:", error);
            throw error;
        }
    }

    // 실시간 데이터 청취 (관리자 대시보드용)
    onApplicantsChange(callback) {
        try {
            console.log('👂 Firestore 실시간 데이터 청취 시작');
            return this.db
                .collection(this.applicantsCollection)
                .orderBy('timestamp', 'desc')
                .onSnapshot((querySnapshot) => {
                    const applicants = [];
                    querySnapshot.forEach((doc) => {
                        applicants.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    console.log('🔄 실시간 데이터 업데이트:', applicants.length, '명');
                    callback(applicants);
                }, (error) => {
                    console.error("❌ 실시간 데이터 청취 실패:", error);
                });
        } catch (error) {
            console.error("❌ 실시간 데이터 청취 초기화 실패:", error);
            throw error;
        }
    }
}

// Firebase 초기화 (Compat 방식)
let db = null;

try {
    const app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    
    console.log('✅ Firebase 초기화 완료');
    console.log('📱 Firebase 앱 정보:', app.name, app.options.projectId);
    console.log('🏪 Firestore 인스턴스:', db.app.name);
    
    // Firebase 초기화 성공 후 Firestore 매니저 생성
    window.firestoreManager = new FirestoreManager(db);
    console.log('🌍 전역 Firestore 매니저 생성 완료');
    
    // 연결 테스트
    window.testFirestore = async () => {
        try {
            console.log('🧪 Firestore 연결 테스트 시작...');
            await db.collection('test').add({ timestamp: Date.now() });
            console.log('✅ Firestore 연결 테스트 성공!');
        } catch (error) {
            console.error('❌ Firestore 연결 테스트 실패:', error);
        }
    };
    
} catch (error) {
    console.error('❌ Firebase 초기화 실패:', error);
    window.firestoreManager = null;
} 