// 마카롱팩토리 컬처핏 시나리오 데이터
const scenarios = {
    // 시나리오 1: 정비소 파트너 불만 처리
    scenario1: {
        id: 1,
        title: "정비소 파트너 불만 해결",
        time: "09:30 AM",
        description: "정비소 파트너가 마이클 앱의 수수료 정책에 불만을 제기했습니다.",
        messages: [
            {
                id: 1,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "어제 강남구 정비소 사장님이 연락을 주셨어요. 마이클 앱 수수료가 타 플랫폼 대비 높다고 하시면서, 계약 재검토를 요청하셨습니다. 이미 5년간 함께 해온 파트너인데... 어떻게 접근하면 좋을까요?",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "민지 (iOS Developer)",
                avatar: "DEV",
                content: "기술적으로는 수수료율 조정이 어렵지 않아요. 하지만 다른 파트너들과의 형평성 문제가 있을 것 같은데요?",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "맞아요. 그런데 이 파트너는 매월 예약량이 상위 10% 안에 드는 우수 파트너거든요. 어떤 방향으로 해결하면 좋을까요?",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "1a",
                text: "먼저 파트너의 상황을 자세히 듣고, 장기적인 파트너십 관점에서 상생 방안을 모색해보겠습니다. 실적 기반 차등 수수료나 추가 혜택을 검토해보죠.",
                points: { customer: 8, partnership: 15, innovation: 5, growth: 8, efficiency: 5 },
                isCultureFit: true,
                nextMessage: {
                    sender: "지훈 (PO)",
                    avatar: "PO",
                    content: "좋은 접근이네요! 파트너십은 마카롱팩토리의 핵심 가치죠. 장기적인 관점에서 상생할 수 있는 방안을 찾아보겠습니다.",
                    isUser: false
                }
            },
            {
                id: "1b",
                text: "수수료 정책은 전체적인 비즈니스 전략이니까 쉽게 바꿀 수 없어요. 대신 마케팅 지원이나 다른 부가 서비스로 보상하는 건 어떨까요?",
                points: { customer: 3, partnership: 5, innovation: 5, growth: 3, efficiency: 8 },
                isCultureFit: false,
                nextMessage: {
                    sender: "민지 (iOS Developer)",
                    avatar: "DEV",
                    content: "음... 그것도 방법이긴 하지만, 파트너의 핵심 고민을 해결해주지는 못할 것 같아요.",
                    isUser: false
                }
            },
            {
                id: "1c",
                text: "다른 플랫폼 수수료율을 조사해서 시장 평균과 비교해보고, 우리 서비스의 차별화된 가치를 명확히 제시해보겠습니다.",
                points: { customer: 5, partnership: 8, innovation: 8, growth: 8, efficiency: 8 },
                isCultureFit: false,
                nextMessage: {
                    sender: "준호 (Server Developer)",
                    avatar: "DEV",
                    content: "데이터 기반 접근은 좋지만, 파트너의 감정적인 부분도 고려해야 할 것 같아요.",
                    isUser: false
                }
            }
        ]
    },

    // 시나리오 2: 고객 불편 사항 해결
    scenario2: {
        id: 2,
        title: "고객 피드백 - 예약 취소 불편",
        time: "10:45 AM",
        description: "고객들이 예약 취소 과정이 복잡하다는 피드백을 지속적으로 제기하고 있습니다.",
        messages: [
            {
                id: 1,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "CS팀에서 보고받은 건인데, 최근 한 달간 예약 취소 관련 문의가 30% 증가했어요. 고객들이 취소 과정이 복잡하다고 하네요. 현재는 앱에서 취소하려면 정비소에 전화 확인 후 처리되는 구조잖아요?",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "민지 (iOS Developer)",
                avatar: "DEV",
                content: "기술적으로는 원클릭 취소가 가능해요. 하지만 정비소 입장에서는 갑작스러운 취소로 인한 손실을 걱정할 수 있어요.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "맞아요. 고객 편의성과 파트너 보호, 둘 다 중요한 문제네요. 어떻게 균형을 맞출 수 있을까요?",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "2a",
                text: "고객 입장에서 생각해보면 간편한 취소가 필요해요. 시간대별 차등 취소 정책을 만들어서 24시간 전에는 무료 취소, 그 이후는 일정 수수료를 적용하는 건 어떨까요?",
                points: { customer: 15, partnership: 8, innovation: 10, growth: 5, efficiency: 10 },
                isCultureFit: true,
                nextMessage: {
                    sender: "지훈 (PO)",
                    avatar: "PO",
                    content: "훌륭해요! 고객 중심적 사고네요. 고객과 파트너 모두를 고려한 균형잡힌 해결책이에요.",
                    isUser: false
                }
            },
            {
                id: "2b", 
                text: "정비소 파트너들의 손실을 최소화하는 게 우선이에요. 현재 정책을 유지하되 CS 응답 시간을 단축시키는 방향으로 개선해보죠.",
                points: { customer: 3, partnership: 10, innovation: 3, growth: 3, efficiency: 5 },
                isCultureFit: false,
                nextMessage: {
                    sender: "민지 (iOS Developer)",
                    avatar: "DEV",
                    content: "파트너 보호는 중요하지만, 고객 경험이 악화되면 장기적으로 모두에게 손해가 될 수 있어요.",
                    isUser: false
                }
            },
            {
                id: "2c",
                text: "사용자 리서치를 통해 정확한 취소 패턴과 이유를 분석한 후, 데이터 기반으로 최적의 정책을 수립해보겠습니다.",
                points: { customer: 8, partnership: 5, innovation: 8, growth: 8, efficiency: 5 },
                isCultureFit: false,
                nextMessage: {
                    sender: "준호 (Server Developer)",
                    avatar: "DEV",
                    content: "체계적인 접근이지만, 고객들이 지금 당장 불편을 겪고 있다는 점도 고려해야 해요.",
                    isUser: false
                }
            }
        ]
    },

    // 시나리오 3: 혁신적인 기능 제안
    scenario3: {
        id: 3,
        title: "AI 기반 정비 진단 기능 제안",
        time: "14:30 PM",
        description: "개발팀에서 AI를 활용한 정비 사전 진단 기능을 제안했습니다.",
        messages: [
            {
                id: 1,
                sender: "준호 (Server Developer)",
                avatar: "DEV",
                content: "최근 ChatGPT나 Claude 같은 AI가 발전하면서, 마이클 앱에도 AI 기능을 도입해보면 어떨까 생각했어요. 고객이 차량 증상을 설명하면 AI가 예상 정비 항목과 비용을 미리 알려주는 기능이요.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "민지 (iOS Developer)",
                avatar: "DEV",
                content: "기술적으로 흥미로운 아이디어네요! 하지만 AI가 잘못 진단하면 고객이나 정비소 모두 곤란할 수 있어요. 책임 소재도 애매하고...",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "혁신적인 아이디어지만 신중하게 접근해야 할 것 같아요. 프로덕트 디자이너 관점에서는 어떻게 생각하세요?",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "3a",
                text: "아직은 리스크가 너무 커요. AI 진단이 틀렸을 때의 법적 책임 문제나 정비소와의 관계 악화 가능성을 고려하면, 지금은 시기상조인 것 같아요.",
                points: { customer: 3, partnership: 8, innovation: 2, growth: 3, efficiency: 5 },
                isCultureFit: false,
                nextMessage: {
                    sender: "준호 (Server Developer)",
                    avatar: "DEV",
                    content: "리스크 관리는 중요하지만, 혁신 없이는 경쟁에서 뒤처질 수도 있어요.",
                    isUser: false
                }
            },
            {
                id: "3b",
                text: "정말 혁신적인 아이디어네요! 고객에게 큰 가치를 줄 수 있어요. 정확도 문제는 '참고용'이라고 명시하고, 단계적으로 도입해보면 어떨까요? MVP부터 시작해서 피드백을 받아가며 개선하죠.",
                points: { customer: 10, partnership: 5, innovation: 15, growth: 10, efficiency: 8 },
                isCultureFit: true,
                nextMessage: {
                    sender: "지훈 (PO)",
                    avatar: "PO",
                    content: "좋아요! 혁신에 대한 적극적인 자세가 마카롱팩토리다워요. 단계적 접근으로 리스크도 관리할 수 있겠네요.",
                    isUser: false
                }
            },
            {
                id: "3c",
                text: "시장 조사를 먼저 해보겠습니다. 경쟁사들의 AI 도입 현황과 고객 니즈를 파악한 후 ROI를 계산해서 의사결정하는 게 좋겠어요.",
                points: { customer: 5, partnership: 5, innovation: 5, growth: 8, efficiency: 8 },
                isCultureFit: false,
                nextMessage: {
                    sender: "민지 (iOS Developer)",
                    avatar: "DEV",
                    content: "체계적인 접근은 좋지만, 너무 분석만 하다가 기회를 놓칠 수도 있어요.",
                    isUser: false
                }
            }
        ]
    },

    // 시나리오 4: 효율성 개선 제안
    scenario4: {
        id: 4,
        title: "예약 프로세스 간소화",
        time: "16:00 PM",
        description: "현재 예약 과정이 너무 복잡해서 이탈률이 높다는 데이터가 나왔습니다.",
        messages: [
            {
                id: 1,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "GA 데이터를 보니까 예약 퍼널에서 이탈률이 65%나 돼요. 특히 차량 정보 입력 단계에서 많이 이탈하더라고요. 현재는 7단계를 거쳐야 예약이 완료되는데, 너무 복잡한 것 같아요.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "민지 (iOS Developer)",
                avatar: "DEV",
                content: "기술적으로는 단계를 줄일 수 있어요. 하지만 정비소에서 정확한 정보를 원하기 때문에 현재 구조가 된 거잖아요. 정보가 부족하면 정비소에서 다시 문의 전화를 해야 하고...",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "딜레마네요. 고객 편의성과 정보 정확성, 어떻게 균형을 맞출 수 있을까요?",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "4a",
                text: "정비소에서 정확한 정보를 원하는 이유가 있을 거예요. 현재 프로세스를 유지하되, UI/UX를 개선해서 입력 편의성을 높이는 방향으로 가보죠.",
                points: { customer: 5, partnership: 10, innovation: 3, growth: 3, efficiency: 5 },
                isCultureFit: false,
                nextMessage: {
                    sender: "민지 (iOS Developer)",
                    avatar: "DEV",
                    content: "안전한 접근이지만, 근본적인 문제 해결은 되지 않을 것 같아요.",
                    isUser: false
                }
            },
            {
                id: "4b",
                text: "A/B 테스트를 통해 단계별로 최적화해보겠습니다. 각 단계별 이탈 원인을 분석하고 데이터 기반으로 개선점을 찾아보죠.",
                points: { customer: 8, partnership: 5, innovation: 5, growth: 8, efficiency: 8 },
                isCultureFit: false,
                nextMessage: {
                    sender: "준호 (Server Developer)",
                    avatar: "DEV",
                    content: "데이터 기반 접근은 좋지만, 현재 65% 이탈률은 시급히 해결해야 할 문제예요.",
                    isUser: false
                }
            },
            {
                id: "4c",
                text: "고객 입장에서는 빠른 예약이 최우선이에요. 필수 정보만 받고 나머지는 선택사항으로 만들거나, 스마트폰 번호판 인식 기능을 활용해서 자동 입력되도록 하면 어떨까요?",
                points: { customer: 12, partnership: 5, innovation: 10, growth: 8, efficiency: 15 },
                isCultureFit: true,
                nextMessage: {
                    sender: "지훈 (PO)",
                    avatar: "PO",
                    content: "효율성과 고객 중심 사고가 돋보이네요! 기술로 사용자 경험을 개선하는 마카롱팩토리다운 접근이에요.",
                    isUser: false
                }
            }
        ]
    },

    // 시나리오 5: 성장을 위한 새로운 시장 진출
    scenario5: {
        id: 5,
        title: "전기차 정비 시장 진출",
        time: "17:15 PM",
        description: "전기차 보급 확산에 따라 전기차 정비 시장 진출을 검토하고 있습니다.",
        messages: [
            {
                id: 1,
                sender: "지훈 (PO)",
                avatar: "PO",
                content: "전기차 시장이 급성장하고 있어요. 정부에서도 2030년까지 전기차 300만대 보급을 목표로 하고 있고요. 마이클도 전기차 정비 시장에 진출을 고려해야 할 때인 것 같아요.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "준호 (Server Developer)",
                avatar: "DEV",
                content: "전기차 정비는 일반 차량과 완전히 달라요. 고전압 시스템이라 자격증이 있는 정비사만 작업할 수 있고, 정비소도 특별한 장비가 필요하고요.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "민지 (iOS Developer)",
                avatar: "DEV",
                content: "맞아요. 그리고 전기차 정비소는 아직 많지 않아서 파트너 확보부터 쉽지 않을 것 같은데요.",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "5a",
                text: "아직은 리스크가 너무 커요. 전기차 시장이 성숙해질 때까지 기존 사업에 집중하고, 시장이 안정화된 후에 진출하는 게 안전할 것 같아요.",
                points: { customer: 3, partnership: 5, innovation: 2, growth: 3, efficiency: 8 },
                isCultureFit: false,
                nextMessage: {
                    sender: "준호 (Server Developer)",
                    avatar: "DEV",
                    content: "안전한 접근이지만, 그때가 되면 이미 경쟁이 치열해져 있을 수도 있어요.",
                    isUser: false
                }
            },
            {
                id: "5b",
                text: "시장 조사부터 체계적으로 해보겠습니다. 전기차 보급률, 정비 수요, 경쟁 현황을 분석하고 비즈니스 모델을 수립한 후 진출 여부를 결정하죠.",
                points: { customer: 5, partnership: 5, innovation: 5, growth: 8, efficiency: 8 },
                isCultureFit: false,
                nextMessage: {
                    sender: "민지 (iOS Developer)",
                    avatar: "DEV",
                    content: "체계적인 접근은 좋지만, 기회는 기다려주지 않을 수도 있어요.",
                    isUser: false
                }
            },
            {
                id: "5c",
                text: "미래 성장을 위해서는 필수적인 진출이에요! 어려움이 있더라도 지금부터 준비해야 합니다. 전기차 정비 자격증을 가진 정비소들을 먼저 파악하고, 단계적으로 파트너십을 구축해보죠.",
                points: { customer: 8, partnership: 10, innovation: 10, growth: 15, efficiency: 5 },
                isCultureFit: true,
                nextMessage: {
                    sender: "지훈 (PO)",
                    avatar: "PO",
                    content: "성장에 대한 적극적인 마인드가 좋네요! 미래를 준비하는 마카롱팩토리의 자세예요.",
                    isUser: false
                }
            }
        ]
    }
};

