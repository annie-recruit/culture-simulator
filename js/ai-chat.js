// 마카롱팩토리 AI 기반 대화 처리 시스템
class MacarongAIChatSystem {
    constructor() {
        this.conversationHistory = [];
        this.teamPersonalities = {
            po: {
                name: "지훈 (PO)",
                avatar: "PO",
                personality: "사용자 중심 사고, 데이터 기반 의사결정, 빠른 실행 추구",
                communication_style: "명확하고 구체적, 질문을 통한 방향 제시, 고객 가치 중심",
                cultural_values: ["고객중심", "효율성", "성장"],
                background: "마이클 앱 출시부터 함께한 베테랑 PO, 정비소 파트너와의 관계 중시"
            },
            designer: {
                name: "나 (Product Designer)",
                avatar: "PD", 
                personality: "사용자 경험 최우선, 혁신적 아이디어 추구, 디자인 시스템 고려",
                communication_style: "사용자 관점 제시, 창의적 해결책 제안, 협업 중시",
                cultural_values: ["고객중심", "혁신", "파트너십"],
                background: "사용자 리서치를 통한 인사이트 도출과 혁신적 UX 설계 전문"
            },
            ios_developer: {
                name: "민지 (iOS Developer)",
                avatar: "DEV",
                personality: "기술적 실현 가능성 중시, 효율적 구현 방법 고민, 사용자 경험 고려",
                communication_style: "기술적 제약사항 명시, 대안 제시, 협업적 접근",
                cultural_values: ["효율성", "혁신", "성장"],
                background: "iOS 네이티브 개발 5년 경력, 성능 최적화와 사용자 친화적 인터페이스 구현 전문"
            },
            server_developer: {
                name: "준호 (Server Developer)",
                avatar: "DEV",
                personality: "안정성과 확장성 중시, 시스템 아키텍처 고민, 데이터 기반 판단",
                communication_style: "기술적 근거 제시, 장기적 관점 강조, 체계적 접근",
                cultural_values: ["효율성", "성장", "파트너십"],
                background: "백엔드 시스템 설계 7년 경력, 대용량 트래픽 처리와 정비소 연동 시스템 구축 전문"
            }
        };
        
        this.cultureValues = {
            customer: {
                name: "고객중심",
                icon: "🚗",
                description: "2,500만 운전자의 불편함을 해결하고 편의를 제공하는 것이 최우선",
                keywords: ["사용자 경험", "고객 만족", "편의성", "접근성", "사용성"]
            },
            partnership: {
                name: "파트너십",
                icon: "🤝", 
                description: "3만 정비소 파트너와의 상생을 통해 생태계 전체가 성장",
                keywords: ["상생", "협력", "신뢰", "장기적 관계", "윈윈"]
            },
            innovation: {
                name: "혁신",
                icon: "💡",
                description: "기존 산업의 한계를 뛰어넘는 혁신적 솔루션 추구",
                keywords: ["창의성", "기술 혁신", "새로운 방법", "차별화", "미래 지향"]
            },
            growth: {
                name: "성장",
                icon: "📈",
                description: "3년 만에 매출 10배 성장을 이뤄낸 지속 가능한 성장 마인드",
                keywords: ["지속 성장", "확장", "발전", "기회 포착", "도전"]
            },
            efficiency: {
                name: "효율성",
                icon: "⚡",
                description: "빠르고 간편한 서비스로 고객과 파트너 모두의 시간과 노력 절약",
                keywords: ["속도", "간편함", "최적화", "자동화", "생산성"]
            }
        };
    }

