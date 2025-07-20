// 🎨 PixiJS 기반 고도화된 픽셀 아트 맵 시스템
class AdvancedPixelMap {
    constructor() {
        this.container = document.querySelector('.pixel-map-container');
        this.app = null;
        this.characters = {};
        this.currentScenario = 1;
        
        this.init();
    }
    
    async init() {
        // PixiJS 앱 생성 (훨씬 더 크게!)
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x4A5D4A,
            antialias: false,
            resolution: 2 // 고해상도로!
        });
        
        // 진짜 픽셀 아트 렌더링 설정
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app.renderer.view.style.imageRendering = 'pixelated';
        this.app.renderer.view.style.imageRendering = '-moz-crisp-edges';
        this.app.renderer.view.style.imageRendering = 'crisp-edges';
        this.app.renderer.view.style.width = '100%';
        this.app.renderer.view.style.height = '100%';
        this.app.renderer.view.style.maxWidth = '100%';
        this.app.renderer.view.style.maxHeight = '100%';
        
        // 기존 캔버스 제거하고 PixiJS 캔버스 추가
        const existingCanvas = this.container.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        this.container.appendChild(this.app.view);
        
        // 맵 요소들 생성
        await this.createMapElements();
        this.createCharacters();
        this.updateScenario(1);
        
        console.log('🎨 PixiJS 고도화된 픽셀 아트 맵 시스템 초기화 완료!');
    }
    
    // 픽셀 아트 텍스처 생성 헬퍼
    createPixelTexture(width, height, color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        return this.app.renderer.generateTexture(graphics);
    }
    
    // 패턴 텍스처 생성
    createPatternTexture(width, height, colors, patternSize = 8) {
        const graphics = new PIXI.Graphics();
        
        for (let x = 0; x < width; x += patternSize) {
            for (let y = 0; y < height; y += patternSize) {
                const colorIndex = ((x / patternSize) + (y / patternSize)) % colors.length;
                graphics.beginFill(colors[colorIndex]);
                graphics.drawRect(x, y, patternSize, patternSize);
                graphics.endFill();
            }
        }
        
        return this.app.renderer.generateTexture(graphics);
    }
    
    // 게더타운 스타일 맵 생성
    async createMapElements() {
        // 게더타운 스타일 타일 바닥
        this.createGatherFloor();
        
        // 벽과 테두리
        this.createWalls();
        
        // 회의실 (게더타운 스타일)
        this.createGatherMeetingRoom();
        
        // 개발 구역 (게더타운 스타일)
        this.createGatherDevArea();
        
        // 디자인 구역 (게더타운 스타일)
        this.createGatherDesignArea();
        
        // 카페 구역 (게더타운 스타일)
        this.createGatherCafe();
        
        // 장식 요소들
        this.createGatherDecorations();
        
        // 미니맵 제목
        this.createGatherTitle();
    }
    
    // 게더타운 스타일 타일 바닥
    createGatherFloor() {
        const TILE_SIZE = 32; // 게더타운 스타일 타일 크기
        
        for (let x = 0; x < 800; x += TILE_SIZE) {
            for (let y = 0; y < 600; y += TILE_SIZE) {
                // 체커보드 패턴
                const isLight = ((x / TILE_SIZE) + (y / TILE_SIZE)) % 2 === 0;
                const tileColor = isLight ? 0x8FBC8F : 0x90EE90;
                
                const tile = this.createPixelSprite(TILE_SIZE, TILE_SIZE, tileColor);
                tile.x = x;
                tile.y = y;
                this.app.stage.addChild(tile);
                
                // 타일 테두리
                const border = this.createTileBorder(x, y, TILE_SIZE);
                this.app.stage.addChild(border);
            }
        }
    }
    
    // 타일 테두리 생성
    createTileBorder(x, y, size) {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x556B2F, 0.3);
        graphics.drawRect(x, y, size, size);
        return graphics;
    }
    
    // 벽 생성
    createWalls() {
        // 상단 벽
        const topWall = this.createPixelSprite(800, 32, 0x8B4513);
        topWall.x = 0;
        topWall.y = 0;
        this.app.stage.addChild(topWall);
        
        // 좌측 벽
        const leftWall = this.createPixelSprite(32, 600, 0x8B4513);
        leftWall.x = 0;
        leftWall.y = 0;
        this.app.stage.addChild(leftWall);
        
        // 우측 벽
        const rightWall = this.createPixelSprite(32, 600, 0x8B4513);
        rightWall.x = 768;
        rightWall.y = 0;
        this.app.stage.addChild(rightWall);
        
        // 하단 벽
        const bottomWall = this.createPixelSprite(800, 32, 0x8B4513);
        bottomWall.x = 0;
        bottomWall.y = 568;
        this.app.stage.addChild(bottomWall);
    }
    
    // 픽셀 스프라이트 생성 헬퍼
    createPixelSprite(width, height, color) {
        const texture = this.createPixelTexture(width, height, color);
        return new PIXI.Sprite(texture);
    }
    
    // 게더타운 스타일 회의 테이블
    createGatherConferenceTable(x, y) {
        // 큰 타원형 테이블
        const tableMain = this.createPixelSprite(120, 80, 0x8B4513);
        tableMain.x = x - 60;
        tableMain.y = y - 40;
        this.app.stage.addChild(tableMain);
        
        // 테이블 상판
        const tableTop = this.createPixelSprite(112, 72, 0xD2691E);
        tableTop.x = x - 56;
        tableTop.y = y - 36;
        this.app.stage.addChild(tableTop);
        
        // 테이블 광택
        const shine = this.createPixelSprite(100, 60, 0xDEB887);
        shine.x = x - 50;
        shine.y = y - 30;
        shine.alpha = 0.5;
        this.app.stage.addChild(shine);
    }
    
    // 게더타운 스타일 의자
    createGatherChair(x, y) {
        // 의자 베이스
        const chairBase = this.createPixelSprite(24, 24, 0x654321);
        chairBase.x = x - 12;
        chairBase.y = y - 12;
        this.app.stage.addChild(chairBase);
        
        // 의자 등받이
        const backrest = this.createPixelSprite(24, 8, 0x8B4513);
        backrest.x = x - 12;
        backrest.y = y - 20;
        this.app.stage.addChild(backrest);
        
        // 의자 쿠션
        const cushion = this.createPixelSprite(20, 20, 0xBC8F8F);
        cushion.x = x - 10;
        cushion.y = y - 10;
        this.app.stage.addChild(cushion);
    }
    
    // 프레젠테이션 스크린
    createPresentationScreen(x, y) {
        // 스크린 프레임
        const frame = this.createPixelSprite(80, 60, 0x2F2F2F);
        frame.x = x - 40;
        frame.y = y - 30;
        this.app.stage.addChild(frame);
        
        // 스크린
        const screen = this.createPixelSprite(72, 52, 0x000000);
        screen.x = x - 36;
        screen.y = y - 26;
        this.app.stage.addChild(screen);
        
        // 스크린 내용 (가짜 프레젠테이션)
        const content = this.createPixelSprite(64, 44, 0x4169E1);
        content.x = x - 32;
        content.y = y - 22;
        this.app.stage.addChild(content);
        
        // 제목 바
        const titleBar = this.createPixelSprite(64, 8, 0xFFFFFF);
                 titleBar.x = x - 32;
         titleBar.y = y - 22;
         this.app.stage.addChild(titleBar);
     }
     
     // 게더타운 개발 책상
     createGatherDevDesk(x, y) {
         const desk = this.createPixelSprite(60, 40, 0x8B4513);
         desk.x = x - 30;
         desk.y = y - 20;
         this.app.stage.addChild(desk);
         
         // 모니터 2개
         const monitor1 = this.createPixelSprite(24, 16, 0x000000);
         monitor1.x = x - 25;
         monitor1.y = y - 15;
         this.app.stage.addChild(monitor1);
         
         const monitor2 = this.createPixelSprite(24, 16, 0x000000);
         monitor2.x = x + 5;
         monitor2.y = y - 15;
         this.app.stage.addChild(monitor2);
     }
     
     // 게더타운 디자인 책상
     createGatherDesignDesk(x, y) {
         const desk = this.createPixelSprite(60, 40, 0x8B4513);
         desk.x = x - 30;
         desk.y = y - 20;
         this.app.stage.addChild(desk);
         
         // 대형 모니터
         const monitor = this.createPixelSprite(40, 24, 0x000000);
         monitor.x = x - 20;
         monitor.y = y - 15;
         this.app.stage.addChild(monitor);
         
         // 타블렛
         const tablet = this.createPixelSprite(16, 12, 0x2F2F2F);
         tablet.x = x + 15;
         tablet.y = y + 5;
         this.app.stage.addChild(tablet);
     }
     
     // 게더타운 카페 테이블
     createGatherCafeTable(x, y) {
         const table = this.createPixelSprite(32, 32, 0xD2691E);
         table.x = x - 16;
         table.y = y - 16;
         this.app.stage.addChild(table);
         
         // 의자 4개
         const chairs = [
             { x: x - 16, y: y - 30 },
             { x: x + 16, y: y - 16 },
             { x: x - 16, y: y + 16 },
             { x: x - 32, y: y - 16 }
         ];
         
         chairs.forEach(pos => {
             const chair = this.createPixelSprite(12, 12, 0x654321);
             chair.x = pos.x;
             chair.y = pos.y;
             this.app.stage.addChild(chair);
         });
     }
     
     // 게더타운 커피머신
     createGatherCoffeeMachine(x, y) {
         const machine = this.createPixelSprite(32, 48, 0xC0C0C0);
         machine.x = x - 16;
         machine.y = y - 24;
         this.app.stage.addChild(machine);
     }
     
     // 게더타운 식물
     createGatherPlant(x, y) {
         const pot = this.createPixelSprite(16, 12, 0x8B4513);
         pot.x = x - 8;
         pot.y = y + 4;
         this.app.stage.addChild(pot);
         
         const plant = this.createPixelSprite(12, 16, 0x228B22);
         plant.x = x - 6;
         plant.y = y - 8;
         this.app.stage.addChild(plant);
     }
    
    // 게더타운 스타일 회의실
    createGatherMeetingRoom() {
        // 회의실 바닥 (더 큰 타일)
        const roomFloor = this.createPixelSprite(320, 160, 0xF5F5DC);
        roomFloor.x = 240;
        roomFloor.y = 80;
        this.app.stage.addChild(roomFloor);
        
        // 회의실 벽 (게더타운 스타일)
        const walls = [
            { x: 240, y: 80, w: 320, h: 8, color: 0x8B4513 }, // 상단
            { x: 240, y: 80, w: 8, h: 160, color: 0x8B4513 }, // 왼쪽
            { x: 552, y: 80, w: 8, h: 160, color: 0x8B4513 }, // 오른쪽
            { x: 240, y: 232, w: 320, h: 8, color: 0x8B4513 } // 하단
        ];
        
        walls.forEach(wall => {
            const wallSprite = this.createPixelSprite(wall.w, wall.h, wall.color);
            wallSprite.x = wall.x;
            wallSprite.y = wall.y;
            this.app.stage.addChild(wallSprite);
        });
        
        // 큰 회의 테이블 (게더타운 스타일)
        this.createGatherConferenceTable(320, 140);
        
        // 회의실 의자들 (8개)
        const chairPositions = [
            { x: 280, y: 120 }, { x: 320, y: 120 }, { x: 360, y: 120 }, // 상단
            { x: 280, y: 180 }, { x: 320, y: 180 }, { x: 360, y: 180 }, // 하단
            { x: 260, y: 150 }, { x: 420, y: 150 } // 좌우
        ];
        
        chairPositions.forEach(pos => {
            this.createGatherChair(pos.x, pos.y);
        });
        
        // 프레젠테이션 스크린
        this.createPresentationScreen(480, 100);
    }
    
    // 3D 효과 테이블
    create3DTable(container, x, y) {
        // 테이블 그림자
        const shadow = this.createPixelSprite(32, 22, 0x6495ED);
        shadow.x = x + 2;
        shadow.y = y + 2;
        container.addChild(shadow);
        
        // 테이블 상판
        const table = this.createPixelSprite(30, 20, 0x87CEEB);
        table.x = x;
        table.y = y;
        container.addChild(table);
        
        // 테이블 테두리
        const borders = [
            { x: x, y: y, w: 30, h: 2, color: 0x4682B4 },
            { x: x, y: y, w: 2, h: 20, color: 0x4682B4 },
            { x: x + 28, y: y, w: 2, h: 20, color: 0x4682B4 },
            { x: x, y: y + 18, w: 30, h: 2, color: 0x4682B4 }
        ];
        
        borders.forEach(border => {
            const borderSprite = this.createPixelSprite(border.w, border.h, border.color);
            borderSprite.x = border.x;
            borderSprite.y = border.y;
            container.addChild(borderSprite);
        });
    }
    
    // 의자들
    createChairs(container, tableX, tableY) {
        const chairPositions = [
            { x: tableX + 5, y: tableY - 12 },
            { x: tableX + 20, y: tableY - 12 },
            { x: tableX + 5, y: tableY + 25 },
            { x: tableX + 20, y: tableY + 25 }
        ];
        
        chairPositions.forEach(pos => {
            this.createDetailedChair(container, pos.x, pos.y);
        });
    }
    
    // 세밀한 의자
    createDetailedChair(container, x, y) {
        // 의자 등받이
        const backrest = this.createPixelSprite(10, 3, 0x696969);
        backrest.x = x;
        backrest.y = y;
        container.addChild(backrest);
        
        // 의자 프레임
        const frame1 = this.createPixelSprite(2, 8, 0x696969);
        frame1.x = x;
        frame1.y = y;
        container.addChild(frame1);
        
        const frame2 = this.createPixelSprite(2, 8, 0x696969);
        frame2.x = x + 8;
        frame2.y = y;
        container.addChild(frame2);
        
        // 의자 좌석
        const seat = this.createPixelSprite(10, 8, 0xC0C0C0);
        seat.x = x;
        seat.y = y + 5;
        container.addChild(seat);
        
        // 쿠션 효과
        const cushion = this.createPixelSprite(8, 6, 0xD3D3D3);
        cushion.x = x + 1;
        cushion.y = y + 6;
        container.addChild(cushion);
    }
    
    // 게더타운 스타일 개발 구역
    createGatherDevArea() {
        // 개발팀 바닥
        const devFloor = this.createPixelSprite(200, 120, 0xE6F3FF);
        devFloor.x = 80;
        devFloor.y = 280;
        this.app.stage.addChild(devFloor);
        
        // 개발팀 벽
        const devWalls = [
            { x: 80, y: 280, w: 200, h: 8, color: 0x4682B4 },
            { x: 80, y: 280, w: 8, h: 120, color: 0x4682B4 },
            { x: 272, y: 280, w: 8, h: 120, color: 0x4682B4 },
            { x: 80, y: 392, w: 200, h: 8, color: 0x4682B4 }
        ];
        
        devWalls.forEach(wall => {
            const wallSprite = this.createPixelSprite(wall.w, wall.h, wall.color);
            wallSprite.x = wall.x;
            wallSprite.y = wall.y;
            this.app.stage.addChild(wallSprite);
        });
        
        // 개발 책상들 (게더타운 스타일)
        const deskPositions = [
            { x: 120, y: 310 }, { x: 200, y: 310 },
            { x: 120, y: 350 }, { x: 200, y: 350 }
        ];
        
        deskPositions.forEach(pos => {
            this.createGatherDevDesk(pos.x, pos.y);
        });
    }
    
    // 고급 책상
    createAdvancedDesk(container, x, y) {
        // 책상 그림자
        const shadow = this.createPixelSprite(22, 17, 0xA0522D);
        shadow.x = x + 1;
        shadow.y = y + 1;
        container.addChild(shadow);
        
        // 책상 상판
        const desk = this.createPixelSprite(20, 15, 0x8B4513);
        desk.x = x;
        desk.y = y;
        container.addChild(desk);
        
        // 서랍
        const drawer = this.createPixelSprite(16, 6, 0x654321);
        drawer.x = x + 2;
        drawer.y = y + 8;
        container.addChild(drawer);
        
        // 손잡이
        const handle = this.createPixelSprite(2, 2, 0xFFD700);
        handle.x = x + 4;
        handle.y = y + 10;
        container.addChild(handle);
    }
    
    // 모니터
    createMonitor(container, x, y) {
        // 모니터 스크린
        const screen = this.createPixelSprite(12, 8, 0x000000);
        screen.x = x;
        screen.y = y;
        container.addChild(screen);
        
        // 화면 내용
        const display = this.createPixelSprite(10, 6, 0x003366);
        display.x = x + 1;
        display.y = y + 1;
        container.addChild(display);
        
        // 스탠드
        const stand = this.createPixelSprite(2, 3, 0xC0C0C0);
        stand.x = x + 5;
        stand.y = y + 8;
        container.addChild(stand);
        
        const base = this.createPixelSprite(6, 2, 0xC0C0C0);
        base.x = x + 3;
        base.y = y + 11;
        container.addChild(base);
    }
    
    // 키보드
    createKeyboard(container, x, y) {
        // 키보드 베이스
        const keyboard = this.createPixelSprite(14, 4, 0x2F2F2F);
        keyboard.x = x;
        keyboard.y = y;
        container.addChild(keyboard);
        
        // 키들
        for (let i = 0; i < 12; i += 2) {
            const key1 = this.createPixelSprite(1, 1, 0x404040);
            key1.x = x + 1 + i;
            key1.y = y + 1;
            container.addChild(key1);
            
            const key2 = this.createPixelSprite(1, 1, 0x404040);
            key2.x = x + 1 + i;
            key2.y = y + 2;
            container.addChild(key2);
        }
    }
    
    // 게더타운 스타일 디자인 구역
    createGatherDesignArea() {
        // 디자인팀 바닥
        const designFloor = this.createPixelSprite(200, 120, 0xFFF8DC);
        designFloor.x = 320;
        designFloor.y = 280;
        this.app.stage.addChild(designFloor);
        
        // 디자인팀 벽
        const designWalls = [
            { x: 320, y: 280, w: 200, h: 8, color: 0xFF69B4 },
            { x: 320, y: 280, w: 8, h: 120, color: 0xFF69B4 },
            { x: 512, y: 280, w: 8, h: 120, color: 0xFF69B4 },
            { x: 320, y: 392, w: 200, h: 8, color: 0xFF69B4 }
        ];
        
        designWalls.forEach(wall => {
            const wallSprite = this.createPixelSprite(wall.w, wall.h, wall.color);
            wallSprite.x = wall.x;
            wallSprite.y = wall.y;
            this.app.stage.addChild(wallSprite);
        });
        
        // 디자인 책상들
        const designDeskPositions = [
            { x: 360, y: 310 }, { x: 440, y: 310 },
            { x: 360, y: 350 }, { x: 440, y: 350 }
        ];
        
        designDeskPositions.forEach(pos => {
            this.createGatherDesignDesk(pos.x, pos.y);
        });
    }
    
    // 게더타운 스타일 카페
    createGatherCafe() {
        // 카페 바닥
        const cafeFloor = this.createPixelSprite(200, 100, 0xDEB887);
        cafeFloor.x = 560;
        cafeFloor.y = 280;
        this.app.stage.addChild(cafeFloor);
        
        // 카페 벽
        const cafeWalls = [
            { x: 560, y: 280, w: 200, h: 8, color: 0x8B4513 },
            { x: 560, y: 280, w: 8, h: 100, color: 0x8B4513 },
            { x: 752, y: 280, w: 8, h: 100, color: 0x8B4513 },
            { x: 560, y: 372, w: 200, h: 8, color: 0x8B4513 }
        ];
        
        cafeWalls.forEach(wall => {
            const wallSprite = this.createPixelSprite(wall.w, wall.h, wall.color);
            wallSprite.x = wall.x;
            wallSprite.y = wall.y;
            this.app.stage.addChild(wallSprite);
        });
        
        // 카페 테이블들
        const cafeTablePositions = [
            { x: 600, y: 310 }, { x: 680, y: 310 },
            { x: 600, y: 340 }, { x: 680, y: 340 }
        ];
        
        cafeTablePositions.forEach(pos => {
            this.createGatherCafeTable(pos.x, pos.y);
        });
        
        // 커피머신
        this.createGatherCoffeeMachine(720, 320);
    }
    
    // 게더타운 스타일 장식
    createGatherDecorations() {
        // 식물들
        this.createGatherPlant(60, 120);
        this.createGatherPlant(60, 380);
        this.createGatherPlant(740, 120);
        this.createGatherPlant(740, 380);
    }
    
    // 게더타운 스타일 제목
    createGatherTitle() {
        // 제목 배경
        const titleBg = this.createPixelSprite(200, 40, 0x8B4513);
        titleBg.x = 300;
        titleBg.y = 20;
        this.app.stage.addChild(titleBg);
        
        // 제목 텍스트
        const titleText = new PIXI.Text('마카롱팩토리 오피스', {
            fontFamily: 'monospace',
            fontSize: 20,
            fill: 0xFFD700,
            fontWeight: 'bold'
        });
        titleText.x = 400 - titleText.width / 2;
        titleText.y = 35;
                 this.app.stage.addChild(titleText);
     }
    
    // 디자인용 대형 모니터
    createDesignMonitor(container, x, y) {
        const screen = this.createPixelSprite(15, 10, 0x000000);
        screen.x = x;
        screen.y = y;
        container.addChild(screen);
        
        const display = this.createPixelSprite(13, 8, 0x1a1a2e);
        display.x = x + 1;
        display.y = y + 1;
        container.addChild(display);
        
        const stand = this.createPixelSprite(3, 4, 0xC0C0C0);
        stand.x = x + 6;
        stand.y = y + 10;
        container.addChild(stand);
        
        const base = this.createPixelSprite(7, 2, 0xC0C0C0);
        base.x = x + 4;
        base.y = y + 14;
        container.addChild(base);
    }
    
    // 타블렛
    createTablet(container, x, y) {
        const tablet = this.createPixelSprite(12, 8, 0x2F2F2F);
        tablet.x = x;
        tablet.y = y;
        container.addChild(tablet);
        
        const screen = this.createPixelSprite(10, 6, 0x404040);
        screen.x = x + 1;
        screen.y = y + 1;
        container.addChild(screen);
        
        // 펜
        const pen = this.createPixelSprite(6, 1, 0xFFD700);
        pen.x = x + 13;
        pen.y = y + 3;
        container.addChild(pen);
    }
    
         // 카페테리아
     createCafeteria() {
         const cafeContainer = new PIXI.Container();
         
         // 카페 바닥 (더 큰 영역)
         const cafeFloor = this.createPixelSprite(120, 50, 0xD2B48C);
         cafeFloor.x = 70;
         cafeFloor.y = 280;
         cafeContainer.addChild(cafeFloor);
         
         // 카페 테이블들 (사각형)
         const tablePositions = [
             { x: 80, y: 290 }, { x: 110, y: 290 }, { x: 140, y: 290 }
         ];
         
         tablePositions.forEach(pos => {
             this.createCafeTable(cafeContainer, pos.x, pos.y);
         });
         
         // 커피머신
         this.createCoffeeMachine(cafeContainer, 75, 310);
         
         // 카페 의자들
         const chairPositions = [
             { x: 77, y: 285 }, { x: 90, y: 285 },
             { x: 107, y: 285 }, { x: 120, y: 285 },
             { x: 137, y: 285 }, { x: 150, y: 285 }
         ];
         
         chairPositions.forEach(pos => {
             this.createSimpleChair(cafeContainer, pos.x, pos.y);
         });
         
         this.app.stage.addChild(cafeContainer);
     }
    
         // 카페 테이블 (사각형)
     createCafeTable(container, x, y) {
         // 테이블 상판
         const table = this.createPixelSprite(20, 12, 0xD2691E);
         table.x = x;
         table.y = y;
         container.addChild(table);
         
         // 테이블 그림자
         const shadow = this.createPixelSprite(20, 12, 0xB8860B);
         shadow.x = x + 1;
         shadow.y = y + 1;
         container.addChild(shadow);
         
         // 테이블 테두리
         const border = this.createPixelSprite(20, 2, 0x8B4513);
         border.x = x;
         border.y = y;
         container.addChild(border);
         
         // 테이블 다리
         const leg1 = this.createPixelSprite(2, 4, 0x8B4513);
         leg1.x = x + 2;
         leg1.y = y + 12;
         container.addChild(leg1);
         
         const leg2 = this.createPixelSprite(2, 4, 0x8B4513);
         leg2.x = x + 16;
         leg2.y = y + 12;
         container.addChild(leg2);
     }
    
         // 간단한 의자
     createSimpleChair(container, x, y) {
         // 의자 좌석
         const seat = this.createPixelSprite(8, 6, 0x654321);
         seat.x = x;
         seat.y = y;
         container.addChild(seat);
         
         // 의자 등받이
         const backrest = this.createPixelSprite(8, 3, 0x8B4513);
         backrest.x = x;
         backrest.y = y - 3;
         container.addChild(backrest);
         
         // 의자 다리
         const leg1 = this.createPixelSprite(1, 3, 0x654321);
         leg1.x = x + 1;
         leg1.y = y + 6;
         container.addChild(leg1);
         
         const leg2 = this.createPixelSprite(1, 3, 0x654321);
         leg2.x = x + 6;
         leg2.y = y + 6;
         container.addChild(leg2);
     }
    
    // 커피머신
    createCoffeeMachine(container, x, y) {
        const machine = this.createPixelSprite(8, 12, 0xC0C0C0);
        machine.x = x;
        machine.y = y;
        container.addChild(machine);
        
        const screen = this.createPixelSprite(6, 4, 0x000000);
        screen.x = x + 1;
        screen.y = y + 1;
        container.addChild(screen);
        
        const redButton = this.createPixelSprite(4, 2, 0xFF0000);
        redButton.x = x + 2;
        redButton.y = y + 6;
        container.addChild(redButton);
        
        const blueButton = this.createPixelSprite(2, 2, 0x0000FF);
        blueButton.x = x + 3;
        blueButton.y = y + 9;
        container.addChild(blueButton);
    }
    
    // 장식 요소들
    createDecorations() {
        // 식물들
        this.createPlant(20, 100);
        this.createPlant(220, 170);
    }
    
    // 식물
    createPlant(x, y) {
        const plantContainer = new PIXI.Container();
        
        // 화분
        const pot = this.createPixelSprite(8, 6, 0x8B4513);
        pot.x = x;
        pot.y = y + 8;
        plantContainer.addChild(pot);
        
        // 잎들 (원형으로)
        const leafPositions = [
            { x: x + 4, y: y + 4, r: 3, color: 0x228B22 },
            { x: x + 2, y: y + 2, r: 2, color: 0x32CD32 },
            { x: x + 6, y: y + 2, r: 2, color: 0x32CD32 },
            { x: x + 4, y: y, r: 2, color: 0x00FF00 }
        ];
        
        leafPositions.forEach(leaf => {
            const leafGraphics = new PIXI.Graphics();
            leafGraphics.beginFill(leaf.color);
            leafGraphics.drawCircle(leaf.r, leaf.r, leaf.r);
            leafGraphics.endFill();
            
            const leafTexture = this.app.renderer.generateTexture(leafGraphics);
            const leafSprite = new PIXI.Sprite(leafTexture);
            leafSprite.x = leaf.x;
            leafSprite.y = leaf.y;
            plantContainer.addChild(leafSprite);
        });
        
        this.app.stage.addChild(plantContainer);
    }
    
    // 제목
    createTitle() {
        // 제목 배경
        const titleBg = this.createPixelSprite(90, 20, 0x8B4513);
        titleBg.x = 80;
        titleBg.y = 8;
        this.app.stage.addChild(titleBg);
        
        const titleBorder = this.createPixelSprite(86, 16, 0xA0522D);
        titleBorder.x = 82;
        titleBorder.y = 10;
        this.app.stage.addChild(titleBorder);
        
        // 제목 텍스트
        const titleText = new PIXI.Text('마카롱 오피스', {
            fontFamily: 'monospace',
            fontSize: 14,
            fill: 0xFFD700,
            fontWeight: 'bold'
        });
        titleText.x = 125 - titleText.width / 2;
        titleText.y = 18;
        this.app.stage.addChild(titleText);
    }
    
    // 캐릭터들 생성 (게더타운 스타일)
    createCharacters() {
        this.characters = {
            po: this.createGatherCharacter(350, 160, 'po'),
            pd: this.createGatherCharacter(380, 160, 'pd'),
            dev1: this.createGatherCharacter(150, 330, 'dev1'),
            dev2: this.createGatherCharacter(230, 330, 'dev2')
        };
    }
    
    // 게더타운 스타일 캐릭터 생성
    createGatherCharacter(x, y, role) {
        const charContainer = new PIXI.Container();
        
        // 그림자
        const shadow = this.createPixelSprite(8, 2, 0x000000);
        shadow.alpha = 0.3;
        shadow.x = 1;
        shadow.y = 22;
        charContainer.addChild(shadow);
        
        // 머리
        const head = this.createPixelSprite(6, 4, 0x2C1810);
        head.x = 2;
        head.y = 0;
        charContainer.addChild(head);
        
        // 얼굴
        const face = this.createPixelSprite(6, 4, 0xFDBCB4);
        face.x = 2;
        face.y = 4;
        charContainer.addChild(face);
        
        // 눈
        const eye1 = this.createPixelSprite(1, 1, 0x000000);
        eye1.x = 3;
        eye1.y = 5;
        charContainer.addChild(eye1);
        
        const eye2 = this.createPixelSprite(1, 1, 0x000000);
        eye2.x = 6;
        eye2.y = 5;
        charContainer.addChild(eye2);
        
        // 코
        const nose = this.createPixelSprite(1, 1, 0xD2691E);
        nose.x = 4;
        nose.y = 6;
        charContainer.addChild(nose);
        
        // 입
        const mouth = this.createPixelSprite(2, 1, 0x8B4513);
        mouth.x = 4;
        mouth.y = 7;
        charContainer.addChild(mouth);
        
        // 역할별 몸통 색상
        let bodyColor = 0x4169E1;
        if (role === 'po') {
            bodyColor = 0x4169E1;
            // 넥타이
            const tie = this.createPixelSprite(2, 6, 0xFF0000);
            tie.x = 4;
            tie.y = 8;
            charContainer.addChild(tie);
        } else if (role === 'pd') {
            bodyColor = 0x4169E1;
            // 안경
            const glasses1 = this.createPixelSprite(2, 1, 0x000000);
            glasses1.x = 2;
            glasses1.y = 5;
            charContainer.addChild(glasses1);
            
            const glasses2 = this.createPixelSprite(2, 1, 0x000000);
            glasses2.x = 6;
            glasses2.y = 5;
            charContainer.addChild(glasses2);
        } else {
            bodyColor = 0x228B22;
            // 후드
            const hood = this.createPixelSprite(8, 2, bodyColor);
            hood.x = 1;
            hood.y = -1;
            charContainer.addChild(hood);
        }
        
        // 몸통
        const body = this.createPixelSprite(8, 8, bodyColor);
        body.x = 1;
        body.y = 8;
        charContainer.addChild(body);
        
        // 팔
        const arm1 = this.createPixelSprite(3, 6, bodyColor);
        arm1.x = -1;
        arm1.y = 9;
        charContainer.addChild(arm1);
        
        const arm2 = this.createPixelSprite(3, 6, bodyColor);
        arm2.x = 8;
        arm2.y = 9;
        charContainer.addChild(arm2);
        
        // 손
        const hand1 = this.createPixelSprite(2, 2, 0xFDBCB4);
        hand1.x = -1;
        hand1.y = 13;
        charContainer.addChild(hand1);
        
        const hand2 = this.createPixelSprite(2, 2, 0xFDBCB4);
        hand2.x = 9;
        hand2.y = 13;
        charContainer.addChild(hand2);
        
        // 다리
        const leg1 = this.createPixelSprite(3, 8, 0x000080);
        leg1.x = 2;
        leg1.y = 16;
        charContainer.addChild(leg1);
        
        const leg2 = this.createPixelSprite(3, 8, 0x000080);
        leg2.x = 5;
        leg2.y = 16;
        charContainer.addChild(leg2);
        
        // 신발
        const shoe1 = this.createPixelSprite(4, 3, 0x8B4513);
        shoe1.x = 1;
        shoe1.y = 22;
        charContainer.addChild(shoe1);
        
        const shoe2 = this.createPixelSprite(4, 3, 0x8B4513);
        shoe2.x = 5;
        shoe2.y = 22;
        charContainer.addChild(shoe2);
        
        // 위치 설정
        charContainer.x = x;
        charContainer.y = y;
        
        this.app.stage.addChild(charContainer);
        return charContainer;
    }
    
    // 캐릭터 이동 (부드러운 애니메이션)
    moveCharacter(charKey, targetX, targetY) {
        const char = this.characters[charKey];
        if (!char) return;
        
        // Tween 애니메이션
        const startX = char.x;
        const startY = char.y;
        const duration = 800;
        let startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 이징 함수
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            char.x = startX + (targetX - startX) * easeProgress;
            char.y = startY + (targetY - startY) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    // 캐릭터 애니메이션 (점프 효과)
    animateCharacter(charKey) {
        const char = this.characters[charKey];
        if (!char) return;
        
        const originalY = char.y;
        let bounceHeight = 0;
        let bounceDirection = -1;
        const maxBounce = 8;
        let frame = 0;
        const totalFrames = 20;
        
        const animate = () => {
            frame++;
            bounceHeight += bounceDirection * 2;
            
            if (bounceHeight <= -maxBounce || bounceHeight >= 0) {
                bounceDirection *= -1;
            }
            
            char.y = originalY + bounceHeight;
            
            if (frame < totalFrames) {
                setTimeout(() => animate(), 50);
            } else {
                char.y = originalY;
            }
        };
        
        animate();
    }
    
    // 시나리오별 캐릭터 위치 업데이트
    updateScenario(scenarioId) {
        this.currentScenario = scenarioId;
        
        switch(scenarioId) {
            case 1: // 스쿼드 미팅
                this.moveCharacter('po', 350, 160);
                this.moveCharacter('pd', 380, 160);
                this.moveCharacter('dev1', 320, 180);
                this.moveCharacter('dev2', 410, 180);
                break;
            case 2: // 디자인 챕터 리뷰
                this.moveCharacter('po', 380, 330);
                this.moveCharacter('pd', 420, 330);
                this.moveCharacter('dev1', 150, 330);
                this.moveCharacter('dev2', 230, 330);
                break;
            case 3: // 긴급 상황
                this.moveCharacter('po', 350, 160);
                this.moveCharacter('pd', 420, 330);
                this.moveCharacter('dev1', 150, 330);
                this.moveCharacter('dev2', 630, 320);
                break;
        }
    }
    
    // 시나리오 변경 핸들러
    onScenarioChange(scenarioId) {
        this.updateScenario(scenarioId);
    }
}

