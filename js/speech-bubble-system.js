// PixiJS 말풍선 시스템
console.log('💬 말풍선 시스템 로드 시작');

// 말풍선 클래스
class SpeechBubble {
    constructor(character, text = '') {
        this.character = character;
        this.text = text;
        this.sprite = null;
        this.textSprite = null;
        this.isVisible = false;
        this.duration = 3000; // 3초간 표시
        this.timer = null;
        
        console.log(`💬 말풍선 생성: ${character.name} - "${text}"`);
    }

    // 말풍선 스프라이트 생성
    async createBubble() {
        try {
            // 말풍선 GIF 이미지 로드
            const texture = await PIXI.Texture.from('assets/characters/bubble.gif');
            this.sprite = new PIXI.Sprite(texture);
            
            // 크기 조정 (가로 50px 기준)
            const targetWidth = 50;
            const scale = targetWidth / texture.width;
            this.sprite.width = targetWidth;
            this.sprite.height = texture.height * scale;
            
            // 중심 기준으로 설정
            this.sprite.anchor.set(0.5, 1); // 하단 중심 기준
            
            // 캐릭터 머리 위에 배치
            this.updatePosition();
            
            // 투명도 초기값 (0으로 시작해서 페이드인)
            this.sprite.alpha = 0;
            
            console.log(`✅ 말풍선 스프라이트 생성: ${this.character.name} (크기: ${targetWidth}x${Math.round(texture.height * scale)})`);
            return this.sprite;
            
        } catch (error) {
            console.error(`❌ 말풍선 스프라이트 생성 실패: ${this.character.name}`, error);
            throw error;
        }
    }

    // 위치 업데이트 (캐릭터 따라다니기)
    updatePosition() {
        if (this.sprite && this.character.sprite) {
            // 캐릭터 머리 위에 배치
            this.sprite.x = this.character.sprite.x;
            this.sprite.y = this.character.sprite.y - 40; // 머리 위 40px
        }
    }

    // 말풍선 표시
    show() {
        if (this.sprite) {
            this.isVisible = true;
            this.sprite.alpha = 0;
            
            // 페이드인 애니메이션
            const fadeIn = () => {
                if (this.sprite.alpha < 1) {
                    this.sprite.alpha += 0.1;
                    requestAnimationFrame(fadeIn);
                }
            };
            fadeIn();
            
            // 자동 숨김 타이머
            this.timer = setTimeout(() => {
                this.hide();
            }, this.duration);
            
            console.log(`💬 말풍선 표시: ${this.character.name} - "${this.text}"`);
        }
    }

    // 말풍선 숨김
    hide() {
        if (this.sprite && this.isVisible) {
            this.isVisible = false;
            
            // 페이드아웃 애니메이션
            const fadeOut = () => {
                if (this.sprite.alpha > 0) {
                    this.sprite.alpha -= 0.1;
                    requestAnimationFrame(fadeOut);
                } else {
                    // 완전히 숨김
                    this.sprite.visible = false;
                }
            };
            fadeOut();
            
            // 타이머 정리
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            
            console.log(`💬 말풍선 숨김: ${this.character.name}`);
        }
    }

    // 말풍선 제거
    destroy() {
        this.hide();
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }
        console.log(`🗑️ 말풍선 제거: ${this.character.name}`);
    }
}

// 말풍선 매니저 클래스
class SpeechBubbleManager {
    constructor(app) {
        this.app = app;
        this.bubbles = new Map(); // character -> bubble
        this.bubbleContainer = null;
        
        console.log('💬 말풍선 매니저 초기화 완료');
    }

    // 말풍선 컨테이너 생성
    createBubbleContainer() {
        if (this.bubbleContainer) {
            this.app.stage.removeChild(this.bubbleContainer);
            this.bubbleContainer.destroy({ children: true });
        }
        
        this.bubbleContainer = new PIXI.Container();
        this.bubbleContainer.name = 'speechBubbleContainer';
        this.app.stage.addChild(this.bubbleContainer);
        
        console.log('📦 말풍선 컨테이너 생성 완료');
    }

    // 캐릭터가 말하기
    async speak(character, text, duration = 3000) {
        try {
            // 기존 말풍선이 있으면 제거
            if (this.bubbles.has(character)) {
                this.bubbles.get(character).destroy();
                this.bubbles.delete(character);
            }
            
            // 새 말풍선 생성
            const bubble = new SpeechBubble(character, text);
            bubble.duration = duration;
            
            const sprite = await bubble.createBubble();
            this.bubbles.set(character, bubble);
            
            // 컨테이너에 추가
            this.bubbleContainer.addChild(sprite);
            
            // 말풍선 표시
            bubble.show();
            
            console.log(`💬 캐릭터 말하기: ${character.name} - "${text}"`);
            return bubble;
            
        } catch (error) {
            console.error('❌ 말풍선 생성 실패:', error);
            throw error;
        }
    }

    // 모든 말풍선 숨김
    hideAllBubbles() {
        this.bubbles.forEach(bubble => {
            bubble.hide();
        });
        console.log('💬 모든 말풍선 숨김');
    }

    // 모든 말풍선 제거
    removeAllBubbles() {
        this.bubbles.forEach(bubble => {
            bubble.destroy();
        });
        this.bubbles.clear();
        console.log('🗑️ 모든 말풍선 제거');
    }

    // 말풍선 위치 업데이트 (캐릭터 이동 시)
    updateBubblePositions() {
        this.bubbles.forEach(bubble => {
            if (bubble.isVisible) {
                bubble.updatePosition();
            }
        });
    }

    // 샘플 대화 시나리오
    async playSampleDialogue() {
        try {
            console.log('🎭 샘플 대화 시나리오 시작...');
            
            const characters = window.characterManager?.characters || [];
            if (characters.length === 0) {
                throw new Error('캐릭터가 생성되지 않았습니다.');
            }
            
            // 순서대로 말하기
            const dialogues = [
                { character: characters[0], text: '안녕하세요!', duration: 2000 },
                { character: characters[1], text: '오늘 회의 있나요?', duration: 2500 },
                { character: characters[2], text: '네, 오후 2시에요!', duration: 2000 },
                { character: characters[3], text: '알겠습니다!', duration: 1500 }
            ];
            
            for (let i = 0; i < dialogues.length; i++) {
                const dialogue = dialogues[i];
                await this.speak(dialogue.character, dialogue.text, dialogue.duration);
                
                // 다음 대화까지 대기
                await new Promise(resolve => setTimeout(resolve, dialogue.duration + 500));
            }
            
            console.log('✅ 샘플 대화 시나리오 완료');
            
        } catch (error) {
            console.error('❌ 샘플 대화 시나리오 실패:', error);
            throw error;
        }
    }
}

// 전역 함수로 노출
window.createSpeechBubbleManager = function(app) {
    if (!window.speechBubbleManager) {
        window.speechBubbleManager = new SpeechBubbleManager(app);
        window.speechBubbleManager.createBubbleContainer();
    }
    return window.speechBubbleManager;
};

window.speak = function(character, text, duration) {
    if (window.speechBubbleManager) {
        return window.speechBubbleManager.speak(character, text, duration);
    }
    return null;
};

window.playSampleDialogue = function() {
    if (window.speechBubbleManager) {
        return window.speechBubbleManager.playSampleDialogue();
    }
    return null;
};

window.hideAllBubbles = function() {
    if (window.speechBubbleManager) {
        window.speechBubbleManager.hideAllBubbles();
    }
};

console.log('�� 말풍선 시스템 로드 완료'); 