    // 마카롱팩토리 대화 컨텍스트 생성
    generateContext(scenario, userChoice) {
        const context = {
            scenario: scenario.title,
            time: scenario.time,
            team_members: Object.keys(this.teamPersonalities),
            user_role: "Product Designer",
            user_choice: userChoice,
            company_culture: [
                "🚗 고객중심 - 2,500만 운전자의 편의를 최우선으로 생각하는 문화",
                "🤝 파트너십 - 3만 정비소와의 상생을 통한 생태계 성장",
                "💡 혁신 - 전통 정비 산업을 디지털로 혁신하는 도전 정신",
                "📈 성장 - 3년 만에 매출 10배 성장을 이뤄낸 지속 가능한 성장 마인드",
                "⚡ 효율성 - 빠르고 간편한 서비스로 모든 이해관계자의 시간 절약"
            ],
            company_info: {
                name: "마카롱팩토리",
                service: "마이클 - 차량관리 앱",
                users: "2,500만 운전자",
                partners: "3만 정비소",
                growth: "3년 만에 매출 38억에서 408억으로 성장",
                mission: "모든 운전자가 안전하고 편리하게 차량을 관리할 수 있는 세상",
                vision: "글로벌 1위 차량관리 플랫폼"
            },
            current_challenges: [
                "전기차 시장 확산에 따른 새로운 정비 수요",
                "고객 경험 개선을 통한 이탈률 감소",
                "정비소 파트너와의 지속 가능한 상생 모델",
                "AI/ML을 활용한 서비스 혁신",
                "글로벌 시장 진출 준비"
            ]
        };
        
        return context;
    }

    // 컬처핏 분석
    analyzeCultureFit(userChoice, scenarioContext) {
        const analysis = {
            culture_scores: {
                customer: 0,
                partnership: 0, 
                innovation: 0,
                growth: 0,
                efficiency: 0
            },
            reasoning: "",
            improvement_suggestions: []
        };

        // 키워드 기반 분석
        const choiceText = userChoice.toLowerCase();
        
        Object.keys(this.cultureValues).forEach(cultureKey => {
            const culture = this.cultureValues[cultureKey];
            let score = 0;
            
            culture.keywords.forEach(keyword => {
                if (choiceText.includes(keyword)) {
                    score += 2;
                }
            });
            
            // 컨텍스트 기반 추가 점수
            if (this.matchesScenarioContext(choiceText, cultureKey, scenarioContext)) {
                score += 3;
            }
            
            analysis.culture_scores[cultureKey] = Math.min(score, 10);
        });

        return analysis;
    }

    // 시나리오 컨텍스트와 문화 가치 매칭
    matchesScenarioContext(choiceText, cultureKey, scenario) {
        const contextMatchers = {
            customer: ["사용자", "고객", "편의", "경험", "만족"],
            partnership: ["파트너", "정비소", "상생", "협력", "관계"],
            innovation: ["혁신", "새로운", "ai", "기술", "창의"],
            growth: ["성장", "확장", "기회", "미래", "발전"],
            efficiency: ["효율", "빠른", "간편", "최적화", "자동"]
        };

        const matchers = contextMatchers[cultureKey] || [];
        return matchers.some(matcher => choiceText.includes(matcher));
    }

    // 팀원 응답 생성 (시뮬레이션)
    generateTeamResponse(personality, scenario, userChoice, cultureAnalysis) {
        const templates = {
            positive_culture_fit: [
                `좋은 접근이네요! ${personality.cultural_values[0]} 가치가 잘 드러나는 선택이에요.`,
                `${personality.name}다운 판단이에요. 마카롱팩토리의 ${personality.cultural_values[0]} 문화와 잘 맞습니다.`,
                `훌륭해요! 이런 사고방식이 바로 마카롱팩토리가 추구하는 방향이에요.`
            ],
            constructive_feedback: [
                `이해할 만한 접근이지만, 마카롱팩토리의 ${personality.cultural_values[0]} 관점에서 보면...`,
                `실용적인 선택이네요. 다만 ${personality.cultural_values[1]} 측면도 고려해보면 어떨까요?`,
                `체계적인 접근이에요. 여기에 ${personality.cultural_values[0]} 요소를 더한다면 더 좋을 것 같아요.`
            ],
            encouraging: [
                `${personality.name} 관점에서는 이런 부분도 중요할 것 같아요.`,
                `좋은 지적이에요. 추가로 이런 방향도 생각해볼 수 있을 것 같습니다.`,
                `맞는 말씀이에요. 마카롱팩토리에서는 이런 식으로 접근하는 경우가 많아요.`
            ]
        };

        const avgScore = Object.values(cultureAnalysis.culture_scores).reduce((a, b) => a + b, 0) / 5;
        
        let responseType;
        if (avgScore >= 7) {
            responseType = 'positive_culture_fit';
        } else if (avgScore >= 4) {
            responseType = 'constructive_feedback';
        } else {
            responseType = 'encouraging';
        }

        const templates_list = templates[responseType];
        const randomTemplate = templates_list[Math.floor(Math.random() * templates_list.length)];
        
        return randomTemplate;
    }

