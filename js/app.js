// 마카롱팩토리 컬처핏 시뮬레이터 메인 로직
class CultureFitSimulator {
    constructor() {
        this.scenarioManager = new ScenarioManager();
        this.currentScenarioId = 'scenario1';
        this.messageQueue = [];
        this.isProcessing = false;
        this.applicantData = {
            name: "",
            email: "",
            startTime: new Date(),
            endTime: null,
            responses: [],
            scores: {},
            finalPercentage: 0
        };
        
        this.initializeApp();
    }

    initializeApp() {
        console.log('🚗 마카롱팩토리 컬처핏 시뮬레이터 시작!');
        
        // 지원자 정보 입력 모달 표시
        this.showApplicantInfoModal();
        
        // 이벤트 리스너 설정
        this.setupEventListeners();
    }

    showApplicantInfoModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🚗 마카롱팩토리 컬처핏 시뮬레이터</h3>
                <p>시뮬레이터 시작 전 간단한 정보를 입력해주세요.</p>
                <div class="input-group">
                    <label for="applicantName">이름 *</label>
                    <input type="text" id="applicantName" placeholder="홍길동" required>
                </div>
                <div class="input-group">
                    <label for="applicantEmail">이메일 (선택)</label>
                    <input type="email" id="applicantEmail" placeholder="hong@example.com">
                </div>
                <div class="modal-buttons">
                    <button class="start-button" onclick="window.cultureSimulator.startSimulator()">시뮬레이터 시작</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    startSimulator() {
        const nameInput = document.getElementById('applicantName');
        const emailInput = document.getElementById('applicantEmail');
        
        if (!nameInput.value.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }
        
        this.applicantData.name = nameInput.value.trim();
        this.applicantData.email = emailInput.value.trim();
        this.applicantData.startTime = new Date();
        
        // 모달 제거
        document.querySelector('.modal-overlay').remove();
        
        // 시작 메시지 표시
        this.showWelcomeMessage();
        
        // 첫 번째 시나리오 시작
        setTimeout(() => {
            this.startScenario(this.currentScenarioId);
        }, 2000);
    }

    showWelcomeMessage() {
        const welcomeMessage = {
            sender: "마카롱팩토리 시뮬레이터",
            avatar: "🚗",
            content: `안녕하세요 ${this.applicantData.name}님! 마카롱팩토리의 프로덕트 디자이너가 되어 실제 업무 상황을 체험해보세요. 각 상황에서 마카롱팩토리의 핵심가치에 맞는 선택을 해보시기 바랍니다.`,
            isUser: false
        };
        this.addMessage(welcomeMessage);
    }

    startScenario(scenarioId) {
        const scenario = this.scenarioManager.startScenario(scenarioId);
        if (!scenario) return;

        // 헤더 업데이트
        document.querySelector('.time').textContent = scenario.time;
        document.querySelector('.scenario-info').textContent = scenario.title;

        // 시나리오 소개 메시지
        const introMessage = {
            sender: "시나리오",
            avatar: "📋",
            content: `**${scenario.title}**\n\n${scenario.description}`,
            isUser: false
        };
        this.addMessage(introMessage);

        // 시나리오 메시지들 순차 표시
        setTimeout(() => {
            this.displayMessages(scenario.messages);
        }, 1000);
    }

    displayMessages(messages) {
        messages.forEach((message, index) => {
            setTimeout(() => {
                this.addMessage(message);
                if (index === messages.length - 1) {
                    // 마지막 메시지 후 선택지 표시
                    setTimeout(() => {
                        this.showChoices();
                    }, 1500);
                }
            }, message.delay);
        });
    }

    addMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isUser ? 'user' : ''}`;
        
        // 메시지 내용 포맷팅 (볼드 텍스트 지원)
        const formattedContent = message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${message.avatar}</div>
            <div class="message-content">
                <div class="message-sender">${message.sender}</div>
                <div>${formattedContent}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // 애니메이션
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
        
        this.scrollToBottom();
    }

    showChoices() {
        const scenario = this.scenarioManager.currentScenario;
        const choicesContainer = document.getElementById('choicesContainer');
        
        choicesContainer.innerHTML = '';
        choicesContainer.style.display = 'block';
        
        // 선택지 순서 랜덤 섞기 (Fisher-Yates 알고리즘)
        const shuffledChoices = [...scenario.choices];
        for (let i = shuffledChoices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
        }
        
        shuffledChoices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.className = 'choice-button';
            choiceButton.innerHTML = `
                <span class="choice-number">${index + 1}</span>
                ${choice.text}
            `;
            choiceButton.onclick = () => this.selectChoice(choice);
            
            // 키보드 단축키 지원
            choiceButton.setAttribute('data-key', index + 1);
            
            choicesContainer.appendChild(choiceButton);
        });
    }

    selectChoice(choice) {
        // 응답 데이터 저장
        this.applicantData.responses.push({
            scenarioId: this.currentScenarioId,
            scenarioTitle: this.scenarioManager.currentScenario.title,
            choiceId: choice.id,
            choiceText: choice.text,
            isCultureFit: choice.isCultureFit,
            points: choice.points,
            timestamp: new Date()
        });

        // 선택지 결과 처리
        const result = this.scenarioManager.selectChoice(choice.id);
        
        // 사용자 선택 메시지 추가
        const userMessage = {
            sender: "나 (Product Designer)",
            avatar: "PD",
            content: choice.text,
            isUser: true
        };
        this.addMessage(userMessage);
        

        
        // 컬처핏 피드백
        if (choice.isCultureFit) {
            setTimeout(() => {
                const feedbackMessage = {
                    sender: "컬처핏 분석",
                    avatar: "⭐",
                    content: "훌륭한 선택입니다! 마카롱팩토리의 핵심가치에 부합하는 답변이에요.",
                    isUser: false
                };
                this.addMessage(feedbackMessage);
            }, 500);
        }
        
        // 선택지 숨기기
        document.getElementById('choicesContainer').style.display = 'none';
        
        // AI 응답 추가
        setTimeout(() => {
            if (result.nextMessage) {
                this.addMessage(result.nextMessage);
            }
            
            // 다음 시나리오로 진행
            setTimeout(() => {
                this.proceedToNext();
            }, 2000);
        }, 1000);
    }

    proceedToNext() {
        const nextScenarioId = this.scenarioManager.getNextScenario();
        
        if (nextScenarioId) {
            this.currentScenarioId = nextScenarioId;
            
            // 시나리오 전환 메시지
            const transitionMessage = {
                sender: "시뮬레이터",
                avatar: "⏭️",
                content: "다음 상황으로 넘어갑니다...",
                isUser: false
            };
            this.addMessage(transitionMessage);
            
            setTimeout(() => {
                this.startScenario(this.currentScenarioId);
            }, 2000);
        } else {
            // 모든 시나리오 완료
            this.showFinalResult();
        }
    }



    showFinalResult() {
        this.applicantData.endTime = new Date();
        this.applicantData.scores = this.scenarioManager.getTotalScore();
        
        // 컬처핏 기반 점수 계산 - 모든 컬처핏 답변을 선택했을 때 100%가 되도록
        const cultureFitCount = this.applicantData.responses.filter(response => response.isCultureFit).length;
        const totalScenarios = 5;
        const culturePercentage = Math.round((cultureFitCount / totalScenarios) * 100);
        
        this.applicantData.finalPercentage = culturePercentage;

        // 최종 결과 메시지
        const resultMessage = {
            sender: "마카롱팩토리 컬처핏 분석",
            avatar: "🎯",
            content: `
                <h3>🚗 마카롱팩토리 컬처핏 결과</h3>
                <br>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong>총 컬처핏 점수: ${culturePercentage}%</strong>
                </div>
                <br>
                <div style="text-align: left;">
                    <strong>영역별 점수:</strong><br>
                    🚗 고객중심: ${this.applicantData.scores.customer}점<br>
                    🤝 파트너십: ${this.applicantData.scores.partnership}점<br>
                    💡 혁신: ${this.applicantData.scores.innovation}점<br>
                    📈 성장: ${this.applicantData.scores.growth}점<br>
                    ⚡ 효율성: ${this.applicantData.scores.efficiency}점
                </div>
                <br>
                <div style="background: ${culturePercentage >= 70 ? '#dcfce7' : '#fef3c7'}; padding: 15px; border-radius: 10px;">
                    <strong>${this.getCultureFitComment(culturePercentage)}</strong>
                </div>
            `,
            isUser: false
        };
        
        setTimeout(() => {
            this.addMessage(resultMessage);
            
            // 데이터 저장
            this.saveApplicantData();
            
            // 재시작 버튼 추가
            setTimeout(() => {
                this.showRestartButton();
            }, 2000);
        }, 1000);
    }

    async saveApplicantData() {
        // 새 데이터 준비
        const applicantResult = {
            id: Date.now(),
            ...this.applicantData,
            duration: this.applicantData.endTime - this.applicantData.startTime,
            createdAt: new Date().toISOString()
        };
        
        // Firestore에 저장 시도
        try {
            if (window.firestoreManager) {
                await window.firestoreManager.saveApplicant(applicantResult);
                console.log('✅ Firestore에 데이터 저장 완료:', applicantResult.id);
            } else {
                console.warn('⚠️ Firestore 매니저가 초기화되지 않음. localStorage만 사용.');
            }
        } catch (error) {
            console.error('❌ Firestore 저장 실패:', error);
            console.log('📦 localStorage에만 저장합니다.');
        }
        
        // 백업으로 로컬 스토리지에도 저장
        try {
            const existingData = JSON.parse(localStorage.getItem('macarong_applicants') || '[]');
            existingData.push(applicantResult);
            localStorage.setItem('macarong_applicants', JSON.stringify(existingData));
            console.log('📦 localStorage 백업 저장 완료');
        } catch (error) {
            console.error('❌ localStorage 저장도 실패:', error);
        }
        
        console.log('💾 지원자 데이터 저장 완료:', applicantResult);
    }

    getCultureFitComment(percentage) {
        if (percentage >= 85) {
            return "🌟 완벽한 매칭! 마카롱팩토리의 핵심가치와 100% 일치합니다. 당신은 이미 마카롱팩토리의 일원입니다!";
        } else if (percentage >= 70) {
            return "✨ 훌륭한 매칭! 마카롱팩토리에서 빛날 수 있는 충분한 잠재력을 가지고 있습니다.";
        } else if (percentage >= 55) {
            return "💪 좋은 잠재력! 마카롱팩토리의 문화를 더 이해하면 완벽한 핏이 될 수 있습니다.";
        } else {
            return "🤔 아직 마카롱팩토리의 문화를 더 알아가는 시간이 필요할 것 같습니다. 도전하는 정신은 이미 갖고 계시니 충분히 성장하실 수 있어요!";
        }
    }

    showRestartButton() {
        const chatMessages = document.getElementById('chatMessages');
        const restartDiv = document.createElement('div');
        restartDiv.className = 'message';
        restartDiv.innerHTML = `
            <div class="message-avatar">🔄</div>
            <div class="message-content">
                <button class="choice-button" onclick="location.reload()" style="margin: 0;">
                    다시 체험해보기
                </button>
            </div>
        `;
        
        chatMessages.appendChild(restartDiv);
        this.scrollToBottom();
    }

    setupEventListeners() {
        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            const choicesContainer = document.getElementById('choicesContainer');
            if (choicesContainer.style.display !== 'none') {
                // 숫자 키로 선택지 선택
                if (e.key >= '1' && e.key <= '5') {
                    const choices = choicesContainer.querySelectorAll('.choice-button');
                    const choiceIndex = parseInt(e.key) - 1;
                    if (choices[choiceIndex]) {
                        choices[choiceIndex].click();
                    }
                }
            }
        });

        // 모바일 터치 최적화
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('choice-button')) {
                e.target.style.transform = 'scale(0.98)';
            }
        });

        document.addEventListener('touchend', (e) => {
            if (e.target.classList.contains('choice-button')) {
                e.target.style.transform = '';
            }
        });
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.cultureSimulator = new CultureFitSimulator();
}); 