// 픽셀 아트 사무실 맵 렌더링
class PixelOfficeMap {
    constructor() {
        this.tileSize = 32;
        this.mapWidth = 10;
        this.mapHeight = 10;
        this.tiles = [];
        this.mapContainer = null;
        
        // 맵 레이아웃 (10x10 타일)
        this.mapLayout = [
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
        
        // 구역 정보
        this.areas = {
            1: { name: "미팅룸", color: 0x4A90E2 },
            2: { name: "카페테리아", color: 0x7ED321 },
            3: { name: "좌석A", color: 0xF5A623 },
            4: { name: "좌석B", color: 0xBD10E0 }
        };
    }

    // 맵 생성 및 렌더링
    async createOfficeMap() {
        console.log('🏢 픽셀 아트 사무실 맵 생성 시작');
        
        try {
            // 맵 컨테이너 생성
            this.mapContainer = new PIXI.Container();
            this.mapContainer.name = 'officeMap';
            
            // 타일 텍스처 로드
            await this.loadTileTextures();
            
            // 맵 렌더링
            this.renderMap();
            
            // 스테이지에 추가
            if (window.app && window.app.stage) {
                window.app.stage.addChild(this.mapContainer);
                console.log('✅ 사무실 맵이 스테이지에 추가되었습니다');
            } else {
                console.error('❌ app.stage를 찾을 수 없습니다');
            }
            
            return this.mapContainer;
            
        } catch (error) {
            console.error('❌ 사무실 맵 생성 실패:', error);
            throw error;
        }
    }

    // 타일 텍스처 로드
    async loadTileTextures() {
        console.log('📦 타일 텍스처 로드 시작');
        
        const texturePromises = [];
        
        // tile_0.png ~ tile_4.png 로드
        for (let i = 0; i <= 4; i++) {
            const texturePromise = PIXI.Texture.from(`assets/tiles/tile_${i}.png`);
            texturePromises.push(texturePromise);
        }
        
        try {
            this.tiles = await Promise.all(texturePromises);
            console.log(`✅ ${this.tiles.length}개의 타일 텍스처 로드 완료`);
        } catch (error) {
            console.error('❌ 타일 텍스처 로드 실패:', error);
            // 텍스처 로드 실패 시 기본 색상으로 대체
            this.createFallbackTextures();
        }
    }

    // 폴백 텍스처 생성 (타일 이미지가 없을 때)
    createFallbackTextures() {
        console.log('🎨 폴백 텍스처 생성');
        
        this.tiles = [];
        for (let i = 0; i <= 4; i++) {
            const graphics = new PIXI.Graphics();
            const color = this.areas[i] ? this.areas[i].color : 0xCCCCCC;
            
            graphics.beginFill(color);
            graphics.drawRect(0, 0, this.tileSize, this.tileSize);
            graphics.endFill();
            
            // 타일 번호 표시
            const text = new PIXI.Text(i.toString(), {
                fontSize: 12,
                fill: 0xFFFFFF,
                align: 'center'
            });
            text.anchor.set(0.5);
            text.position.set(this.tileSize / 2, this.tileSize / 2);
            graphics.addChild(text);
            
            this.tiles.push(graphics.generateTexture());
        }
    }

    // 맵 렌더링
    renderMap() {
        console.log('🎨 맵 렌더링 시작');
        
        for (let row = 0; row < this.mapHeight; row++) {
            for (let col = 0; col < this.mapWidth; col++) {
                const tileIndex = this.mapLayout[row][col];
                const x = col * this.tileSize;
                const y = row * this.tileSize;
                
                // 타일 스프라이트 생성
                const tileSprite = new PIXI.Sprite(this.tiles[tileIndex]);
                tileSprite.position.set(x, y);
                tileSprite.name = `tile_${row}_${col}`;
                
                // 구역 정보 저장
                tileSprite.areaId = tileIndex;
                tileSprite.areaName = this.areas[tileIndex]?.name || 'Unknown';
                
                this.mapContainer.addChild(tileSprite);
            }
        }
        
        console.log(`✅ ${this.mapWidth * this.mapHeight}개의 타일 렌더링 완료`);
    }

    // 맵 제거
    destroyMap() {
        if (this.mapContainer) {
            this.mapContainer.destroy({ children: true });
            this.mapContainer = null;
            console.log('🗑️ 사무실 맵 제거 완료');
        }
    }

    // 맵 정보 반환
    getMapInfo() {
        return {
            width: this.mapWidth * this.tileSize,
            height: this.mapHeight * this.tileSize,
            tileSize: this.tileSize,
            areas: this.areas,
            layout: this.mapLayout
        };
    }
}

// 전역 함수로 노출
window.createOfficeMap = async function() {
    if (!window.pixelOfficeMap) {
        window.pixelOfficeMap = new PixelOfficeMap();
    }
    return await window.pixelOfficeMap.createOfficeMap();
};

window.destroyOfficeMap = function() {
    if (window.pixelOfficeMap) {
        window.pixelOfficeMap.destroyMap();
    }
};

console.log('🏢 픽셀 아트 사무실 맵 모듈 로드 완료');

// 전역 픽셀 맵 인스턴스
window.pixelMap = null;

// 페이지 로드 시 픽셀 맵 초기화
document.addEventListener('DOMContentLoaded', async function() {
    // PixiJS 로드 확인
    if (typeof PIXI !== 'undefined') {
        window.pixelMap = new AdvancedPixelMap();
        console.log('🚀 PixiJS 기반 고도화된 픽셀 아트 시스템 로드 완료!');
    } else {
        console.error('❌ PixiJS 라이브러리 로드 실패');
    }
}); 