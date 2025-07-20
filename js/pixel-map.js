// PixiJS 픽셀 아트 사무실 맵 생성기
console.log('🎮 픽셀 맵 시스템 로드 시작');

// 맵 레이아웃 정의 (10x10 타일) - 기존 타일 사용
const mapLayout = [
    [301, 301, 301, 301, 301, 302, 302, 302, 302, 302],
    [301, 301, 301, 301, 301, 302, 302, 302, 302, 302],
    [301, 301, 301, 301, 301, 302, 302, 302, 302, 302],
    [301, 301, 301, 301, 301, 302, 302, 302, 302, 302],
    [301, 301, 301, 301, 301, 302, 302, 302, 302, 302],
    [303, 303, 303, 303, 303, 304, 304, 304, 304, 304],
    [303, 303, 303, 303, 303, 304, 304, 304, 304, 304],
    [303, 303, 303, 303, 303, 304, 304, 304, 304, 304],
    [303, 303, 303, 303, 303, 304, 304, 304, 304, 304],
    [303, 303, 303, 303, 303, 304, 304, 304, 304, 304],
];

// 구역별 이름
const areaNames = {
    301: '미팅룸',
    302: '카페테리아', 
    303: '좌석A',
    304: '좌석B'
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
                    
                    // 실제 타일 이미지 로드
                    const tilePath = `assets/tiles/tile_${tileIndex}.png`;
                    const texture = await PIXI.Texture.from(tilePath);
                    tileSprite.texture = texture;
                    console.log(`✅ 타일 이미지 로드: ${tilePath}`);
                    
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