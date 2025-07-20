// PixiJS 픽셀 아트 사무실 맵 생성기
console.log('🎮 픽셀 맵 시스템 로드 시작');

// 맵 레이아웃 정의 (10x10 타일)
const mapLayout = [
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
];

// 구역별 색상 정의 (폴백용)
const areaColors = {
    1: 0x4A90E2, // 미팅룸 - 파란색
    2: 0x7ED321, // 카페테리아 - 초록색
    3: 0xF5A623, // 좌석A - 주황색
    4: 0x9013FE  // 좌석B - 보라색
};

// 구역별 이름
const areaNames = {
    1: '미팅룸',
    2: '카페테리아', 
    3: '좌석A',
    4: '좌석B'
};

class PixelMapManager {
    constructor(app) {
        this.app = app;
        this.mapContainer = null;
        this.tileSize = 32;
        this.mapWidth = mapLayout[0].length;
        this.mapHeight = mapLayout.length;
        this.tileSprites = [];
        
        console.log('🗺️ 픽셀 맵 매니저 초기화 완료');
        console.log(`📏 맵 크기: ${this.mapWidth}x${this.mapHeight} (${this.tileSize}px 타일)`);
    }

    // 타일 텍스처 생성 (폴백용)
    createTileTexture(tileIndex) {
        const graphics = new PIXI.Graphics();
        const color = areaColors[tileIndex] || 0xCCCCCC;
        const areaName = areaNames[tileIndex] || 'Unknown';
        
        // 타일 배경 (그라데이션 효과)
        graphics.beginFill(color);
        graphics.drawRect(0, 0, this.tileSize, this.tileSize);
        graphics.endFill();
        
        // 하이라이트 효과 (상단)
        const highlightColor = this.lightenColor(color, 0.3);
        graphics.beginFill(highlightColor);
        graphics.drawRect(0, 0, this.tileSize, 4);
        graphics.endFill();
        
        // 그림자 효과 (하단)
        const shadowColor = this.darkenColor(color, 0.3);
        graphics.beginFill(shadowColor);
        graphics.drawRect(0, this.tileSize - 4, this.tileSize, 4);
        graphics.endFill();
        
        // 타일 테두리
        graphics.lineStyle(1, 0x333333, 0.5);
        graphics.drawRect(0, 0, this.tileSize, this.tileSize);
        
        // 구역 이름 표시 (작은 텍스트)
        const text = new PIXI.Text(areaName.substring(0, 2), {
            fontSize: 8,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            dropShadow: true,
            dropShadowColor: 0x000000,
            dropShadowDistance: 1
        });
        text.anchor.set(0.5);
        text.x = this.tileSize / 2;
        text.y = this.tileSize / 2;
        graphics.addChild(text);
        
        return this.app.renderer.generateTexture(graphics);
    }
    
    // 색상을 밝게 만드는 헬퍼 함수
    lightenColor(color, amount) {
        const r = Math.min(255, ((color >> 16) & 255) + (255 * amount));
        const g = Math.min(255, ((color >> 8) & 255) + (255 * amount));
        const b = Math.min(255, (color & 255) + (255 * amount));
        return (r << 16) | (g << 8) | b;
    }
    
    // 색상을 어둡게 만드는 헬퍼 함수
    darkenColor(color, amount) {
        const r = Math.max(0, ((color >> 16) & 255) - (255 * amount));
        const g = Math.max(0, ((color >> 8) & 255) - (255 * amount));
        const b = Math.max(0, (color & 255) - (255 * amount));
        return (r << 16) | (g << 8) | b;
    }

    // 맵 생성
    async createOfficeMap() {
        try {
            console.log('🏢 사무실 맵 생성 시작...');
            
            // 기존 맵 제거
            this.removeMap();
            
            // 맵 컨테이너 생성
            this.mapContainer = new PIXI.Container();
            this.mapContainer.name = 'officeMap';
            
            // 각 타일 생성
            for (let row = 0; row < this.mapHeight; row++) {
                for (let col = 0; col < this.mapWidth; col++) {
                    const tileIndex = mapLayout[row][col];
                    const x = col * this.tileSize;
                    const y = row * this.tileSize;
                    
                    // 타일 스프라이트 생성
                    const tileSprite = new PIXI.Sprite();
                    
                    // 폴백 타일 생성 (CORS 문제 해결을 위해 바로 폴백 사용)
                    console.log(`🎨 타일 생성: ${tileIndex} (${areaNames[tileIndex]})`);
                    tileSprite.texture = this.createTileTexture(tileIndex);
                    
                    // 타일 위치 설정
                    tileSprite.x = x;
                    tileSprite.y = y;
                    tileSprite.width = this.tileSize;
                    tileSprite.height = this.tileSize;
                    
                    // 타일 정보 저장
                    tileSprite.tileData = {
                        row: row,
                        col: col,
                        tileIndex: tileIndex,
                        areaName: areaNames[tileIndex]
                    };
                    
                    // 컨테이너에 추가
                    this.mapContainer.addChild(tileSprite);
                    this.tileSprites.push(tileSprite);
                }
            }
            
            // 스테이지에 맵 추가
            this.app.stage.addChild(this.mapContainer);
            
            console.log(`✅ 사무실 맵 생성 완료! (${this.tileSprites.length}개 타일)`);
            return this.mapContainer;
            
        } catch (error) {
            console.error('❌ 맵 생성 실패:', error);
            throw error;
        }
    }

    // 맵 제거
    removeMap() {
        if (this.mapContainer) {
            this.app.stage.removeChild(this.mapContainer);
            this.mapContainer.destroy({ children: true });
            this.mapContainer = null;
            this.tileSprites = [];
            console.log('🗑️ 맵 제거 완료');
        }
    }

    // 맵 정보 반환
    getMapInfo() {
        return {
            width: this.mapWidth,
            height: this.mapHeight,
            tileSize: this.tileSize,
            totalTiles: this.tileSprites.length,
            areas: areaNames,
            layout: mapLayout
        };
    }

    // 특정 위치의 타일 정보 반환
    getTileAt(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        
        if (row >= 0 && row < this.mapHeight && col >= 0 && col < this.mapWidth) {
            const tileIndex = mapLayout[row][col];
            return {
                row: row,
                col: col,
                tileIndex: tileIndex,
                areaName: areaNames[tileIndex],
                worldX: col * this.tileSize,
                worldY: row * this.tileSize
            };
        }
        return null;
    }
}

// 전역 함수로 노출
window.createOfficeMap = function() {
    if (window.pixelMapManager) {
        return window.pixelMapManager.createOfficeMap();
    } else {
        console.error('❌ PixelMapManager가 초기화되지 않았습니다.');
        return null;
    }
};

window.removeOfficeMap = function() {
    if (window.pixelMapManager) {
        window.pixelMapManager.removeMap();
    }
};

window.getMapInfo = function() {
    if (window.pixelMapManager) {
        return window.pixelMapManager.getMapInfo();
    }
    return null;
};

console.log('🎮 픽셀 맵 시스템 로드 완료'); 