    // 대화 히스토리 추가
    addToHistory(message, isUser = false) {
        this.conversationHistory.push({
            timestamp: new Date().toISOString(),
            message: message,
            isUser: isUser,
            scenario: this.currentScenario
        });
    }

    // 컬처핏 점수 기반 최종 피드백 생성
    generateFinalFeedback(totalScores) {
        const maxScore = Math.max(...Object.values(totalScores));
        const minScore = Math.min(...Object.values(totalScores));
        const avgScore = Object.values(totalScores).reduce((a, b) => a + b, 0) / 5;

        let feedback = {
            overall_assessment: "",
            strengths: [],
            development_areas: [],
            recommendations: []
        };

        // 전체 평가
        if (avgScore >= 12) {
            feedback.overall_assessment = "마카롱팩토리의 핵심가치와 완벽하게 일치하는 뛰어난 컬처핏을 보여주셨습니다.";
        } else if (avgScore >= 8) {
            feedback.overall_assessment = "마카롱팩토리의 문화에 잘 적응할 수 있는 좋은 잠재력을 가지고 계십니다.";
        } else if (avgScore >= 5) {
            feedback.overall_assessment = "마카롱팩토리의 문화를 이해하고 적응해 나갈 수 있는 기본 소양을 갖추고 계십니다.";
        } else {
            feedback.overall_assessment = "마카롱팩토리의 문화와 가치에 대해 더 깊이 이해하는 시간이 필요할 것 같습니다.";
        }

        // 강점 분석
        Object.entries(totalScores).forEach(([key, score]) => {
            if (score >= 10) {
                feedback.strengths.push(`${this.cultureValues[key].icon} ${this.cultureValues[key].name}: 탁월한 역량`);
            } else if (score >= 7) {
                feedback.strengths.push(`${this.cultureValues[key].icon} ${this.cultureValues[key].name}: 좋은 역량`);
            }
        });

        // 개발 영역
        Object.entries(totalScores).forEach(([key, score]) => {
            if (score < 5) {
                feedback.development_areas.push(`${this.cultureValues[key].icon} ${this.cultureValues[key].name}: ${this.cultureValues[key].description}`);
            }
        });

        return feedback;
    }

    // 실시간 문화 가이드 제공
    getCultureGuide(scenario) {
        const guides = {
            partnership: "정비소 파트너와의 상생을 생각해보세요. 단기적 이익보다 장기적 관계가 중요합니다.",
            customer: "2,500만 사용자의 편의를 최우선으로 고려해보세요. 사용자 관점에서 생각해보는 것이 핵심입니다.",
            innovation: "기존 방식에 안주하지 말고 새로운 가능성을 탐색해보세요. 기술로 문제를 해결할 방법을 생각해보세요.",
            growth: "현재 상황을 넘어 미래 성장 가능성을 고려해보세요. 작은 변화가 큰 성장으로 이어질 수 있습니다.",
            efficiency: "고객과 파트너 모두의 시간과 노력을 절약할 수 있는 방법을 생각해보세요."
        };

        return guides;
    }
}

// 전역 인스턴스 생성
window.macarongAI = new MacarongAIChatSystem(); 