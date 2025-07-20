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
    DEV1: {
        name: 'Developer 1',
        image: 'assets/characters/dev1.png',
        description: '개발자 1'
    },
    DEV2: {
        name: 'Developer 2',
        image: 'assets/characters/dev2.png',
        description: '개발자 2'
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
            
            // 원본 크기에서 25% 확대
            this.sprite.width = texture.width * 1.25;
            this.sprite.height = texture.height * 1.25;
            
            // 중심 기준으로 설정
            this.sprite.anchor.set(0.5);
            
            // 위치 설정 (타일 중심에 배치)
            this.sprite.x = this.x + (texture.width / 2);
            this.sprite.y = this.y + (texture.height / 2);
            
            // 캐릭터 정보 저장
            this.sprite.characterData = {
                type: this.type,
                name: this.name,
                description: CHARACTER_TYPES[this.type].description,
                originalSize: { width: texture.width, height: texture.height },
                scale: 1.0
            };
            
            console.log(`✅ 캐릭터 스프라이트 생성: ${this.name} (크기: ${texture.width}x${texture.height})`);
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
                // 중심 기준 위치 업데이트 (동적 크기)
                this.sprite.x = this.x + (this.sprite.width / 2);
                this.sprite.y = this.y + (this.sprite.height / 2);
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                // 중심 기준 위치 업데이트 (동적 크기)
                this.sprite.x = this.x + (this.sprite.width / 2);
                this.sprite.y = this.y + (this.sprite.height / 2);
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
            // 맵 컨테이너에서 제거
            if (window.pixelMapManager && window.pixelMapManager.mapContainer) {
                window.pixelMapManager.mapContainer.removeChild(this.characterContainer);
            } else {
                this.app.stage.removeChild(this.characterContainer);
            }
            this.characterContainer.destroy({ children: true });
        }
        
        this.characterContainer = new PIXI.Container();
        this.characterContainer.name = 'characterContainer';
        
        // 맵 컨테이너가 있으면 맵의 자식으로, 없으면 스테이지에 직접 추가
        if (window.pixelMapManager && window.pixelMapManager.mapContainer) {
            window.pixelMapManager.mapContainer.addChild(this.characterContainer);
            console.log('📦 캐릭터 컨테이너를 맵 컨테이너의 자식으로 생성 완료');
        } else {
            this.app.stage.addChild(this.characterContainer);
            console.log('📦 캐릭터 컨테이너를 스테이지에 직접 생성 완료');
        }
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
            
            // 새로운 맵 크기 (320x280)에 맞춰 위치 계산 (25% 확대)
            const mapWidth = 320;
            const mapHeight = 280;
            
            // 320x280 맵에서 미팅룸 하단에 가로로 1열 배치 (25% 확대)
            // 미팅룸은 맵의 왼쪽 하단 영역 (0-160 x 140-280)
            const startX = 50; // 미팅룸 영역 내 시작 X 위치 (40 * 1.25)
            const y = 225; // 미팅룸 하단 Y 위치 (180 * 1.25)
            const spacing = 44; // 캐릭터 간 간격 (35 * 1.25)
            
            await this.addCharacter('PO', startX, y, '김PO'); // 첫 번째
            await this.addCharacter('PD', startX + spacing, y, '박PD'); // 두 번째
            await this.addCharacter('DEV1', startX + spacing * 2, y, '이개발'); // 세 번째
            await this.addCharacter('DEV2', startX + spacing * 3, y, '최개발'); // 네 번째
            
            console.log('✅ 샘플 캐릭터들 생성 완료 (미팅룸 하단 가로 배치)');
            
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