// PixiJS 픽셀 아트 사무실 맵 생성기 (통파일 배경 방식)
console.log('🎮 픽셀 맵 시스템 로드 시작');

// 전체 맵 이미지 경로
const FULL_MAP_IMAGE = 'assets/tiles/full.png';

// 구역별 이름 (전체 맵 기준)
const areaNames = {
    'meeting': '미팅룸',
    'cafeteria': '카페테리아', 
    'seatA': '좌석A',
    'seatB': '좌석B'
};

class PixelMapManager {
    constructor(app) {
        this.app = app;
        this.mapContainer = null;
        this.mapSprite = null;
        this.mapWidth = 256; // full.png 실제 너비
        this.mapHeight = 224; // full.png 실제 높이
        
        console.log('🗺️ 픽셀 맵 매니저 초기화 완료');
        console.log(`📏 맵 크기: ${this.mapWidth}x${this.mapHeight}px`);
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
            
            // 전체 맵 이미지 로드
            console.log(`🖼️ 전체 맵 이미지 로드: ${FULL_MAP_IMAGE}`);
            const texture = await PIXI.Texture.from(FULL_MAP_IMAGE);
            
            // 맵 스프라이트 생성
            this.mapSprite = new PIXI.Sprite(texture);
            this.mapSprite.width = this.mapWidth;
            this.mapSprite.height = this.mapHeight;
            this.mapSprite.name = 'fullMap';
            
            // 맵 정보 저장
            this.mapSprite.mapData = {
                width: this.mapWidth,
                height: this.mapHeight,
                areas: areaNames,
                imagePath: FULL_MAP_IMAGE
            };
            
            // 컨테이너에 추가
            this.mapContainer.addChild(this.mapSprite);
            
            // 스테이지에 맵 추가
            this.app.stage.addChild(this.mapContainer);
            
            console.log(`✅ 사무실 맵 생성 완료! (${this.mapWidth}x${this.mapHeight}px)`);
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
            this.mapSprite = null;
            console.log('🗑️ 맵 제거 완료');
        }
    }

    // 맵 정보 반환
    getMapInfo() {
        return {
            width: this.mapWidth,
            height: this.mapHeight,
            totalPixels: this.mapWidth * this.mapHeight,
            areas: areaNames,
            imagePath: FULL_MAP_IMAGE,
            type: 'full-image'
        };
    }

    // 특정 위치의 구역 정보 반환 (마우스 클릭용)
    getAreaAt(x, y) {
        // 10x10 그리드 기준으로 구역 계산
        const tileSize = this.mapWidth / 10; // 32px
        const col = Math.floor(x / tileSize);
        const row = Math.floor(y / tileSize);
        
        if (row >= 0 && row < 10 && col >= 0 && col < 10) {
            // 구역별 좌표 범위
            if (row < 5 && col < 5) {
                return { area: 'meeting', name: areaNames.meeting, row, col };
            } else if (row < 5 && col >= 5) {
                return { area: 'cafeteria', name: areaNames.cafeteria, row, col };
            } else if (row >= 5 && col < 5) {
                return { area: 'seatA', name: areaNames.seatA, row, col };
            } else {
                return { area: 'seatB', name: areaNames.seatB, row, col };
            }
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

window.getAreaAt = function(x, y) {
    if (window.pixelMapManager) {
        return window.pixelMapManager.getAreaAt(x, y);
    }
    return null;
};

console.log('🎮 픽셀 맵 시스템 로드 완료'); 