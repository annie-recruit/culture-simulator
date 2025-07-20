// PixiJS 캐릭터 시스템
console.log('👥 캐릭터 시스템 로드 시작');

// 캐릭터 타입 정의
const CHARACTER_TYPES = {
    PO: {
        name: 'PO',
        image: 'assets/characters/po.png',
        description: 'Product Owner'
    },
    PD: {
        name: 'PD',
        image: 'assets/characters/pd.png',
        description: 'Product Designer'
    },
    IOS_DEV: {
        name: 'iOS Developer',
        image: 'assets/characters/ios_developer.png',
        description: 'iOS 개발자'
    },
    SERVER_DEV: {
        name: 'Server Developer',
        image: 'assets/characters/server_developer.png',
        description: '서버 개발자'
    }
};

// 캐릭터 클래스
class Character {
    constructor(type, x, y, name = null) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.name = name || CHARACTER_TYPES[type].name;
        this.sprite = null;
        this.isMoving = false;
        this.targetX = x;
        this.targetY = y;
        this.speed = 2;
        
        console.log(`👤 캐릭터 생성: ${this.name} (${type}) at (${x}, ${y})`);
    }

    // 스프라이트 생성
    async createSprite() {
        try {
            const texture = await PIXI.Texture.from(CHARACTER_TYPES[this.type].image);
            this.sprite = new PIXI.Sprite(texture);
            
            // 비율 유지하며 크기 조정 (32px 기준)
            const scale = 32 / Math.max(texture.width, texture.height);
            this.sprite.scale.set(scale);
            
            // 중심 기준으로 설정
            this.sprite.anchor.set(0.5);
            
            // 위치 설정 (타일 중심에 배치)
            this.sprite.x = this.x + 16;
            this.sprite.y = this.y + 16;
            
            // 캐릭터 정보 저장
            this.sprite.characterData = {
                type: this.type,
                name: this.name,
                description: CHARACTER_TYPES[this.type].description,
                originalSize: { width: texture.width, height: texture.height },
                scale: scale
            };
            
            console.log(`✅ 캐릭터 스프라이트 생성: ${this.name} (원본: ${texture.width}x${texture.height}, 스케일: ${scale.toFixed(2)})`);
            return this.sprite;
            
        } catch (error) {
            console.error(`❌ 캐릭터 스프라이트 생성 실패: ${this.name}`, error);
            throw error;
        }
    }

    // 캐릭터 이동
    moveTo(targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
        this.isMoving = true;
        console.log(`🚶 ${this.name} 이동: (${this.x}, ${this.y}) → (${targetX}, ${targetY})`);
    }

    // 캐릭터 업데이트 (애니메이션용)
    update() {
        if (this.isMoving && this.sprite) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 1) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
                // 중심 기준 위치 업데이트
                this.sprite.x = this.x + 16;
                this.sprite.y = this.y + 16;
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                // 중심 기준 위치 업데이트
                this.sprite.x = this.x + 16;
                this.sprite.y = this.y + 16;
                this.isMoving = false;
                console.log(`✅ ${this.name} 이동 완료`);
            }
        }
    }

    // 캐릭터 정보 반환
    getInfo() {
        return {
            type: this.type,
            name: this.name,
            description: CHARACTER_TYPES[this.type].description,
            position: { x: this.x, y: this.y },
            isMoving: this.isMoving
        };
    }
}

// 캐릭터 매니저 클래스
class CharacterManager {
    constructor(app) {
        this.app = app;
        this.characters = [];
        this.characterContainer = null;
        
        console.log('👥 캐릭터 매니저 초기화 완료');
    }

    // 캐릭터 컨테이너 생성
    createCharacterContainer() {
        if (this.characterContainer) {
            this.app.stage.removeChild(this.characterContainer);
            this.characterContainer.destroy({ children: true });
        }
        
        this.characterContainer = new PIXI.Container();
        this.characterContainer.name = 'characterContainer';
        this.app.stage.addChild(this.characterContainer);
        
        console.log('📦 캐릭터 컨테이너 생성 완료');
    }