// 시나리오 매니저
class ScenarioManager {
    constructor() {
        this.currentScenario = null;
        this.currentStep = 0;
        this.completedScenarios = [];
        this.totalScore = {
            customer: 0,
            partnership: 0,
            innovation: 0,
            growth: 0,
            efficiency: 0
        };
    }

    startScenario(scenarioId) {
        this.currentScenario = scenarios[scenarioId];
        this.currentStep = 0;
        return this.currentScenario;
    }

    selectChoice(choiceId) {
        const scenario = this.currentScenario;
        const choice = scenario.choices.find(c => c.id === choiceId);
        
        if (choice) {
            // 점수 업데이트
            Object.keys(choice.points).forEach(key => {
                this.totalScore[key] += choice.points[key];
            });
            
            return {
                choice: choice,
                nextMessage: choice.nextMessage,
                isCultureFit: choice.isCultureFit
            };
        }
        
        return null;
    }

    getNextScenario() {
        const scenarioKeys = Object.keys(scenarios);
        const currentIndex = scenarioKeys.findIndex(key => scenarios[key].id === this.currentScenario?.id);
        
        if (currentIndex < scenarioKeys.length - 1) {
            return scenarioKeys[currentIndex + 1];
        }
        
        return null;
    }

    getTotalScore() {
        return this.totalScore;
    }

    getCultureFitPercentage() {
        const total = Object.values(this.totalScore).reduce((sum, score) => sum + score, 0);
        const maxPossible = this.completedScenarios.length * 15 * 5; // 최대 15점 * 5개 영역
        return Math.round((total / maxPossible) * 100) || 0;
    }

    // Firestore에 결과 저장
    async saveResultToFirestore(applicantData) {
        try {
            if (window.firestoreManager) {
                const resultData = {
                    ...applicantData,
                    scores: this.totalScore,
                    finalPercentage: this.getCultureFitPercentage(),
                    responses: this.completedScenarios,
                    startTime: Date.now(),
                    endTime: Date.now()
                };
                
                const docId = await window.firestoreManager.saveApplicant(resultData);
                console.log('결과가 Firestore에 저장되었습니다:', docId);
                return docId;
            } else {
                console.warn('Firestore 매니저가 초기화되지 않았습니다.');
                return null;
            }
        } catch (error) {
            console.error('Firestore 저장 중 오류:', error);
            return null;
        }
    }
} 