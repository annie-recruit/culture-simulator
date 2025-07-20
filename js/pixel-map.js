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
        
        // 타일 배경
        graphics.beginFill(color);
        graphics.drawRect(0, 0, this.tileSize, this.tileSize);
        graphics.endFill();
        
        // 타일 테두리
        graphics.lineStyle(1, 0x333333, 0.3);
        graphics.drawRect(0, 0, this.tileSize, this.tileSize);
        
        // 타일 번호 표시 (디버그용)
        const text = new PIXI.Text(tileIndex.toString(), {
            fontSize: 12,
            fill: 0xFFFFFF,
            fontWeight: 'bold'
        });
        text.anchor.set(0.5);
        text.x = this.tileSize / 2;
        text.y = this.tileSize / 2;
        graphics.addChild(text);
        
        return this.app.renderer.generateTexture(graphics);
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
                    
                    // 실제 타일 이미지 로드 시도
                    const tilePath = `assets/tiles/tile_${tileIndex}.png`;
                    
                    try {
                        // 실제 이미지 로드
                        const texture = await PIXI.Texture.from(tilePath);
                        tileSprite.texture = texture;
                        console.log(`✅ 타일 이미지 로드 성공: ${tilePath}`);
                    } catch (error) {
                        // 폴백: 색상 기반 타일 생성
                        console.log(`⚠️ 타일 이미지 없음, 폴백 생성: ${tilePath}`);
                        tileSprite.texture = this.createTileTexture(tileIndex);
                    }
                    
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