    // 캐릭터 추가
    async addCharacter(type, x, y, name = null) {
        try {
            const character = new Character(type, x, y, name);
            const sprite = await character.createSprite();
            
            this.characters.push(character);
            this.characterContainer.addChild(sprite);
            
            console.log(`✅ 캐릭터 추가 완료: ${character.name}`);
            return character;
            
        } catch (error) {
            console.error('❌ 캐릭터 추가 실패:', error);
            throw error;
        }
    }

    // 캐릭터 제거
    removeCharacter(character) {
        const index = this.characters.indexOf(character);
        if (index > -1) {
            this.characters.splice(index, 1);
            if (character.sprite) {
                this.characterContainer.removeChild(character.sprite);
                character.sprite.destroy();
            }
            console.log(`🗑️ 캐릭터 제거: ${character.name}`);
        }
    }

    // 모든 캐릭터 제거
    removeAllCharacters() {
        this.characters.forEach(character => {
            if (character.sprite) {
                this.characterContainer.removeChild(character.sprite);
                character.sprite.destroy();
            }
        });
        this.characters = [];
        console.log('🗑️ 모든 캐릭터 제거 완료');
    }

    // 캐릭터 이동
    moveCharacter(character, targetX, targetY) {
        if (character) {
            character.moveTo(targetX, targetY);
        }
    }

    // 캐릭터 업데이트 (애니메이션)
    update() {
        this.characters.forEach(character => {
            character.update();
        });
    }

    // 캐릭터 정보 반환
    getCharactersInfo() {
        return this.characters.map(character => character.getInfo());
    }

    // 특정 위치의 캐릭터 찾기
    getCharacterAt(x, y) {
        return this.characters.find(character => {
            const distance = Math.sqrt(
                Math.pow(character.x - x, 2) + Math.pow(character.y - y, 2)
            );
            return distance < 16; // 32px 타일의 절반
        });
    }

    // 샘플 캐릭터들 생성 (테스트용)
    async createSampleCharacters() {
        try {
            console.log('🎭 샘플 캐릭터들 생성 시작...');
            
            // 맵 중앙 배치를 고려한 위치 계산 (400x400 캔버스, 320x320 맵)
            const mapOffsetX = (400 - 320) / 2; // 40
            const mapOffsetY = (400 - 320) / 2; // 40
            
            // 각 구역에 캐릭터 배치 (맵 기준 + 오프셋)
            await this.addCharacter('PO', mapOffsetX + 80, mapOffsetY + 80, '김PO'); // 미팅룸
            await this.addCharacter('PD', mapOffsetX + 240, mapOffsetY + 80, '박PD'); // 카페테리아
            await this.addCharacter('IOS_DEV', mapOffsetX + 80, mapOffsetY + 240, '이iOS'); // 좌석A
            await this.addCharacter('SERVER_DEV', mapOffsetX + 240, mapOffsetY + 240, '최서버'); // 좌석B
            
            console.log('✅ 샘플 캐릭터들 생성 완료');
            
        } catch (error) {
            console.error('❌ 샘플 캐릭터 생성 실패:', error);
            throw error;
        }
    }
}

// 전역 함수로 노출
window.createCharacterManager = function(app) {
    if (!window.characterManager) {
        window.characterManager = new CharacterManager(app);
        window.characterManager.createCharacterContainer();
    }
    return window.characterManager;
};

window.addCharacter = function(type, x, y, name) {
    if (window.characterManager) {
        return window.characterManager.addCharacter(type, x, y, name);
    }
    return null;
};

window.moveCharacter = function(character, x, y) {
    if (window.characterManager) {
        window.characterManager.moveCharacter(character, x, y);
    }
};

window.getCharactersInfo = function() {
    if (window.characterManager) {
        return window.characterManager.getCharactersInfo();
    }
    return [];
};

window.createSampleCharacters = function() {
    if (window.characterManager) {
        return window.characterManager.createSampleCharacters();
    }
    return null;
};

console.log('�� 캐릭터 시스템 로드 완료'); 